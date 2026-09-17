import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface PromotionConfig {
  id: string;
  title: string;
  subtitle: string;
  discountPercent: number;
  durationMinutes: number;
  originalPriceMonthly: number;
  discountedPriceMonthly: number;
  isActive: boolean;
  badgeText?: string;
}

export const DEFAULT_GUEST_PROMOTION: PromotionConfig = {
  id: 'guest_welcome_50',
  title: 'Oferta Powitalna: -50% na JASNE PRO',
  subtitle: 'Zaloguj się teraz, aby zabezpieczyć 50% zniżki i zapisać swoje postępy w chmurze.',
  discountPercent: 50,
  durationMinutes: 30,
  originalPriceMonthly: 29,
  discountedPriceMonthly: 14.5,
  isActive: true,
  badgeText: 'TYLKO DLA NOWYCH KONT'
};

const PROMO_STORAGE_KEY = 'jasne_guest_promo_start';
const PROMO_SEEN_KEY = 'jasne_guest_promo_modal_seen';

let cachedPromotion: PromotionConfig | null = null;

/**
 * Pobiera konfigurację promocji z Firestore (system/promotions)
 * z pamięcią podręczną i bezpiecznym fallbackiem.
 */
export async function fetchPromotionConfig(): Promise<PromotionConfig> {
  if (cachedPromotion) {
    return cachedPromotion;
  }

  try {
    const promoDocRef = doc(db, 'system', 'promotions');
    const snapshot = await getDoc(promoDocRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      const config: PromotionConfig = {
        id: data.id || DEFAULT_GUEST_PROMOTION.id,
        title: data.title || DEFAULT_GUEST_PROMOTION.title,
        subtitle: data.subtitle || DEFAULT_GUEST_PROMOTION.subtitle,
        discountPercent: typeof data.discountPercent === 'number' ? data.discountPercent : DEFAULT_GUEST_PROMOTION.discountPercent,
        durationMinutes: typeof data.durationMinutes === 'number' ? data.durationMinutes : DEFAULT_GUEST_PROMOTION.durationMinutes,
        originalPriceMonthly: typeof data.originalPriceMonthly === 'number' ? data.originalPriceMonthly : DEFAULT_GUEST_PROMOTION.originalPriceMonthly,
        discountedPriceMonthly: typeof data.discountedPriceMonthly === 'number' ? data.discountedPriceMonthly : DEFAULT_GUEST_PROMOTION.discountedPriceMonthly,
        isActive: data.isActive !== undefined ? data.isActive : DEFAULT_GUEST_PROMOTION.isActive,
        badgeText: data.badgeText || DEFAULT_GUEST_PROMOTION.badgeText
      };
      cachedPromotion = config;
      return config;
    }
  } catch (error) {
    console.warn('[promotionService] Nie udało się pobrać konfiguracji z Firestore, używam domyślnej:', error);
  }

  cachedPromotion = DEFAULT_GUEST_PROMOTION;
  return DEFAULT_GUEST_PROMOTION;
}

/**
 * Inicjalizuje lub zwraca znacznik czasu rozpoczęcia promocji dla gościa.
 */
export function getOrCreateGuestPromoStartTime(): number {
  if (typeof window === 'undefined') return Date.now();

  const stored = localStorage.getItem(PROMO_STORAGE_KEY);
  if (stored) {
    const parsed = parseInt(stored, 10);
    if (!isNaN(parsed) && parsed > 0) {
      return parsed;
    }
  }

  const now = Date.now();
  localStorage.setItem(PROMO_STORAGE_KEY, now.toString());
  return now;
}

/**
 * Zwraca pozostałą liczbę sekund promocji powitalnej dla gościa (0 jeśli wygasła).
 */
export function getGuestPromoRemainingSeconds(durationMinutes: number = 30): number {
  const startTime = getOrCreateGuestPromoStartTime();
  const totalSeconds = durationMinutes * 60;
  const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
  const remaining = totalSeconds - elapsedSeconds;

  return Math.max(0, remaining);
}

/**
 * Formatuje sekundy do postaci MM:SS
 */
export function formatPromoSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Sprawdza czy modal promocyjny był już wyświetlony na starcie.
 */
export function hasSeenGuestPromoModal(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(PROMO_SEEN_KEY) === 'true';
}

/**
 * Oznacza modal promocyjny jako wyświetlony.
 */
export function markGuestPromoModalSeen(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROMO_SEEN_KEY, 'true');
}

/**
 * Resetuje znacznik wyświetlenia (np. po ukończeniu lekcji).
 */
export function resetGuestPromoModalSeen(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROMO_SEEN_KEY);
}

/**
 * Atomowo zapisuje odebraną promocję w profilu użytkownika w Cloud Firestore.
 */
export async function claimPromotionForUser(uid: string, promo: PromotionConfig): Promise<void> {
  if (!uid) return;

  try {
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, {
      appliedPromotion: {
        promoId: promo.id,
        discountPercent: promo.discountPercent,
        claimedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active'
      }
    }, { merge: true });
  } catch (error) {
    console.error('[promotionService] Błąd podczas zapisywania promocji użytkownika:', error);
  }
}
