import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { SystemMeta } from '../schema_firestore';

export const APP_CURRICULUM_VERSION = "2.0.0";

let hasCheckedSystemMeta = false;
let cachedResult: { upToDate: boolean; serverVersion: string } | null = null;

/**
 * Checks system/meta version from Firestore.
 * Performs at most 1 single document read per session.
 */
export async function checkSystemMetaVersion(): Promise<{ upToDate: boolean; serverVersion: string }> {
  if (hasCheckedSystemMeta && cachedResult) {
    return cachedResult;
  }

  try {
    const metaRef = doc(db, 'system', 'meta');
    const snap = await getDoc(metaRef);

    if (snap.exists()) {
      const data = snap.data() as SystemMeta;
      const serverVersion = data.curriculumVersion || APP_CURRICULUM_VERSION;
      hasCheckedSystemMeta = true;
      cachedResult = {
        upToDate: serverVersion === APP_CURRICULUM_VERSION,
        serverVersion
      };
      return cachedResult;
    } else {
      hasCheckedSystemMeta = true;
      cachedResult = { upToDate: true, serverVersion: APP_CURRICULUM_VERSION };
      return cachedResult;
    }
  } catch (err) {
    hasCheckedSystemMeta = true;
    cachedResult = { upToDate: true, serverVersion: APP_CURRICULUM_VERSION };
    return cachedResult;
  }
}
