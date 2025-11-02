<script lang="ts">
  import { onMount } from 'svelte';
  import { clearAllCache, clearCacheByType, getCacheStats } from '$lib/cache';

  let stats: Awaited<ReturnType<typeof getCacheStats>> | null = null;
  let showDetails = false;

  async function loadStats() {
    stats = await getCacheStats();
  }

  async function clearAll() {
    await clearAllCache();
    await loadStats();
  }

  async function clearType(
    type:
      | 'hacker_news'
      | 'weather'
      | 'rss'
      | 'youtube'
      | 'kick'
      | 'reddit'
      | 'github'
      | 'markets'
      | 'devto'
      | 'economic'
  ) {
    await clearCacheByType(type);
    await loadStats();
  }

  onMount(loadStats);

  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function formatAge(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return `${seconds}s ago`;
  }
</script>

<div class="cache-status">
  <h4>Cache Status</h4>
  {#if stats}
    <div class="stats">
      <p><strong>{stats.totalEntries}</strong> cached entries</p>
      <p><strong>{formatBytes(stats.totalSize)}</strong> total size</p>
    </div>

    <div class="actions">
      <button on:click={clearAll} class="clear-btn">Clear All Cache</button>
      <button on:click={() => (showDetails = !showDetails)} class="details-btn">
        {showDetails ? 'Hide' : 'Show'} Details
      </button>
    </div>

    {#if showDetails}
      <div class="details">
        <h5>Cache Entries:</h5>
        <div class="entry-list">
          {#each stats.entries as entry}
            <div class="entry">
              <span class="key">{entry.key}</span>
              <span class="age">{formatAge(entry.age)}</span>
              <span class="size">{formatBytes(entry.size)}</span>
              <button
                on:click={() => clearType(entry.key.split('_')[0] as any)}
                class="clear-type-btn"
              >
                Clear Type
              </button>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  {:else}
    <p>Loading cache stats...</p>
  {/if}
</div>

<style>
  .cache-status {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 0.9rem;
  }

  .stats {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .clear-btn,
  .details-btn,
  .clear-type-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
  }

  .clear-btn:hover,
  .clear-type-btn:hover {
    background: rgba(255, 0, 0, 0.2);
    border-color: rgba(255, 0, 0, 0.4);
  }

  .details-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .entry-list {
    max-height: 200px;
    overflow-y: auto;
  }

  .entry {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .key {
    flex: 1;
    font-family: monospace;
    font-size: 0.8rem;
  }

  .age,
  .size {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.7);
  }
</style>
