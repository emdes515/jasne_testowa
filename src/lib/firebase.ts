import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { app, auth, db } from '../firebase';
import { migrateGuestProgressToUser } from './guestMigration';

export { app, auth, db };
export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    if (result.user) {
      await migrateGuestProgressToUser(result.user);
    }
    return result.user;
  } catch (error: any) {
    if (
      error?.code === 'auth/popup-closed-by-user' ||
      error?.code === 'auth/cancelled-popup-request' ||
      error?.code === 'auth/popup-blocked'
    ) {
      console.warn('Sign-in popup was closed or cancelled by the user.');
      return null;
    }
    if (
      error?.code === 'auth/unauthorized-domain' || 
      error?.message?.includes('unauthorized-domain') ||
      error?.message?.includes('Pending promise was never set')
    ) {
      console.warn('[FirebaseAuth] Domena nie jest dodana do Authorized Domains w Firebase Auth console.');
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('app_notification', {
          detail: {
            message: 'Tryb gościa aktywny: dodaj domenę do Authorized Domains w Firebase Auth, aby logować się kontem Google.',
            type: 'warning'
          }
        }));
      }
      return null;
    }
    console.error("Error signing in with Google", error);
    return null;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
  }
};
