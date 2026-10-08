import type { Request, Response } from 'express';
import { createApp } from '../server/app';

let appPromise: Promise<{ app: import('express').Express }> | null = null;

export default async function handler(req: Request, res: Response) {
  if (!appPromise) {
    appPromise = createApp({ enableFrontend: false });
  }
  const { app } = await appPromise;

  // Normalizacja req.url: Express oczekuje ścieżek z prefiksem /api
  if (req.url && !req.url.startsWith('/api')) {
    req.url = '/api' + (req.url.startsWith('/') ? req.url : '/' + req.url);
  }

  return app(req, res);
}
