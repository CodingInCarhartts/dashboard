<script lang="ts">
  import { onMount } from 'svelte';
  import { hackerNewsService } from '$lib/services/hacker-news';
  import type { HNStory } from '$lib/types';
  import { HNStoryItem } from './';
  import '$lib/styles/components/features/hacker-news.css';

  let stories: HNStory[] = [];
  let loading = true;
  let error = '';

  onMount(async () => {
    try {
      stories = await hackerNewsService.fetchHackerNews();
    } catch (err) {
      error = 'Failed to load Hacker News';
      console.error('Error loading HN stories:', err);
    } finally {
      loading = false;
    }
  });
</script>

<div class="widget">
  <h3>Hacker News</h3>
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p>{error}</p>
  {:else}
    <ul class="hn-list">
      {#each stories as story}
        <HNStoryItem {story} />
      {/each}
    </ul>
  {/if}
</div>
