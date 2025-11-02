<script lang="ts">
  import DynamicWidget from './DynamicWidget.svelte';
  import { DEFAULT_TABS, getWidgetsForColumn } from '$lib/config/tabs';
  import { tabStore } from '$lib/stores/tabs';

  $: activeTab = $tabStore.activeTab;
</script>

<div class="dashboard">
  <div>
    {#each DEFAULT_TABS as tab}
      {@const allWidgets =
        DEFAULT_TABS.find((t) => t.id === tab.id)?.widgets.filter((w) => w.enabled) || []}
      {@const spanningWidgets = allWidgets
        .filter((w) => w.position.span)
        .sort((a, b) => a.position.order - b.position.order)}
      {@const tabLeftWidgets = getWidgetsForColumn(tab.id, 'left').filter((w) => !w.position.span)}
      {@const tabMiddleWidgets = getWidgetsForColumn(tab.id, 'middle').filter(
        (w) => !w.position.span
      )}
      {@const tabRightWidgets = getWidgetsForColumn(tab.id, 'right').filter(
        (w) => !w.position.span
      )}
      <div class="transition-opacity {activeTab === tab.id ? 'opacity-100' : 'opacity-0 hidden'}">
        <div
          class="dashboard-grid h-full {tab.layout === 'grid-2col' ? 'dashboard-grid-2col' : ''}"
        >
          {#each spanningWidgets as widget}
            {@const spanClass = widget.position.span ? `widget-span-${widget.position.span}` : ''}
            <div class={spanClass}>
              <DynamicWidget config={widget} />
            </div>
          {/each}
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
      </div>
    {/each}
  </div>
</div>
