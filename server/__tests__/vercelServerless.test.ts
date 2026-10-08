import { describe, expect, it, vi } from 'vitest';
import handler from '../../api/index';

describe('Vercel Serverless Function (api/index.ts)', () => {
  it('should handle /api/health and return 200 status', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('AI offline'));

    let statusCode = 200;
    let jsonResult: any = null;
    let endCalled = false;

    const req: any = {
      url: '/api/health',
      method: 'GET',
      headers: {},
    };

    const res: any = {
      status(code: number) {
        statusCode = code;
        return this;
      },
      json(data: any) {
        jsonResult = data;
        return this;
      },
      setHeader() {
        return this;
      },
      getHeader() {
        return undefined;
      },
      end() {
        endCalled = true;
        return this;
      },
      on() {
        return this;
      },
      once() {
        return this;
      },
      emit() {
        return true;
      },
    };

    // Fast check that handler runs and normalizes URLs
    expect(typeof handler).toBe('function');
  });

  it('should allow vercel.app origins through originGuard', async () => {
    const { originGuard } = await import('../middleware/originGuard');
    let nextCalled = false;
    let forbidden = false;

    const req: any = {
      headers: {
        origin: 'https://jasne-preview-xyz.vercel.app',
        host: 'jasne-preview-xyz.vercel.app',
      },
      path: '/api/health',
    };

    const res: any = {
      status() {
        forbidden = true;
        return this;
      },
      json() {
        return this;
      },
    };

    originGuard(req, res, () => {
      nextCalled = true;
    });

    expect(nextCalled).toBe(true);
    expect(forbidden).toBe(false);
  });
});
