<script lang="ts">
  import type { DevtoArticle } from '$lib/types';
  export let article: DevtoArticle;

  function estimateReadingTime(text: string): number {
    const wordsPerMinute = 200;
    const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }
</script>

<li class="devto-item">
  <a href={article.link} target="_blank" rel="noopener">
    <strong>{article.title}</strong>
  </a>
  <div class="meta">
    <span class="feed">{article.feedTitle}</span>
    <span class="date">{new Date(article.pubDate).toLocaleDateString()}</span>
    {#if article.description}
      <span class="reading-time">{estimateReadingTime(article.description)} min read</span>
    {/if}
  </div>
  {#if article.description}
    <p class="description">{article.description.replace(/<[^>]*>/g, '').substring(0, 120)}...</p>
  {/if}
</li>
