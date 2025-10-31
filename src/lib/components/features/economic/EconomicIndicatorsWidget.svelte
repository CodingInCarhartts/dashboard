<script lang="ts">
  import { onMount } from 'svelte';
  import { getCachedEconomicIndicators } from '$lib/cache';
  import type { EconomicIndicator } from '$lib/types';
  import { EconomicIndicatorItem } from './';
  import '$lib/styles/components/features/economic.css';

  let indicators: EconomicIndicator[] = [];
  let loading = true;
  let error = '';

  onMount(async () => {
    try {
      indicators = await getCachedEconomicIndicators();
    } catch (err) {
      error = 'Failed to load economic data';
      console.error('Error loading economic indicators:', err);
    } finally {
      loading = false;
    }
  });
</script>

<div class="widget">
  <h3>Economic Indicators</h3>
  {#if loading}
    <p>Loading economic data...</p>
  {:else if error}
    <p>{error}</p>
  {:else}
    <div class="indicators-list">
      {#each indicators as indicator}
        <EconomicIndicatorItem {indicator} />
      {/each}
    </div>
  {/if}
</div>