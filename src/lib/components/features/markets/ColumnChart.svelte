<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { OHLCData } from '$lib/types';

  export let ohlcData: OHLCData[] = [];
  export let symbol: string = '';

  let chartElement: HTMLElement;
  let chart: any;
  let ApexCharts: any;

  $: if (ohlcData.length > 0 && chartElement && ApexCharts) {
    console.log('Updating chart with OHLC data:', ohlcData);
    updateChart();
  }

  async function updateChart() {
    if (chart) {
      chart.updateOptions(getOptions());
    } else {
      chart = new ApexCharts(chartElement, getOptions());
      await chart.render();
    }
  }

  function getOptions() {
    return {
      series: [
        {
          name: `${symbol} OHLC`,
          data: ohlcData.map((d) => ({
            x: d.date,
            y: [d.open, d.high, d.low, d.close],
          })),
        },
      ],
      chart: {
        type: 'candlestick',
        height: 320,
        width: '100%',
        fontFamily: 'Inter, sans-serif',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: '#1A56DB',
            downward: '#F05252',
          },
        },
      },
      tooltip: {
        enabled: true,
        style: {
          fontFamily: 'Inter, sans-serif',
        },
      },
      xaxis: {
        type: 'category',
        labels: {
          show: true,
          style: {
            fontFamily: 'Inter, sans-serif',
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
    };
  }

  onMount(async () => {
    console.log('Chart element:', chartElement);
    ApexCharts = (await import('apexcharts')).default;
    if (ohlcData.length > 0) {
      updateChart();
    }
  });

  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });
</script>

<div bind:this={chartElement} class="w-full h-64"></div>
