<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { chatStore } from '$lib/stores/chat';
  import type { Conversation } from '$lib/types';

  let conversations: (Conversation & { provider?: string; model?: string })[] = [];
  let loading = true;
  let error = '';
  let selectedConversationId: string | null = null;

  onMount(async () => {
    await loadConversations();
  });

  async function loadConversations() {
    try {
      loading = true;
      error = '';

      // Get conversations
      const { data: convs, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .order('updated_at', { ascending: false });

      if (convError) throw convError;

      if (!convs || convs.length === 0) {
        conversations = [];
        return;
      }

      // Get first message for each conversation to extract provider/model
      const conversationIds = convs.map((c: any) => c.id);
      const { data: messages, error: msgError } = await supabase
        .from('messages')
        .select('conversation_id, provider, model')
        .in('conversation_id', conversationIds)
        .order('timestamp', { ascending: true });

      if (msgError) throw msgError;

      // Map first message per conversation
      const firstMessages = new Map();
      messages?.forEach((msg: any) => {
        if (!firstMessages.has(msg.conversation_id)) {
          firstMessages.set(msg.conversation_id, msg);
        }
      });

      // Combine conversations with provider/model
      conversations = convs.map((conv: any) => ({
        ...conv,
        provider: firstMessages.get(conv.id)?.provider || '',
        model: firstMessages.get(conv.id)?.model || '',
      }));
    } catch (e) {
      console.error('Error loading conversations:', e);
      error = 'Failed to load conversations';
    } finally {
      loading = false;
    }
  }

  async function toggleConversation(conversationId: string) {
    if (selectedConversationId === conversationId) {
      // Deselect: clear chat
      selectedConversationId = null;
      await chatStore.clearChat();
    } else {
      // Select: load conversation
      selectedConversationId = conversationId;
      await chatStore.loadConversation(conversationId);
    }
  }

  async function startNewChat() {
    selectedConversationId = null;
    await chatStore.clearChat();
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
</script>

<div class="conversation-viewer">
  <h3 class="text-lg font-semibold mb-4">Chat History</h3>

  {#if loading}
    <div class="text-center py-4">Loading conversations...</div>
  {:else if error}
    <div class="text-red-500 text-center py-4">{error}</div>
  {:else if conversations.length === 0}
    <div class="text-center py-4 text-gray-500">No conversations yet</div>
  {:else}
    <div class="space-y-2 max-h-96 overflow-y-auto">
      {#each conversations as conversation (conversation.id)}
        <label
          class="conversation-toggle flex items-center justify-between p-3 border rounded hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
        >
          <div class="conversation-info">
            <div class="font-medium">{conversation.title || 'Untitled Chat'}</div>
            {#if conversation.provider && conversation.model}
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {conversation.provider} - {conversation.model}
              </div>
            {/if}
            <div class="text-sm text-gray-500">
              {formatDate(conversation.created_at)}
            </div>
          </div>
          <div class="toggle-container">
            <input
              type="checkbox"
              class="toggle-input"
              checked={selectedConversationId === conversation.id}
              on:change={() => toggleConversation(conversation.id)}
            />
            <span class="toggle-slider"></span>
          </div>
        </label>
      {/each}
    </div>
  {/if}

  <div class="mt-4 space-y-2">
    <button
      class="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      on:click={startNewChat}
    >
      New Chat
    </button>
    <button
      class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      on:click={loadConversations}
      disabled={loading}
    >
      Refresh
    </button>
  </div>
</div>

<style>
  .conversation-viewer {
    @apply p-4 bg-white dark:bg-gray-900 rounded-lg shadow;
  }

  .conversation-toggle {
    transition: background-color 0.2s ease;
  }

  .toggle-container {
    position: relative;
    width: 44px;
    height: 24px;
  }

  .toggle-input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 24px;
  }

  .toggle-slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  .toggle-input:checked + .toggle-slider {
    background-color: #2196F3;
  }

  .toggle-input:checked + .toggle-slider:before {
    transform: translateX(20px);
  }

  .toggle-input:focus + .toggle-slider {
    box-shadow: 0 0 1px #2196F3;
  }
</style>

