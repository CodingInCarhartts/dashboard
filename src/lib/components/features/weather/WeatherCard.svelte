<script lang="ts">
  import type { WeatherDetail } from '$lib/types';

  export let detail: WeatherDetail;
</script>

<div class="weather-detail">
  <div class="weather-detail-icon">{detail.icon}</div>
  <div class="weather-detail-label">{detail.label}</div>
  <div class="weather-detail-value">{detail.value}</div>
</div>
