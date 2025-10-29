<script lang="ts">
  import { onMount } from 'svelte';
  import { CALENDAR_CONFIG } from '$lib/config';
  import './calendar.css';

  let currentDate = new Date();
  let days: (number | null)[] = [];
  let monthName = '';
  let year = 0;

  function generateCalendar() {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    const dayOffset = CALENDAR_CONFIG.firstDayOfWeek === 'monday' ? (firstDay.getDay() + 6) % 7 : firstDay.getDay();
    startDate.setDate(startDate.getDate() - dayOffset);

    days = [];
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      if (d.getMonth() === currentDate.getMonth()) {
        days.push(d.getDate());
      } else {
        days.push(null);
      }
    }

    monthName = currentDate.toLocaleString('default', { month: 'long' });
    year = currentDate.getFullYear();
  }

  onMount(generateCalendar);

  const weekdays = CALENDAR_CONFIG.firstDayOfWeek === 'monday'
    ? ['M', 'T', 'W', 'T', 'F', 'S', 'Sun']
    : ['Sun', 'M', 'T', 'W', 'T', 'F', 'S'];
</script>

<div class="widget">
  <h3>Calendar</h3>
  <div class="calendar">
    <div class="header">
      <h4>{monthName} {year}</h4>
    </div>
    <div class="weekdays">
      {#each weekdays as day}
        <div class="weekday">{day}</div>
      {/each}
    </div>
    <div class="days">
      {#each days as day}
        <div class="day" class:current={day === currentDate.getDate() && new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear()}>
          {#if day}
            {day}
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

