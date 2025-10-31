<script lang="ts">
  import { onMount } from 'svelte';
  import { KICK_CONFIG } from '$lib/config';
  import { getCachedKickChannels } from '$lib/cache';
  import type { KickChannel, KickApiResponse } from '$lib/types';
  import { KickStreamItem } from './';
  import '$lib/styles/components/features/kick.css';

  let channels: KickChannel[] = [];
  let loading = true;
  let error = '';

  onMount(async () => {
    try {
      const data: KickApiResponse = await getCachedKickChannels(KICK_CONFIG.channels);
      // Filter live channels, sort by viewers
      channels = data.data
        .filter((channel) => channel.stream?.is_live)
        .sort((a, b) => b.stream.viewer_count - a.stream.viewer_count);
    } catch (err) {
      error = 'Failed to load Kick streams';
      console.error('Error loading Kick channels:', err);
    } finally {
      loading = false;
    }
  });
</script>

<div class="widget">
  <h3>Kick Streams</h3>
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p>{error}</p>
  {:else if channels.length === 0}
    <p>No live streams</p>
  {:else}
    <div class="kick-list">
      {#each channels as channel}
        <KickStreamItem {channel} />
      {/each}
    </div>
  {/if}
</div>