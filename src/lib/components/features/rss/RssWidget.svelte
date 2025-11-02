<script lang="ts">
  import { onMount } from 'svelte';
  import { RSS_CONFIG } from '$lib/config';
  import { rssService } from '$lib/services/rss';
  import type { RssFeed, RssItem } from '$lib/types';
  import { RssItem as RssItemComponent } from './';
  import '$lib/styles/components/features/rss.css';

  let feeds: RssFeed[] = RSS_CONFIG.feeds;

  let items: RssItem[] = [];
  let loading = true;
  let error = '';

  async function fetchFeed(feedUrl: string, limit: number): Promise<any[]> {
    try {
      const data = await rssService.fetchRss(feedUrl);
      return data.items?.slice(0, limit) || [];
    } catch (err) {
      console.error('Error fetching RSS:', err);
      return [];
    }
  }

  onMount(async () => {
    try {
      const allItems: RssItem[] = [];
      for (const feed of feeds) {
        const feedItems = await fetchFeed(feed.url, feed.limit || 5);
        allItems.push(...feedItems.map((item) => ({ ...item, feedTitle: feed.title })));
      }
      items = allItems.sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      );
    } catch (err) {
      error = 'Failed to load RSS feeds';
    } finally {
      loading = false;
    }
  });
</script>

<div class="widget">
  <h3>RSS Feeds</h3>
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p>{error}</p>
  {:else}
    <ul class="rss-list">
      {#each items as item}
        <RssItemComponent {item} />
      {/each}
    </ul>
  {/if}
</div>
