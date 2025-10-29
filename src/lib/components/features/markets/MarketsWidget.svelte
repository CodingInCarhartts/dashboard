<script lang="ts">
  import { onMount } from 'svelte';
  import { MARKETS_CONFIG } from '$lib/config';
  import { marketsService } from '$lib/services/markets';
  import type { Market } from '$lib/types';
  import { MarketItem } from './';
  import './markets.css';

  let markets: Market[] = [];
  let loading = true;

  onMount(async () => {
    try {
      markets = await marketsService.fetchMarkets(MARKETS_CONFIG.markets);
    } catch (error) {
      console.error('Error loading markets data:', error);
    } finally {
      loading = false;
    }
  });
</script>

<div class="widget">
  <h3>Markets</h3>
  {#if loading}
    <p>Fetching market data...</p>
  {:else}
    <div class="markets-list">
      {#each markets as market}
        <MarketItem {market} />
      {/each}
    </div>
  {/if}
</div>

