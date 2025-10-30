<script lang="ts">
  import { onMount } from 'svelte';
  import { MARKETS_CONFIG } from '$lib/config';
  import { marketsService } from '$lib/services/markets';
  import type { MarketIndex } from '$lib/types';
  import './market-indices.css';

  let indices: MarketIndex[] = [];
  let loading = true;

  async function refreshIndices() {
    loading = true;
    try {
      indices = await marketsService.fetchMarkets(MARKETS_CONFIG.indices, true);
    } catch (error) {
      console.error('Error refreshing indices data:', error);
    } finally {
      loading = false;
    }
  }
  let searchTerm = '';

  onMount(async () => {
    try {
      indices = await marketsService.fetchMarkets(MARKETS_CONFIG.indices, false);
    } catch (error) {
      console.error('Error loading market indices data:', error);
    } finally {
      loading = false;
    }
  });

  $: filteredIndices = indices.filter(index =>
    index.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    index.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
</script>

<div class="widget">
  <div class="widget-header">
    <h3>Market Indices</h3>
    <button on:click={refreshIndices} disabled={loading} class="refresh-btn"><img src="/refresh.png" alt="Refresh" class="refresh-icon" /></button>
  </div>
  <input
    type="text"
    placeholder="Search indices..."
    bind:value={searchTerm}
    class="search-input"
  />
  {#if loading}
    <p>Fetching market data...</p>
  {:else}
    <div class="indices-list">
      {#each filteredIndices as index}
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
            {#if index.changePercent}
              <div class="change-bar" class:positive={index.changePercent > 0} class:negative={index.changePercent < 0}>
                <div class="bar-fill" style="width: {Math.min(Math.abs(index.changePercent), 10) * 10}%"></div>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>