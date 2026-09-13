/**
 * AI Token Usage Tracking Service
 *
 * Designed for optimal cost and performance:
 * - 0 Firestore reads (pure atomic write using FieldValue increment)
 * - Non-blocking, fire-and-forget background execution (0 latency impact on user actions)
 * - Dual storage architecture:
 *   1. Aggregated counters on `users/{userId}.aiUsage` for instant summary stats.
 *   2. Time-series audit logs in `users/{userId}/ai_usage_events/{eventId}` for deep future analytics.
 * - Local fallback for unauthenticated guest sessions, automatically migrated upon sign-in.
 */

import { doc, updateDoc, setDoc, collection, addDoc, increment } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { AiTokenUsageData, UserAiUsageSummary } from '../types';

export interface RecordAiUsageParams {
  userId?: string | null;
  type: 'EVALUATION' | 'HINT' | 'GENERATION' | 'OTHER';
  usage?: Partial<AiTokenUsageData> | null;
  taskId?: string;
  hasImage?: boolean;
}

const GUEST_AI_STORAGE_KEY = 'jasne_guest_ai_tokens';

export function sanitizeModelKey(model?: string): string {
  if (!model) return 'unknown';
  return model.replace(/[^a-zA-Z0-9_]/g, '_');
}

/**
 * Retrieves accumulated guest AI token usage from localStorage.
 */
export function getGuestAiTokens(): UserAiUsageSummary | null {
  try {
    const raw = localStorage.getItem(GUEST_AI_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Clears accumulated guest AI token usage from localStorage.
 */
export function clearGuestAiTokens(): void {
  try {
    localStorage.removeItem(GUEST_AI_STORAGE_KEY);
  } catch {}
}

/**
 * Accumulates guest token usage in localStorage until the user signs in.
 */
function recordGuestAiUsage(usage: AiTokenUsageData, safeModel: string, todayStr: string): void {
  try {
    const existing = getGuestAiTokens() || {
      totalTokens: 0,
      promptTokens: 0,
      completionTokens: 0,
      totalRequests: 0,
      estimatedCostUsd: 0,
      modelsUsed: {},
      dailyTokens: {}
    };

    const modelsUsed = existing.modelsUsed || {};
    const dailyTokens = existing.dailyTokens || {};

    const updated: UserAiUsageSummary = {
      totalTokens: (existing.totalTokens || 0) + (usage.totalTokens || 0),
      promptTokens: (existing.promptTokens || 0) + (usage.promptTokens || 0),
      completionTokens: (existing.completionTokens || 0) + (usage.completionTokens || 0),
      totalRequests: (existing.totalRequests || 0) + 1,
      estimatedCostUsd: Number(((existing.estimatedCostUsd || 0) + (usage.estimatedCostUsd || 0)).toFixed(6)),
      lastUsedAt: new Date().toISOString(),
      modelsUsed: {
        ...modelsUsed,
        [safeModel]: (modelsUsed[safeModel] || 0) + (usage.totalTokens || 0)
      },
      dailyTokens: {
        ...dailyTokens,
        [todayStr]: (dailyTokens[todayStr] || 0) + (usage.totalTokens || 0)
      }
    };

    localStorage.setItem(GUEST_AI_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('[aiUsageTracker] Failed to record guest AI tokens in localStorage:', err);
  }
}

/**
 * Records AI token consumption in Cloud Firestore.
 * Always executes asynchronously without blocking the UI or throwing unhandled errors.
 */
export async function recordAiTokenUsage(params: RecordAiUsageParams): Promise<void> {
  try {
    const { userId, type, usage, taskId, hasImage } = params;
    if (!usage) return;

    const promptTokens = Number(usage.promptTokens) || 0;
    const completionTokens = Number(usage.completionTokens) || 0;
    const totalTokens = Number(usage.totalTokens) || (promptTokens + completionTokens);

    if (totalTokens <= 0) return;

    const modelName = usage.model || 'google/gemma-4-31b-it';
    const safeModel = sanitizeModelKey(modelName);
    const estimatedCostUsd = Number(usage.estimatedCostUsd) || 0;
    const todayStr = new Date().toISOString().split('T')[0];

    const normalizedUsage: AiTokenUsageData = {
      promptTokens,
      completionTokens,
      totalTokens,
      model: modelName,
      estimatedCostUsd
    };

    const targetUserId = userId || auth?.currentUser?.uid;

    // Handle guest sessions
    if (!targetUserId) {
      recordGuestAiUsage(normalizedUsage, safeModel, todayStr);
      return;
    }

    // 1. Atomic increment on user document (0 reads, 1 write)
    const userDocRef = doc(db, 'users', targetUserId);
    const updates: Record<string, any> = {
      'aiUsage.totalTokens': increment(totalTokens),
      'aiUsage.promptTokens': increment(promptTokens),
      'aiUsage.completionTokens': increment(completionTokens),
      'aiUsage.totalRequests': increment(1),
      'aiUsage.estimatedCostUsd': increment(estimatedCostUsd),
      'aiUsage.lastUsedAt': new Date().toISOString(),
      [`aiUsage.modelsUsed.${safeModel}`]: increment(totalTokens),
      [`aiUsage.dailyTokens.${todayStr}`]: increment(totalTokens)
    };

    // Execute fire-and-forget in background
    updateDoc(userDocRef, updates).catch(async (updateErr: any) => {
      // If user document didn't exist or didn't have aiUsage yet, safely merge
      if (updateErr?.code === 'not-found' || updateErr?.message?.includes('No document to update')) {
        try {
          await setDoc(userDocRef, {
            aiUsage: {
              totalTokens,
              promptTokens,
              completionTokens,
              totalRequests: 1,
              estimatedCostUsd,
              lastUsedAt: new Date().toISOString(),
              modelsUsed: { [safeModel]: totalTokens },
              dailyTokens: { [todayStr]: totalTokens }
            }
          }, { merge: true });
        } catch (mergeErr) {
          console.warn('[aiUsageTracker] Fallback setDoc failed:', mergeErr);
        }
      } else {
        console.warn('[aiUsageTracker] Failed to update user aiUsage aggregate:', updateErr);
      }
    });

    // 2. Write event to time-series subcollection for deep analytics (0 reads, 1 write)
    const eventsColRef = collection(db, 'users', targetUserId, 'ai_usage_events');
    addDoc(eventsColRef, {
      type,
      model: modelName,
      promptTokens,
      completionTokens,
      totalTokens,
      estimatedCostUsd,
      taskId: taskId || null,
      hasImage: Boolean(hasImage),
      timestamp: Date.now(),
      createdAt: new Date().toISOString()
    }).catch((eventErr) => {
      console.warn('[aiUsageTracker] Failed to write event log to ai_usage_events:', eventErr);
    });

  } catch (topErr) {
    console.warn('[aiUsageTracker] Unexpected error in recordAiTokenUsage:', topErr);
  }
}
