<script lang="ts">
  import { onMount } from 'svelte';
  import { MARKETS_CONFIG } from '$lib/config';
  import { marketsService } from '$lib/services/markets';
  import type { Market } from '$lib/types';
  import { MarketItem } from './';
  import './markets.css';

  let markets: Market[] = [];
  let loading = true;

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

  $: filteredMarkets = markets.filter(market =>
    market.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    market.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
  {:else}
    <div class="markets-list">
      {#each filteredMarkets as market}
        <MarketItem {market} />
      {/each}
    </div>
  {/if}
</div>

