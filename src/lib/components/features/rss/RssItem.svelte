<script lang="ts">
  import type { RssItem } from '$lib/types';
  export let item: RssItem;

  function estimateReadingTime(text: string): number {
    const wordsPerMinute = 200;
    const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }
</script>

<li class="rss-item">
  <a href={item.link} target="_blank" rel="noopener">
    <strong>{item.title}</strong>
  </a>
  <div class="meta">
    <span class="feed">{item.feedTitle}</span>
    <span class="date">{new Date(item.pubDate).toLocaleDateString()}</span>
    {#if item.description}
      <span class="reading-time">{estimateReadingTime(item.description)} min read</span>
    {/if}
  </div>
  {#if item.description}
    <p class="description">{item.description.replace(/<[^>]*>/g, '').substring(0, 120)}...</p>
  {/if}
</li>