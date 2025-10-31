export interface ChatProvider {
  name: string;
  baseUrl: string;
  model: string;
  apiKey: string;
}

export type Provider = 'perplexity' | 'gemini';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  provider?: string;
  model?: string;
}

export interface StoredMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  provider?: string;
  model?: string;
}

export interface ChatModel {
  id: string;
  name: string;
}

export interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ChatState {
  messages: Message[];
  currentProvider: Provider;
  currentModel: string;
  isLoading: boolean;
  error: string;
}
