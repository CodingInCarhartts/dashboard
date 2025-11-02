<script lang="ts">
  import { onMount } from 'svelte';
  import { triggerRefresh } from '$lib/stores/refresh';

  let theme = 'light';
  let menuOpen = false;
  let lastRefresh = 0;

  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }

  function refreshAll() {
    const now = Date.now();
    if (now - lastRefresh < 30000) {
      // 30 second cooldown
      return;
    }
    lastRefresh = now;
    triggerRefresh('all');
  }

  onMount(() => {
    const saved = localStorage.getItem('theme') || 'light';
    theme = saved;
    document.documentElement.classList.toggle('dark', theme === 'dark');
  });
</script>

<div class="fixed bottom-6 right-6 z-50">
  {#if menuOpen}
    <div class="flex flex-col space-y-2 mb-2">
      <!-- Theme -->
      <button
        type="button"
        on:click={() => {
          toggleTheme();
          menuOpen = false;
        }}
        class="flex justify-center items-center w-12 h-12 text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
        aria-label="Toggle theme"
      >
        {#if theme === 'light'}
          <!-- Moon icon for switching to dark -->
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        {:else}
          <!-- Sun icon for switching to light -->
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        {/if}
        <span class="sr-only">Toggle theme</span>
      </button>
      <!-- Refresh -->
      <button
        type="button"
        on:click={() => {
          refreshAll();
          menuOpen = false;
        }}
        class="flex justify-center items-center w-12 h-12 text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
        aria-label="Refresh All"
      >
        <img src="/refresh.png" alt="Refresh" class="w-5 h-5" />
        <span class="sr-only">Refresh All</span>
      </button>
    </div>
  {/if}
  <!-- Main FAB -->
  <button
    type="button"
    on:click={() => (menuOpen = !menuOpen)}
    class="flex items-center justify-center text-black bg-yellow-400 w-12 h-12 border-2 border-black focus:outline-none transition-all hover:translate-y-1 hover:shadow-sm font-bold"
    style="box-shadow: 4px 4px 0px black;"
    aria-label="Open menu"
  >
    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="black" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
    <span class="sr-only">Open menu</span>
  </button>
</div>
