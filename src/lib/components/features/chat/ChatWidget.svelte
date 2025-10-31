<script lang="ts">
  import { CHAT_CONFIG } from '$lib/config';
  import { chatService } from '$lib/services/chat';
  import { chatStore } from '$lib/stores/chat';
  import MessageBubble from './MessageBubble.svelte';
  import '$lib/styles/components/features/chat.css';

  let inputMessage = '';
  let error = '';

  function generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  async function addMessage(role: 'user' | 'assistant', content: string, provider?: string, model?: string): Promise<void> {
    const message = {
      id: generateId(),
      role,
      content,
      timestamp: new Date(),
      provider,
      model
    };

    // Add to store (handles DB saving and state updates)
    await chatStore.addMessage(message);
  }

  async function sendMessage(): Promise<void> {
    if (!inputMessage.trim() || $chatStore.isLoading) return;

    const userMessage = inputMessage.trim();
    inputMessage = '';
    error = '';

    await addMessage('user', userMessage);
    chatStore.setLoading(true);

    try {
      const chatMessages = $chatStore.messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await chatService.getChatResponse($chatStore.currentProvider, chatMessages, { model: $chatStore.currentModel });
      await addMessage('assistant', response.response, $chatStore.currentProvider, $chatStore.currentModel);
    } catch (err) {
      console.error('Chat error:', err);
      error = err instanceof Error ? err.message : 'Failed to get response';
    } finally {
      chatStore.setLoading(false);
    }
  }

  async function clearChat(): Promise<void> {
    error = '';
    await chatStore.clearChat();
  }

  function switchProvider(provider: 'perplexity' | 'gemini' | 'minimax'): void {
    chatStore.setCurrentProvider(provider);
  }

  function switchModel(model: string): void {
    chatStore.setCurrentModel(model);
  }

  function handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }
</script>

<div class="widget-chat">
  <div class="chat-header">
    <h3 class="chat-title">AI Chat</h3>
    <div class="chat-model-selector">
      <select bind:value={$chatStore.currentModel} class="model-dropdown">
        {#each chatService.getAvailableModels($chatStore.currentProvider) as model}
          <option value={model.id}>{model.name}</option>
        {/each}
      </select>
    </div>
    <div class="chat-header-actions">
      <button
        class="provider-button {$chatStore.currentProvider === 'perplexity' ? 'active' : ''}"
        on:click={() => switchProvider('perplexity')}
      >
        <img src="/perplexity-book-dark.png" alt="Perplexity AI" />
      </button>
       <button
         class="provider-button {$chatStore.currentProvider === 'gemini' ? 'active' : ''}"
         on:click={() => switchProvider('gemini')}
       >
         <img src="/google-gemini.png" alt="Google Gemini" />
       </button>
       <button
         class="provider-button {$chatStore.currentProvider === 'minimax' ? 'active' : ''}"
         on:click={() => switchProvider('minimax')}
       >
         <img src="/minimax-color.png" alt="MiniMax" />
       </button>
       {#if $chatStore.messages.length > 0}
        <button class="clear-chat" on:click={clearChat}>
          Clear Chat
        </button>
      {/if}
    </div>
  </div>

  <div class="chat-container">

    <div class="chat-messages">
      {#if $chatStore.messages.length === 0}
        <div class="chat-empty">
          <div class="chat-empty-icon">💬</div>
          <p>Start a conversation with {CHAT_CONFIG.providers[$chatStore.currentProvider].name}</p>
        </div>
      {:else}
         {#each $chatStore.messages as message (message.id)}
           <MessageBubble {message} />
         {/each}
      {/if}

      {#if $chatStore.isLoading}
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
          disabled={$chatStore.isLoading}
          rows="1"
        ></textarea>
        <button
          class="send-button"
          on:click={sendMessage}
          disabled={!inputMessage.trim() || $chatStore.isLoading}
        >
          {#if $chatStore.isLoading}
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