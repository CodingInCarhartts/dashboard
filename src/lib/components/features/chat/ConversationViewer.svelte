<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { chatStore } from '$lib/stores/chat';
  import type { Conversation } from '$lib/types';

  let conversations: Conversation[] = [];
  let loading = true;
  let error = '';

  onMount(async () => {
    await loadConversations();
  });

  async function loadConversations() {
    try {
      loading = true;
      error = '';

      const { data, error: fetchError } = await supabase
        .from('conversations')
        .select('*')
        .order('updated_at', { ascending: false });

      if (fetchError) throw fetchError;

      conversations = data || [];
    } catch (e) {
      console.error('Error loading conversations:', e);
      error = 'Failed to load conversations';
    } finally {
      loading = false;
    }
  }

  async function loadConversation(conversationId: string) {
    await chatStore.loadConversation(conversationId);
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
        <button
          class="w-full text-left p-3 border rounded hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          on:click={() => loadConversation(conversation.id)}
        >
          <div class="font-medium">{conversation.title || 'Untitled Chat'}</div>
          <div class="text-sm text-gray-500">
            {formatDate(conversation.created_at)}
          </div>
        </button>
      {/each}
    </div>
  {/if}

  <button
    class="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    on:click={loadConversations}
    disabled={loading}
  >
    Refresh
  </button>
</div>

