<script lang="ts">
  import type { Market } from '$lib/types';
  export let market: Market;
</script>

<div class="market-item">
  <div class="market-info">
    <a class="symbol" href="https://finance.yahoo.com/quote/{market.symbol}" target="_blank" rel="noopener">{market.symbol}</a>
    <span class="name">{market.name}</span>
  </div>
  <div class="market-price">
    <span class="price">${market.price?.toFixed(2) ?? 'N/A'}</span>
    <span class="change" class:positive={market.change && market.change > 0} class:negative={market.change && market.change < 0}>
      {market.change && market.change > 0 ? '+' : ''}{market.change?.toFixed(2) ?? 'N/A'} ({market.changePercent && market.changePercent > 0 ? '+' : ''}{market.changePercent?.toFixed(2) ?? 'N/A'}%)
    </span>
    {#if market.changePercent}
      <div class="change-bar" class:positive={market.changePercent > 0} class:negative={market.changePercent < 0}>
        <div class="bar-fill" style="width: {Math.min(Math.abs(market.changePercent), 10) * 10}%"></div>
      </div>
    {/if}
  </div>
</div>