<script lang="ts">
  import { onMount } from 'svelte';
  import { CHAT_CONFIG } from '$lib/config';
  import type { Message, Provider, StoredMessage } from '$lib/types';
  import { chatService } from '$lib/services/chat';
  import MessageBubble from './MessageBubble.svelte';
  import './chat.css';

  let messages: Message[] = [];
  let currentProvider: Provider = CHAT_CONFIG.defaultProvider as Provider;
  let currentModel = CHAT_CONFIG.providers[currentProvider].model;
  let inputMessage = '';
  let isLoading = false;
  let error = '';

  function generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  function addMessage(role: 'user' | 'assistant', content: string, provider?: string, model?: string): void {
    messages = [...messages, {
      id: generateId(),
      role,
      content,
      timestamp: new Date(),
      provider,
      model
    }];

    // Limit message history
    if (messages.length > CHAT_CONFIG.maxHistoryLength) {
      messages = messages.slice(-CHAT_CONFIG.maxHistoryLength);
    }
  }

  async function sendMessage(): Promise<void> {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    inputMessage = '';
    error = '';

    addMessage('user', userMessage);
    isLoading = true;

    try {
      const chatMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await chatService.getChatResponse(currentProvider, chatMessages, { model: currentModel });
      addMessage('assistant', response.response, currentProvider, currentModel);
    } catch (err) {
      console.error('Chat error:', err);
      error = err instanceof Error ? err.message : 'Failed to get response';
    } finally {
      isLoading = false;
    }
  }

  function handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  function clearChat(): void {
    messages = [];
    error = '';
  }

  function switchProvider(provider: Provider): void {
    currentProvider = provider;
    currentModel = CHAT_CONFIG.providers[provider].model;
  }

  onMount(() => {
    // Load chat history from localStorage if available
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('dashboard_chat_history');
        if (saved) {
          const parsed: StoredMessage[] = JSON.parse(saved);
          messages = parsed.map((msg) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
            provider: msg.provider || undefined,
            model: msg.model || undefined
          }));
        }
      } catch (err) {
        console.error('Error loading chat history:', err);
      }
    }
  });

  // Save chat history to localStorage
  $: if (typeof window !== 'undefined' && messages.length > 0) {
    try {
      localStorage.setItem('dashboard_chat_history', JSON.stringify(messages));
    } catch (err) {
      console.error('Error saving chat history:', err);
    }
  }
</script>

<div class="widget">
  <div class="chat-header">
    <h3 class="chat-title">AI Chat</h3>
    <div class="chat-model-selector">
      <select bind:value={currentModel} class="model-dropdown">
        {#each chatService.getAvailableModels(currentProvider) as model}
          <option value={model.id}>{model.name}</option>
        {/each}
      </select>
    </div>
    <div class="chat-header-actions">
      <button
        class="provider-button {currentProvider === 'perplexity' ? 'active' : ''}"
        on:click={() => switchProvider('perplexity')}
      >
        <img src="/perplexity-book-dark.png" alt="Perplexity AI" />
      </button>
      <button
        class="provider-button {currentProvider === 'gemini' ? 'active' : ''}"
        on:click={() => switchProvider('gemini')}
      >
        <img src="/google-gemini.png" alt="Google Gemini" />
      </button>
      {#if messages.length > 0}
        <button class="clear-chat" on:click={clearChat}>
          Clear Chat
        </button>
      {/if}
    </div>
  </div>

  <div class="chat-container">

    <div class="chat-messages">
      {#if messages.length === 0}
        <div class="chat-empty">
          <div class="chat-empty-icon">💬</div>
          <p>Start a conversation with {CHAT_CONFIG.providers[currentProvider].name}</p>
        </div>
      {:else}
         {#each messages as message (message.id)}
           <MessageBubble {message} />
         {/each}
      {/if}

      {#if isLoading}
        <div class="chat-loading">
          <div class="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          Thinking...
        </div>
      {/if}
    </div>

    {#if error}
      <div class="chat-error">
        {error}
      </div>
    {/if}

    <div class="chat-input-section">
      <div class="chat-input-container">
        <textarea
          class="chat-input"
          placeholder="Ask me anything..."
          bind:value={inputMessage}
          on:keypress={handleKeyPress}
          disabled={isLoading}
          rows="1"
        ></textarea>
        <button
          class="send-button"
          on:click={sendMessage}
          disabled={!inputMessage.trim() || isLoading}
        >
          {#if isLoading}
            <div class="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          {:else}
            <img src="/paper-plane.png" alt="Send" />
          {/if}
        </button>
      </div>
    </div>
  </div>
</div>