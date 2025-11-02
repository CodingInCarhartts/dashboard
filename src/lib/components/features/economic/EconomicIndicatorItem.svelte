<script lang="ts">
  import type { EconomicIndicator } from '$lib/types';
  export let indicator: EconomicIndicator;

  function formatValue(value: number, unit: string): string {
    switch (unit) {
      case 'percent':
        return `${value.toFixed(1)}%`;
      case 'index':
        return value.toFixed(1);
      default:
        return value.toLocaleString();
    }
  }

  function formatChange(change: number, changePercent: number, unit: string): string {
    const sign = change > 0 ? '+' : '';
    if (unit === 'percent') {
      return `${sign}${changePercent.toFixed(1)}%`;
    }
    return `${sign}${changePercent.toFixed(1)}%`;
  }
</script>

<div class="indicator-item">
  <div class="indicator-info">
    <span class="name">{indicator.name}</span>
    <span class="frequency">{indicator.frequency}</span>
  </div>
  <div class="indicator-value">
    <span class="value">{formatValue(indicator.value, indicator.unit)}</span>
    {#if indicator.change !== undefined && indicator.changePercent !== undefined}
      <span
        class="change"
        class:positive={indicator.change > 0}
        class:negative={indicator.change < 0}
      >
        {formatChange(indicator.change, indicator.changePercent, indicator.unit)}
      </span>
    {/if}
    <span class="date">{new Date(indicator.date).toLocaleDateString()}</span>
  </div>
</div>
