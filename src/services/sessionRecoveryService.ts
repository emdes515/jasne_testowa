/**
 * Session Recovery Service (Pancerna ochrona przed utratą stanu)
 * 
 * Odpowiada za hybrydowy zapis i bezstratne odzyskiwanie stanu sesji nauki:
 * 1. Metadane sesji (localStorage pod kluczem `jasne_active_session_v1`)
 * 2. Brudnopis / Rysunki wektorowe (IndexedDB pod bazą `jasne_storage_v1`, object store `scratchpads`)
 * 
 * Zapewnia:
 * - Ochronę przed QuotaExceededError (duże Base64 trafiają do IndexedDB)
 * - Odporność na brak / awarię IndexedDB (pamięciowy fallback)
 * - Wygaśnięcie po 24h
 * - Obsługę synchronicznego zapisu przy visibilitychange i beforeunload
 */

export const SESSION_STORAGE_KEY = 'jasne_active_session_v1';
export const DB_NAME = 'jasne_storage_v1';
export const STORE_NAME = 'scratchpads';
export const DB_VERSION = 1;
export const SESSION_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export interface SavedSessionState {
  sessionId: string;
  lessonId: string;
  lessonTitle: string;
  tasks: any[];
  currentQueueIndex: number;
  currentStep: number;
  theorySubStep: number;
  selectedOption: string | null;
  openAnswerText: string;
  activeSeconds: number;
  sessionMistakesCount: number;
  correctAnswersCount: number;
  timestamp: number;
  // Extended state fields for complete session continuity
  required_correct_tasks?: number;
  correctlySolvedTaskIds?: string[];
  numericInput?: string;
  tfSelections?: Record<string, 'P' | 'F'>;
  twoPart1?: string | null;
  twoPart2?: string | null;
  subjectId?: string;
  subjectKey?: string;
  isPolish?: boolean;
  topicId?: string;
  formulaSheet?: any;
  nextLesson?: any;
  allTaskIdsToMarkCompleted?: string[];
  openCanvasDataUrl?: string;
  isRestoredSession?: boolean;
  [key: string]: any;
}

// In-memory fallback for environments without IndexedDB or when IndexedDB fails
const memoryCanvasFallback = new Map<string, string>();

let idbDatabasePromise: Promise<IDBDatabase> | null = null;

function getIndexedDB(): IDBFactory | undefined {
  if (typeof window !== 'undefined' && window.indexedDB) {
    return window.indexedDB;
  }
  if (typeof indexedDB !== 'undefined') {
    return indexedDB;
  }
  return undefined;
}

function openDatabase(): Promise<IDBDatabase> {
  if (idbDatabasePromise) {
    return idbDatabasePromise;
  }

  const idb = getIndexedDB();
  if (!idb) {
    return Promise.reject(new Error('IndexedDB is not supported in this environment'));
  }

  idbDatabasePromise = new Promise<IDBDatabase>((resolve, reject) => {
    try {
      const request = idb.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };

      request.onsuccess = () => {
        const db = request.result;
        db.onversionchange = () => {
          db.close();
          idbDatabasePromise = null;
        };
        resolve(db);
      };

      request.onerror = () => {
        idbDatabasePromise = null;
        reject(request.error || new Error('Failed to open IndexedDB'));
      };

      request.onblocked = () => {
        idbDatabasePromise = null;
        reject(new Error('IndexedDB database open was blocked'));
      };
    } catch (err) {
      idbDatabasePromise = null;
      reject(err);
    }
  });

  return idbDatabasePromise;
}

/**
 * Generates a resilient, globally unique session identifier
 */
export function generateSessionId(lessonId: string = 'session'): string {
  const cleanId = String(lessonId).replace(/[^a-zA-Z0-9]/g, '_');
  const rand = Math.random().toString(36).substring(2, 9);
  return `sess_${cleanId}_${Date.now()}_${rand}`;
}

/**
 * Saves session metadata synchronously (critical for beforeunload & visibilitychange).
 * Strips openCanvasDataUrl to prevent QuotaExceededError and keep localStorage light (< 5MB limit).
 */
export function saveSessionStateSync(state: SavedSessionState): void {
  if (typeof localStorage === 'undefined') return;
  try {
    const { openCanvasDataUrl, ...metadata } = state;
    const payload: SavedSessionState = {
      ...metadata,
      timestamp: state.timestamp || Date.now()
    };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn('[SessionRecovery] Failed to save session metadata to localStorage:', err);
  }
}

/**
 * Saves session metadata asynchronously to localStorage and persists canvas drawing to IndexedDB
 */
export async function saveSessionState(state: SavedSessionState): Promise<void> {
  saveSessionStateSync(state);
  if (state.openCanvasDataUrl && state.sessionId) {
    const currentTaskId = state.tasks?.[state.currentQueueIndex]?.id;
    if (currentTaskId) {
      await saveCanvasDrawing(state.sessionId, currentTaskId, state.openCanvasDataUrl);
    }
  }
}

/**
 * Restores the active session state from localStorage and attaches drawing if available.
 * Returns null if no session exists or if the session is older than 24 hours.
 */
export async function restoreSessionState(): Promise<SavedSessionState | null> {
  if (typeof localStorage === 'undefined') return null;

  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;

    const parsed: SavedSessionState = JSON.parse(raw);

    // Expiration check: > 24 hours
    const now = Date.now();
    if (!parsed.timestamp || now - parsed.timestamp > SESSION_EXPIRATION_MS) {
      console.info('[SessionRecovery] Active session expired (>24h), clearing state.');
      await clearSessionState(parsed.sessionId);
      return null;
    }

    if (!parsed.sessionId || !parsed.lessonId) {
      return null;
    }

    // Try to pre-load canvas drawing for current task if available
    const currentTaskId = parsed.tasks?.[parsed.currentQueueIndex]?.id;
    if (currentTaskId) {
      try {
        const drawing = await restoreCanvasDrawing(parsed.sessionId, currentTaskId);
        if (drawing) {
          parsed.openCanvasDataUrl = drawing;
        }
      } catch (err) {
        console.warn('[SessionRecovery] Failed to pre-load drawing during restore:', err);
      }
    }

    parsed.isRestoredSession = true;
    return parsed;
  } catch (err) {
    console.warn('[SessionRecovery] Error parsing restored session from localStorage:', err);
    return null;
  }
}

/**
 * Clears session state from localStorage and scratchpads from IndexedDB/fallback
 */
export async function clearSessionState(sessionId?: string): Promise<void> {
  try {
    if (typeof localStorage !== 'undefined') {
      if (sessionId) {
        const raw = localStorage.getItem(SESSION_STORAGE_KEY);
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            if (parsed.sessionId === sessionId) {
              localStorage.removeItem(SESSION_STORAGE_KEY);
            }
          } catch {
            localStorage.removeItem(SESSION_STORAGE_KEY);
          }
        }
      } else {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    }
  } catch (err) {
    console.warn('[SessionRecovery] Error removing localStorage session key:', err);
  }

  // Clear scratchpad drawings
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      if (sessionId) {
        // Clear items prefixed with sessionId
        const req = store.openCursor();
        req.onsuccess = (e) => {
          const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
          if (cursor) {
            const keyStr = String(cursor.key);
            if (keyStr.startsWith(`${sessionId}_`)) {
              cursor.delete();
            }
            cursor.continue();
          } else {
            resolve();
          }
        };
        req.onerror = () => reject(req.error);
        tx.onerror = () => reject(tx.error);
      } else {
        const req = store.clear();
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
        tx.onerror = () => reject(tx.error);
      }
    });
  } catch {
    // IndexedDB failed or unavailable
  } finally {
    // Always clean memory fallback so in-memory store is in sync
    if (sessionId) {
      for (const k of Array.from(memoryCanvasFallback.keys())) {
        if (k.startsWith(`${sessionId}_`)) {
          memoryCanvasFallback.delete(k);
        }
      }
    } else {
      memoryCanvasFallback.clear();
    }
  }
}

/**
 * Saves canvas drawing (DataURL Base64) to IndexedDB with memory fallback
 */
export async function saveCanvasDrawing(sessionId: string, taskId: string, dataUrl: string): Promise<void> {
  if (!sessionId || !taskId) return;
  const key = `${sessionId}_${taskId}`;

  // Mirror in memory store for instant access
  memoryCanvasFallback.set(key, dataUrl);

  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrl, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    // IndexedDB failed or unavailable, in-memory store is already set
  }
}

/**
 * Restores canvas drawing (DataURL Base64) from IndexedDB with memory fallback
 */
export async function restoreCanvasDrawing(sessionId: string, taskId: string): Promise<string | null> {
  if (!sessionId || !taskId) return null;
  const key = `${sessionId}_${taskId}`;

  try {
    const db = await openDatabase();
    const result = await new Promise<string | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
      tx.onerror = () => reject(tx.error);
    });
    if (result) return result;
  } catch {
    // IndexedDB failed or unavailable
  }
  return memoryCanvasFallback.get(key) || null;
}

/**
 * Helper to reset connection for tests
 */
export function __resetDatabaseConnectionForTests(): void {
  idbDatabasePromise = null;
  memoryCanvasFallback.clear();
}
