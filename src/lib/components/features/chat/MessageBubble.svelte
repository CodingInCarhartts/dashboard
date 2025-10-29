<script lang="ts">
  import type { Message } from '$lib/types';

  export let message: Message;
</script>

<div class="chat-message">
  <div class="message-role">{message.role}</div>
  {#if message.role === 'assistant' && message.provider && message.model}
    <div class="message-provider-tag">{message.provider}: {message.model}</div>
  {/if}
  <div class="message-content message-{message.role}">
    {message.content}
  </div>
</div>
