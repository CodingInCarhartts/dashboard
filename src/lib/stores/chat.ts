import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Message, Provider, ChatState } from '../types';
import { CHAT_CONFIG } from '../config';
import { supabase } from '../supabase';

const defaultState: ChatState = {
  messages: [],
  currentProvider: CHAT_CONFIG.defaultProvider as Provider,
  currentModel: CHAT_CONFIG.providers[CHAT_CONFIG.defaultProvider as Provider].model,
  isLoading: false,
  error: '',
};

const CONVERSATION_ID_KEY = 'dashboard_current_conversation_id';

function createChatStore() {
  const { subscribe, set, update } = writable<ChatState>(defaultState);

  let currentConversationId: string | null = null;

  if (browser) {
    // Load current conversation ID
    currentConversationId = localStorage.getItem(CONVERSATION_ID_KEY);

    // If no conversation, create new one
    if (!currentConversationId) {
      currentConversationId = crypto.randomUUID();
      localStorage.setItem(CONVERSATION_ID_KEY, currentConversationId);
    }

    // Load messages from DB if conversation exists
    loadConversation(currentConversationId);
  }

  async function loadConversation(conversationId: string) {
    try {
      const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('timestamp', { ascending: true });

      if (error) throw error;

      if (messages) {
        const formattedMessages = messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        update(state => ({ ...state, messages: formattedMessages }));
      }
    } catch (e) {
      console.error('Error loading conversation:', e);
    }
  }

  async function saveMessage(message: Message) {
    if (!currentConversationId) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: currentConversationId,
          role: message.role,
          content: message.content,
          provider: message.provider || '',
          model: message.model || '',
          timestamp: message.timestamp.toISOString(),
        });

      if (error) throw error;
    } catch (e) {
      console.error('Error saving message:', e);
    }
  }

  return {
    subscribe,
    addMessage: (message: Message) => update((state) => {
      const newMessages = [...state.messages, message];
      if (newMessages.length > CHAT_CONFIG.maxHistoryLength) {
        newMessages.splice(0, newMessages.length - CHAT_CONFIG.maxHistoryLength);
      }
      saveMessage(message); // Save to DB
      return { ...state, messages: newMessages };
    }),
    clearChat: () => {
      // Create new conversation
      currentConversationId = crypto.randomUUID();
      localStorage.setItem(CONVERSATION_ID_KEY, currentConversationId);
      set({ ...defaultState, currentProvider: defaultState.currentProvider, currentModel: defaultState.currentModel });
    },
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
