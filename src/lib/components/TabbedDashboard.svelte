<script lang="ts">
  import DynamicWidget from './DynamicWidget.svelte';
  import { DEFAULT_TABS, getWidgetsForColumn } from '$lib/config/tabs';
  import { tabStore, setActiveTab } from '$lib/stores/tabs';

  $: activeTab = $tabStore.activeTab;

  function handleTabChange(value: string) {
    setActiveTab(value);
  }
</script>

<div class="dashboard">
  <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
    <ul class="flex flex-wrap justify-center -mb-px text-sm font-medium text-center" role="tablist">
      {#each DEFAULT_TABS as tab}
        <li class="mr-2" role="presentation">
           <button class="inline-block p-4 border-b-2 rounded-t-lg transition-colors {activeTab === tab.id ? 'border-gray-300 text-gray-300 dark:text-gray-300' : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}" type="button" role="tab" on:click={() => handleTabChange(tab.id)}>
            {#if tab.icon}
              <span class="text-base mr-2">{tab.icon}</span>
            {/if}
            {tab.label}
          </button>
        </li>
      {/each}
    </ul>
  </div>
  <div>
    {#each DEFAULT_TABS as tab}
       <div class="transition-opacity {activeTab === tab.id ? 'opacity-100' : 'opacity-0 hidden'}">
        {#if true}
           {@const allWidgets = DEFAULT_TABS.find(t => t.id === tab.id)?.widgets.filter(w => w.enabled) || []}
            {@const spanningWidgets = allWidgets.filter(w => w.position.span).sort((a, b) => a.position.order - b.position.order)}
           {@const tabLeftWidgets = getWidgetsForColumn(tab.id, 'left').filter(w => !w.position.span)}
           {@const tabMiddleWidgets = getWidgetsForColumn(tab.id, 'middle').filter(w => !w.position.span)}
           {@const tabRightWidgets = getWidgetsForColumn(tab.id, 'right').filter(w => !w.position.span)}
            <div class="dashboard-grid h-full {tab.layout === 'grid-2col' ? 'dashboard-grid-2col' : ''}">
              <!-- Render spanning widgets first -->
              {#each spanningWidgets as widget}
                {@const spanClass = widget.position.span ? `widget-span-${widget.position.span}` : ''}
                <div class={spanClass}>
                  <DynamicWidget config={widget} />
                </div>
              {/each}

              <!-- Render column-based widgets -->
              <div class="column small">
                {#each tabLeftWidgets as widget}
                  <DynamicWidget config={widget} />
                {/each}
              </div>
              {#if tab.layout === 'grid-3col'}
                <div class="column full">
                  {#each tabMiddleWidgets as widget}
                    <DynamicWidget config={widget} />
                  {/each}
                </div>
              {/if}
              <div class="column small">
                {#each tabRightWidgets as widget}
                  <DynamicWidget config={widget} />
                {/each}
               </div>
            </div>
         {/if}
       </div>
    {/each}
  </div>
</div>

