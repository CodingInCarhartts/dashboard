<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { MARKETS_CONFIG } from '$lib/config';
  import { marketsService } from '$lib/services/markets';
  import type { Market } from '$lib/types';
  import { MarketItem } from './';
  import './markets.css';

  let markets: Market[] = [];
  let loading = true;
  let searchResults: Market[] = [];
  let searchLoading = false;
  let searchTimeout: number | undefined;

  async function refreshMarkets() {
    loading = true;
    try {
      markets = await marketsService.fetchMarkets(MARKETS_CONFIG.markets, true);
    } catch (error) {
      console.error('Error refreshing markets data:', error);
    } finally {
      loading = false;
    }
  }
  let searchTerm = '';

  onMount(async () => {
    try {
      markets = await marketsService.fetchMarkets(MARKETS_CONFIG.markets, false);
    } catch (error) {
      console.error('Error loading markets data:', error);
    } finally {
      loading = false;
    }
  });

  onDestroy(() => {
    if (searchTimeout) clearTimeout(searchTimeout);
  });

  $: filteredMarkets = markets.filter(market =>
    market.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    market.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  $: displayedMarkets = filteredMarkets.length > 0 ? filteredMarkets : searchResults;

  $: if (searchTerm && searchTerm.length > 2) {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
      searchLoading = true;
      try {
        searchResults = await marketsService.searchSymbols(searchTerm);
      } catch (error) {
        console.error('Error searching symbols:', error);
        searchResults = [];
      } finally {
        searchLoading = false;
      }
    }, 2000);
  } else {
    searchResults = [];
    if (searchTimeout) clearTimeout(searchTimeout);
  }
</script>

<div class="widget">
  <div class="widget-header">
    <h3>Markets</h3>
    <button on:click={refreshMarkets} disabled={loading} class="refresh-btn"><img src="/refresh.png" alt="Refresh" class="refresh-icon" /></button>
  </div>
  <input
    type="text"
    placeholder="Search markets..."
    bind:value={searchTerm}
    class="search-input"
  />
  {#if loading}
    <p>Fetching market data...</p>
  {:else if searchLoading}
    <p>Searching for symbols...</p>
  {:else}
    <div class="markets-list">
      {#each displayedMarkets as market}
        <MarketItem {market} />
      {/each}
    </div>
  {/if}
</div>

