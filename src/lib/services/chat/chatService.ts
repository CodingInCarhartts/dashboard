import type { Provider, ChatModel, Message, ChatService } from '../../types';
import { CHAT_CONFIG } from '../../config';
import { getPerplexityModels, getGeminiModels } from './providers';
import { cache } from '../../cache';

class ChatServiceImpl implements ChatService {
  getAvailableModels(provider: Provider): ChatModel[] {
    switch (provider) {
      case 'perplexity':
        return getPerplexityModels();
      case 'gemini':
        return getGeminiModels();
      default:
        return [];
    }
  }

  async getChatResponse(
    provider: Provider,
    messages: Array<Pick<Message, 'role' | 'content'>>,
    options: {maxTokens?: number, temperature?: number, model?: string} = {}
  ): Promise<{response: string, usage?: any}> {
    const cacheKey = `chat_${provider}_${btoa(JSON.stringify({messages, options})).slice(0, 32)}`;

    // Disable caching for chat responses to ensure fresh responses
    const config = CHAT_CONFIG.providers[provider];

    if (provider === 'perplexity') {
      const response = await fetch(`${config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: options.model || config.model,
          messages,
          max_tokens: options.maxTokens || CHAT_CONFIG.maxTokens,
          temperature: options.temperature || CHAT_CONFIG.temperature
        })
      });

      if (!response.ok) {
        throw new Error(`Perplexity API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        response: data.choices[0].message.content,
        usage: data.usage
      };
    } else if (provider === 'gemini') {
      // Convert chat format to Gemini format
      const lastMessage = messages[messages.length - 1];
      const context = messages.slice(0, -1).map(msg =>
        `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      ).join('\n');

      const prompt = context ? `${context}\n\nUser: ${lastMessage.content}\nAssistant:` : lastMessage.content;

      const response = await fetch(
        `${config.baseUrl}/v1beta/models/${options.model || config.model}:generateContent?key=${config.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }],
            generationConfig: {
              maxOutputTokens: options.maxTokens || CHAT_CONFIG.maxTokens,
              temperature: options.temperature || CHAT_CONFIG.temperature
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        response: data.candidates[0].content.parts[0].text,
        usage: data.usageMetadata
      };
    }

    throw new Error(`Unsupported provider: ${provider}`);
  }
}

export const chatService: ChatService = new ChatServiceImpl();
