<script lang="ts">
  import { onMount } from 'svelte';
  import type { WidgetConfig } from '$lib/types';

  export let config: WidgetConfig;

  let component: any = null;
  let loading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      // Use switch statement for static imports (more reliable than dynamic imports)
      let module: { default: any };

      switch (config.component) {
        case 'RedditWidget':
          // @ts-ignore
          module = await import('./features/reddit/RedditWidget.svelte');
          break;
        case 'KickWidget':
          // @ts-ignore
          module = await import('./features/kick/KickWidget.svelte');
          break;
        case 'HackerNewsWidget':
          // @ts-ignore
          module = await import('./features/hacker-news/HackerNewsWidget.svelte');
          break;
        case 'VideosWidget':
          // @ts-ignore
          module = await import('./features/videos/VideosWidget.svelte');
          break;
        case 'WeatherWidget':
          // @ts-ignore
          module = await import('./features/weather/WeatherWidget.svelte');
          break;
        case 'MarketsWidget':
          // @ts-ignore
          module = await import('./features/markets/MarketsWidget.svelte');
          break;
        case 'CalendarWidget':
          // @ts-ignore
          module = await import('./features/calendar/CalendarWidget.svelte');
          break;
        case 'ChatWidget':
          // @ts-ignore
          module = await import('./features/chat/ChatWidget.svelte');
          break;
        case 'GitHubWidget':
          // @ts-ignore
          module = await import('./features/github/GitHubWidget.svelte');
          break;
        case 'DevtoWidget':
          // @ts-ignore
          module = await import('./features/devto/DevtoWidget.svelte');
          break;
        case 'RssWidget':
          // @ts-ignore
          module = await import('./features/rss/RssWidget.svelte');
          break;
        case 'MarketIndicesWidget':
          // @ts-ignore
          module = await import('./features/markets/MarketIndicesWidget.svelte');
          break;
        case 'EconomicIndicatorsWidget':
           // @ts-ignore
           module = await import('./features/economic/EconomicIndicatorsWidget.svelte');
           break;
          case 'DramaRedditWidget':
            // @ts-ignore
            module = await import('./features/reddit/DramaRedditWidget.svelte');
            break;
          case 'TwitchWidget':
            // @ts-ignore
            module = await import('./features/twitch/TwitchWidget.svelte');
            break;
          default:
           throw new Error(`Unknown widget: ${config.component}`);
      }

      component = module.default;
    } catch (err) {
      console.error(`Error loading widget ${config.component}:`, err);
      error = `Failed to load ${config.component}`;
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div class="widget">
    <div class="animate-pulse">
      <div class="h-4 bg-muted rounded mb-2"></div>
      <div class="h-3 bg-muted rounded mb-1"></div>
      <div class="h-3 bg-muted rounded w-3/4"></div>
    </div>
  </div>
{:else if error}
  <div class="widget">
    <h3>Error</h3>
    <p class="text-destructive">{error}</p>
  </div>
{:else if component}
  <svelte:component this={component} {...config.props} />
{/if}