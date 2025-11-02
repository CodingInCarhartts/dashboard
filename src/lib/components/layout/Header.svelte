<script lang="ts">
  import { DEFAULT_TABS, getTabConfig } from '$lib/config/tabs';
  import { tabStore } from '$lib/stores/tabs';
  let search = '';
  $: activeTabId = $tabStore.activeTab;
  $: title = getTabConfig(activeTabId)?.label || 'Dashboard';
</script>

<header class="h-14 border-b border-border bg-transparent px-4 flex items-center justify-between">
  <h1 class="text-lg font-semibold text-card-foreground">{title}</h1>
  <div class="flex items-center gap-2">
    <input class="input-field w-56 hidden md:block" placeholder="Search" bind:value={search} />
  </div>
</header>
