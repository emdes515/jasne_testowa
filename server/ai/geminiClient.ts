import { GoogleGenAI, Type } from '@google/genai';
import { config, getAiModelConfig } from '../config';

export { Type };

export const getGenAI = (): GoogleGenAI | null => {
  const apiKey = config.geminiApiKey;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

export const geminiChain = (primary: string): string[] => {
  const aiModels = getAiModelConfig();
  return Array.from(new Set([primary, ...aiModels.geminiCandidates.filter(model => model !== primary)]));
};
