<script lang="ts">
  import { onMount } from 'svelte';
  import './calendar.css';

  let currentTime = '';

  function updateTime() {
    currentTime = new Date().toLocaleString();
  }

  onMount(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  });
</script>

<div class="widget-calendar">
  <p class="time-display">{currentTime}</p>
</div>

