import { dev } from '$app/environment';
import type { ChatProvider } from '../types';
import { PERPLEXITY_API_KEY, GEMINI_API_KEY, MINIMAX_API_KEY } from '../env';

export const CHAT_CONFIG: { 
  providers: { [key: string]: ChatProvider };
  defaultProvider: string;
  maxHistoryLength: number;
  maxTokens: number;
  temperature: number;
} = {
  providers: {
    perplexity: {
      name: 'Perplexity AI',
      baseUrl: 'https://api.perplexity.ai',
      model: 'sonar',
      apiKey: PERPLEXITY_API_KEY
    },
    gemini: {
      name: 'Google Gemini',
      baseUrl: 'https://generativelanguage.googleapis.com',
      model: 'gemini-2.5-flash-lite',
      apiKey: GEMINI_API_KEY
    },
    minimax: {
      name: 'MiniMax',
      baseUrl: dev ? 'http://localhost:5173/api/minimax' : 'https://api.minimax.io/v1',
      model: 'MiniMax-M2',
      apiKey: MINIMAX_API_KEY
    }
  },
  defaultProvider: 'perplexity',
  maxHistoryLength: 50,
  maxTokens: 1000,
  temperature: 0.7
};
