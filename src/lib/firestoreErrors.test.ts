import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleFirestoreError, OperationType, FirestoreErrorInfo } from './firestoreErrors';

// Mock the firebase module to control auth.currentUser
vi.mock('../firebase', () => {
  return {
    auth: {
      currentUser: null,
    },
  };
});

import { auth } from '../firebase';

describe('handleFirestoreError', () => {
  beforeEach(() => {
    // Reset the mock state before each test
    vi.resetModules();
    (auth as any).currentUser = null;

    // Silence console.error during tests to avoid cluttered output
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should throw an error stringified with FirestoreErrorInfo for a standard Error', () => {
    const error = new Error('Permission denied');

    try {
      handleFirestoreError(error, OperationType.GET, 'users/123');
      expect.fail('Should have thrown');
    } catch (e: any) {
      expect(e).toBeInstanceOf(Error);
      const errInfo: FirestoreErrorInfo = JSON.parse(e.message);

      expect(errInfo.error).toBe('Permission denied');
      expect(errInfo.operationType).toBe(OperationType.GET);
      expect(errInfo.path).toBe('users/123');
      expect(errInfo.authInfo).toBeDefined();
      expect(errInfo.authInfo.userId).toBeUndefined();
    }
  });

  it('should throw properly for a non-Error object (string)', () => {
    try {
      handleFirestoreError('Some string error', OperationType.CREATE, null);
      expect.fail('Should have thrown');
    } catch (e: any) {
      const errInfo: FirestoreErrorInfo = JSON.parse(e.message);
      expect(errInfo.error).toBe('Some string error');
      expect(errInfo.operationType).toBe(OperationType.CREATE);
      expect(errInfo.path).toBeNull();
    }
  });

  it('should include authInfo when a user is authenticated', () => {
    // Set up a mock user
    (auth as any).currentUser = {
      uid: 'test-user-id',
      email: 'test@example.com',
      emailVerified: true,
      isAnonymous: false,
      tenantId: 'tenant-1',
      providerData: [
        {
          providerId: 'google.com',
          email: 'test@example.com'
        }
      ]
    };

    try {
      handleFirestoreError(new Error('Update failed'), OperationType.UPDATE, 'posts/1');
      expect.fail('Should have thrown');
    } catch (e: any) {
      const errInfo: FirestoreErrorInfo = JSON.parse(e.message);

      expect(errInfo.authInfo.userId).toBe('test-user-id');
      expect(errInfo.authInfo.email).toBe('test@example.com');
      expect(errInfo.authInfo.emailVerified).toBe(true);
      expect(errInfo.authInfo.isAnonymous).toBe(false);
      expect(errInfo.authInfo.tenantId).toBe('tenant-1');
      expect(errInfo.authInfo.providerInfo).toHaveLength(1);
      expect(errInfo.authInfo.providerInfo![0].providerId).toBe('google.com');
    }
  });

  it('should handle authenticated user without providerData', () => {
    (auth as any).currentUser = {
      uid: 'anon-user-id',
      isAnonymous: true,
    };

    try {
      handleFirestoreError(new Error('Anon error'), OperationType.LIST, 'public');
      expect.fail('Should have thrown');
    } catch (e: any) {
      const errInfo: FirestoreErrorInfo = JSON.parse(e.message);
      expect(errInfo.authInfo.userId).toBe('anon-user-id');
      expect(errInfo.authInfo.providerInfo).toEqual([]);
    }
  });
});
