<script lang="ts">
  import { onMount } from 'svelte';
  import { MARKETS_CONFIG } from '$lib/config';
  import { marketsService } from '$lib/services/markets';
  import type { MarketIndex } from '$lib/types';
  import './market-indices.css';

  let indices: MarketIndex[] = [];
  let loading = true;

  onMount(async () => {
    try {
      indices = await marketsService.fetchMarkets(MARKETS_CONFIG.indices);
    } catch (error) {
      console.error('Error loading market indices data:', error);
    } finally {
      loading = false;
    }
  });
</script>

<div class="widget">
  <h3>Market Indices</h3>
  {#if loading}
    <p>Fetching market data...</p>
  {:else}
    <div class="indices-list">
      {#each indices as index}
        <div class="index-item">
          <div class="index-info">
            <a class="symbol" href="https://finance.yahoo.com/quote/{index.symbol}" target="_blank" rel="noopener">{index.symbol.replace('^', '')}</a>
            <span class="name">{index.name}</span>
          </div>
          <div class="index-price">
            <span class="price">{index.price?.toLocaleString('en-US', { maximumFractionDigits: index.symbol === '^VIX' ? 1 : 0 }) ?? 'N/A'}</span>
            <span class="change" class:positive={index.change && index.change > 0} class:negative={index.change && index.change < 0}>
              {index.change && index.change > 0 ? '+' : ''}{index.change?.toFixed(2) ?? 'N/A'} ({index.changePercent && index.changePercent > 0 ? '+' : ''}{index.changePercent?.toFixed(2) ?? 'N/A'}%)
            </span>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>