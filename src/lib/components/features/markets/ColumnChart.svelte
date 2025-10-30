<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { HistoricalData } from '$lib/types';
  import ApexCharts from 'apexcharts';

  export let historicalData: HistoricalData[] = [];
  export let symbol: string = '';

  let chartElement: HTMLElement;
  let chart: ApexCharts;

  $: if (historicalData.length > 0 && chartElement) {
    updateChart();
  }

  function updateChart() {
    if (chart) {
      chart.updateOptions(getOptions());
    } else {
      chart = new ApexCharts(chartElement, getOptions());
      chart.render();
    }
  }

  function getOptions() {
    return {
      series: [
        {
          name: `${symbol} Close Price`,
          data: historicalData.map(d => d.close),
          color: '#1A56DB',
        },
      ],
      chart: {
        type: 'bar',
        height: '100%',
        width: '100%',
        fontFamily: 'Inter, sans-serif',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '70%',
          borderRadiusApplication: 'end',
          borderRadius: 8,
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        style: {
          fontFamily: 'Inter, sans-serif',
        },
      },
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 1,
          },
        },
      },
      stroke: {
        show: true,
        width: 0,
        colors: ['transparent'],
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -14,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: historicalData.map(d => d.date),
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
      fill: {
        opacity: 1,
      },
    };
  }

  onMount(() => {
    if (historicalData.length > 0) {
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