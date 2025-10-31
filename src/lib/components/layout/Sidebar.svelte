<script lang="ts">
  import { DEFAULT_TABS } from '$lib/config/tabs'
  import { tabStore, setActiveTab } from '$lib/stores/tabs'
  import { browser } from '$app/environment'
  let collapsed = false
  if (browser) {
    collapsed = localStorage.getItem('sidebar_collapsed') === '1'
  }
  $: activeTab = $tabStore.activeTab
  function toggle() {
    collapsed = !collapsed
    if (browser) localStorage.setItem('sidebar_collapsed', collapsed ? '1' : '0')
  }
</script>

<aside class="h-screen sticky top-0 bg-background/20 backdrop-blur supports-[backdrop-filter]:bg-background/10 text-card-foreground flex flex-col transition-[width] duration-200 border-4 border-black" style={`width: ${collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)'}; box-shadow: 8px 8px 0px black;`}
>
  <div class="h-14 px-3 flex items-center justify-between border-b-2 border-black">
    <div class="flex items-center gap-2 overflow-hidden">
      <div class="size-8 rounded-md bg-primary text-primary-foreground grid place-items-center font-bold">D</div>
      <div class="transition-opacity duration-200 {collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}">
        <span class="font-semibold">Dashboard</span>
      </div>
    </div>
    <button class="p-2 rounded-md hover:bg-white/5" on:click={toggle} aria-label="Toggle sidebar">
      {#if collapsed}
        <span>›</span>
      {:else}
        <span>‹</span>
      {/if}
    </button>
  </div>
  <nav class="flex-1 overflow-auto py-3">
    {#each DEFAULT_TABS as tab}
      <button aria-current={activeTab === tab.id ? 'page' : undefined} class="relative w-full px-3 py-2 flex items-center gap-3 rounded-md mx-2 my-0.5 text-left transition-colors hover:bg-white/5 {activeTab === tab.id ? 'bg-white/10' : ''}" on:click={() => setActiveTab(tab.id)}>
        {#if activeTab === tab.id}
          <span class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r bg-primary"></span>
        {/if}
        <span class="shrink-0">{tab.icon || '•'}</span>
        <span class="truncate transition-opacity duration-200 {collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}">{tab.label}</span>
      </button>
    {/each}
  </nav>
</aside>
