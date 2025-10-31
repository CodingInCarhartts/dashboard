import type { Provider, ChatModel, Message, ChatService } from '../../types';
import { CHAT_CONFIG } from '../../config';
import { getPerplexityModels, getGeminiModels, getMinimaxModels } from './providers';
import { cache } from '../../cache';

class ChatServiceImpl implements ChatService {
  getAvailableModels(provider: Provider): ChatModel[] {
    switch (provider) {
      case 'perplexity':
        return getPerplexityModels();
      case 'gemini':
        return getGeminiModels();
      case 'minimax':
        return getMinimaxModels();
      default:
        return [];
    }
  }

  async generateTitle(userMessage: string): Promise<string> {
    const prompt = `Create a concise, creative title for this AI chat based on the user's question: "${userMessage}". Keep it descriptive but under 50 characters. Make it engaging and relevant. Respond with only the title, no quotes or explanation.`;

    try {
      const response = await fetch(
        `${CHAT_CONFIG.providers.gemini.baseUrl}/v1beta/models/${CHAT_CONFIG.providers.gemini.model}:generateContent?key=${CHAT_CONFIG.providers.gemini.apiKey}`,
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
              maxOutputTokens: 50,
              temperature: 0.7
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const title = data.candidates[0].content.parts[0].text.trim();

      // Ensure title is under 50 chars and clean
      return title.length > 50 ? title.substring(0, 47) + '...' : title;
    } catch (e) {
      console.error('Error generating title:', e);
      // Fallback to truncated user message
      return userMessage.length > 47 ? userMessage.substring(0, 47) + '...' : userMessage;
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
     } else if (provider === 'minimax') {
       const response = await fetch(`${config.baseUrl}/chat/completions`, {
         method: 'POST',
         headers: {
           'Authorization': `Bearer ${config.apiKey}`,
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           model: options.model || config.model,
           messages: messages.map(msg => ({
             role: msg.role,
             content: msg.content
           })),
           max_tokens: options.maxTokens || CHAT_CONFIG.maxTokens,
           temperature: options.temperature || CHAT_CONFIG.temperature
         })
       });

       if (!response.ok) {
         throw new Error(`MiniMax API error: ${response.status}`);
       }

       const data = await response.json();
       return {
         response: data.choices[0].message.content,
         usage: data.usage
       };
     }

     throw new Error(`Unsupported provider: ${provider}`);
  }
}

export const chatService: ChatService = new ChatServiceImpl();
