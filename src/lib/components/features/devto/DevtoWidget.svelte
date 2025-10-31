<script lang="ts">
  import { onMount } from 'svelte';
  import { getCachedDevtoArticles } from '$lib/cache';
  import type { DevtoArticle } from '$lib/types';
  import { DevtoArticleItem } from './';
  import '$lib/styles/components/features/devto.css';

  let articles: DevtoArticle[] = [];
  let loading = true;
  let error = '';
  let selectedTag = '';
  let availableTags: string[] = [];

  async function fetchArticles() {
    try {
      const data = await getCachedDevtoArticles();
      articles = data;

      // Extract unique tags
      const tagSet = new Set<string>();
      articles.forEach(article => {
        article.tags?.forEach(tag => tagSet.add(tag));
      });
      availableTags = Array.from(tagSet).sort();
    } catch (err) {
      console.error('Error fetching Dev.to articles:', err);
      error = 'Failed to load Dev.to articles';
    } finally {
      loading = false;
    }
  }

  $: filteredArticles = selectedTag
    ? articles.filter(article => article.tags?.includes(selectedTag))
    : articles;

  onMount(fetchArticles);
</script>

<div class="widget">
  <div class="devto-header">
    <h3 class="devto-title">Dev.to Articles</h3>
    {#if availableTags.length > 0}
      <div class="devto-controls">
        <select bind:value={selectedTag} class="tag-filter">
          <option value="">All Tags</option>
          {#each availableTags as tag}
            <option value={tag}>{tag}</option>
          {/each}
        </select>
      </div>
    {/if}
  </div>

  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p>{error}</p>
  {:else}
    <ul class="devto-list">
      {#each filteredArticles as article}
        <DevtoArticleItem {article} />
      {/each}
    </ul>
  {/if}
</div>