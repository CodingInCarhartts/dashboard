<script lang="ts">
  import { onMount } from 'svelte';
  import { VIDEOS_CONFIG } from '$lib/config';
  import { getCachedYouTubeVideos } from '$lib/cache';
  import type { Video, YouTubeApiResponse } from '$lib/types';
  import { VideoItem } from './';
  import './videos.css';

  let channels = VIDEOS_CONFIG.channels;

  let videos: Video[] = [];
  let loading = true;
  let error = '';

  async function fetchVideos(channelId: string, limit: number = 3): Promise<Video[]> {
    try {
      const data: YouTubeApiResponse = await getCachedYouTubeVideos(channelId);
      return data.items?.slice(0, limit).map((item) => ({
        title: item.title,
        link: item.link,
        published: item.pubDate,
        thumbnail: item.thumbnail
      })) || [];
    } catch (err) {
      console.error('Error fetching videos:', err);
      return [];
    }
  }

  onMount(async () => {
    try {
      const allVideos: Video[] = [];
      for (const channel of channels) {
        const channelVideos = await fetchVideos(channel.id, VIDEOS_CONFIG.limit);
        allVideos.push(...channelVideos);
      }
      videos = allVideos.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()).slice(0, 10);
    } catch (err) {
      error = 'Failed to load videos';
    } finally {
      loading = false;
    }
  });
</script>

<div class="widget">
  <h3>YouTube Videos</h3>
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p>{error}</p>
  {:else}
    <div class="videos-list">
      {#each videos as video}
        <VideoItem {video} />
      {/each}
    </div>
  {/if}
</div>

