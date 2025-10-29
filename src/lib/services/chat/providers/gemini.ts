import type { ChatModel } from '../../../types';

export const getGeminiModels = (): ChatModel[] => {
  return [
    { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro' },
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
    { id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash-Lite' },
    { id: 'gemini-2.5-flash-image', name: 'Gemini 2.5 Flash Image' },
    { id: 'gemini-live', name: 'Gemini Live' },
    { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash' },
    { id: 'gemini-2.0-flash-lite', name: 'Gemini 2.0 Flash-Lite' },
    { id: 'gemini-2.5-computer-use', name: 'Gemini 2.5 Computer Use' },
    { id: 'gemini-ultra', name: 'Gemini Ultra' },
    { id: 'gemini-nano', name: 'Gemini Nano' },
    { id: 'gemini-pro', name: 'Gemini Pro' }
  ];
};
