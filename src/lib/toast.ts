/**
 * Lekki, globalny komunikat (toast) w stylu Nocturne Luminary.
 * Zastępuje systemowe window.alert(), które na telefonie wygląda obco i blokuje ekran.
 */
export type ToastTone = 'info' | 'success' | 'warning';

export interface ToastPayload {
  message: string;
  tone: ToastTone;
}

export const TOAST_EVENT = 'jasne:toast';

export function showToast(message: string, tone: ToastTone = 'info'): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<ToastPayload>(TOAST_EVENT, { detail: { message, tone } }));
}
