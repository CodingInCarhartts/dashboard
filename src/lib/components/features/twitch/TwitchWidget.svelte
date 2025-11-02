<script lang="ts">
  import { onMount } from 'svelte';
  import { TWITCH_CONFIG } from '$lib/config';
  import { getCachedTwitchStreams } from '$lib/cache';
  import type { TwitchStream, TwitchApiResponse } from '$lib/types';
  import { TwitchStreamItem } from './';
  import '$lib/styles/components/features/twitch.css';

  let streams: TwitchStream[] = [];
  let loading = true;
  let error = '';

  onMount(async () => {
    try {
      const data: TwitchApiResponse = await getCachedTwitchStreams(TWITCH_CONFIG.channels);
      // Filter live streams, sort by viewers
      streams = data.data
        .filter((stream) => stream.type === 'live')
        .sort((a, b) => b.viewer_count - a.viewer_count);
    } catch (err) {
      error = 'Failed to load Twitch streams';
      console.error('Error loading Twitch streams:', err);
    } finally {
      loading = false;
    }
  });
</script>

<div class="widget">
  <h3>Twitch Streams</h3>
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p>{error}</p>
  {:else if streams.length === 0}
    <p>No live streams</p>
  {:else}
    <div class="twitch-list">
      {#each streams as stream}
        <TwitchStreamItem {stream} />
      {/each}
    </div>
  {/if}
</div>
