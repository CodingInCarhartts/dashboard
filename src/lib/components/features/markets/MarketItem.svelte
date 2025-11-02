<script lang="ts">
  import type { Market, OHLCData } from '$lib/types';
  import { marketsService } from '$lib/services/markets';
  import { alphaVantage } from '$lib/services';
  import { Dialog } from 'bits-ui';
  import { ColumnChart } from './';

  export let market: Market;

  let showChart = false;
  let ohlcData: OHLCData[] = [];
  let loadingChart = false;

  async function viewChart() {
    console.log('View chart clicked for', market.symbol);
    loadingChart = true;
    showChart = true;
    try {
      ohlcData = await alphaVantage.fetchDailyOHLC(market.symbol);
      console.log('Fetched OHLC data:', ohlcData);
    } catch (error) {
      console.error('Error fetching OHLC data:', error);
      ohlcData = [];
    } finally {
      loadingChart = false;
    }
  }
</script>

<div class="market-item">
  <div class="market-info">
    <a
      class="symbol"
      href="https://finance.yahoo.com/quote/{market.symbol}"
      target="_blank"
      rel="noopener">{market.symbol}</a
    >
    <span class="name">{market.name}</span>
  </div>
  <div class="market-price">
    <span class="price">${market.price?.toFixed(2) ?? 'N/A'}</span>
    <span
      class="change"
      class:positive={market.change && market.change > 0}
      class:negative={market.change && market.change < 0}
    >
      {market.change && market.change > 0 ? '+' : ''}{market.change?.toFixed(2) ?? 'N/A'} ({market.changePercent &&
      market.changePercent > 0
        ? '+'
        : ''}{market.changePercent?.toFixed(2) ?? 'N/A'}%)
    </span>
    {#if market.changePercent}
      <div
        class="change-bar"
        class:positive={market.changePercent > 0}
        class:negative={market.changePercent < 0}
      >
        <div
          class="bar-fill"
          style="width: {Math.min(Math.abs(market.changePercent), 10) * 10}%"
        ></div>
      </div>
    {/if}
  </div>
  <button on:click={viewChart} class="view-chart-btn">View Chart</button>
</div>

<Dialog.Root bind:open={showChart}>
  <Dialog.Content>
    <Dialog.Title>{market.symbol} Daily OHLC Data</Dialog.Title>
    <div class="min-h-[320px]">
      {#if loadingChart}
        <p>Loading chart...</p>
      {:else if ohlcData.length === 0}
        <p>No data available</p>
      {:else}
        <ColumnChart {ohlcData} symbol={market.symbol} />
      {/if}
    </div>
  </Dialog.Content>
</Dialog.Root>
