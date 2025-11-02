<script lang="ts">
  import type { Message } from '$lib/types';

  export let message: Message;

  let copied = false;

  async function copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(message.content);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }
</script>

<div class="chat-message">
  <div class="message-role">{message.role}</div>
  {#if message.role === 'assistant' && message.provider && message.model}
    <div class="message-provider-tag">
      {message.provider}: {message.model}
    </div>
  {/if}
  <div class="message-content message-{message.role}">
    {message.content}
    {#if message.role === 'assistant'}
      <button
        class="copy-button"
        on:click={copyToClipboard}
        title={copied ? 'Copied!' : 'Copy to clipboard'}
      >
        {copied ? '✓' : '📋'}
      </button>
    {/if}
  </div>
</div>
