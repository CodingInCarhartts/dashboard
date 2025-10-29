import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Message, Provider, ChatState } from '../types';
import { CHAT_CONFIG } from '../config';

const defaultState: ChatState = {
  messages: [],
  currentProvider: CHAT_CONFIG.defaultProvider as Provider,
  currentModel: CHAT_CONFIG.providers[CHAT_CONFIG.defaultProvider as Provider].model,
  isLoading: false,
  error: '',
};

const CHAT_HISTORY_KEY = 'dashboard_chat_history';

function createChatStore() {
  const { subscribe, set, update } = writable<ChatState>(defaultState);

  if (browser) {
    const stored = localStorage.getItem(CHAT_HISTORY_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Ensure timestamps are Date objects
        parsed.messages = parsed.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        set({ ...defaultState, ...parsed });
      } catch (e) {
        console.error('Error parsing stored chat history:', e);
      }
    }

    subscribe((state) => {
      // Only persist messages, provider, and model
      const { messages, currentProvider, currentModel } = state;
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify({ messages, currentProvider, currentModel }));
    });
  }

  return {
    subscribe,
    addMessage: (message: Message) => update((state) => {
      const newMessages = [...state.messages, message];
      if (newMessages.length > CHAT_CONFIG.maxHistoryLength) {
        newMessages.splice(0, newMessages.length - CHAT_CONFIG.maxHistoryLength);
      }
      return { ...state, messages: newMessages };
    }),
    clearChat: () => set({ ...defaultState, currentProvider: defaultState.currentProvider, currentModel: defaultState.currentModel }),
    setLoading: (loading: boolean) => update((state) => ({ ...state, isLoading: loading })),
    setError: (error: string) => update((state) => ({ ...state, error })),
    setCurrentProvider: (provider: Provider) => update((state) => ({
      ...state,
      currentProvider: provider,
      currentModel: CHAT_CONFIG.providers[provider].model,
    })),
    setCurrentModel: (model: string) => update((state) => ({ ...state, currentModel: model })),
  };
}

export const chatStore = createChatStore();
