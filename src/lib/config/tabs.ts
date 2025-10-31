import type { WidgetConfig, TabConfig } from '../types';
import { REDDIT_CONFIG } from './reddit';

// Default tab configurations
export const DEFAULT_TABS: TabConfig[] = [
   {
     id: 'home',
     label: 'Home',
     icon: '🏠',
     description: 'GitHub repositories and weather',
     layout: 'grid-2col',
      widgets: [
         {
           component: 'GitHubWidget',
           position: { column: 'left', order: 1 },
           enabled: true
         },
         {
           component: 'WeatherWidget',
           position: { column: 'right', order: 1 },
           enabled: true
         }
     ]
    },
    {
     id: 'development',
    label: 'Development',
    icon: '💻',
    description: 'Tech news, development tools, and coding resources',
    layout: 'grid-3col',
      widgets: [
         {
           component: 'HackerNewsWidget',
           position: { column: 'left', order: 4 },
           enabled: true
         },

          {
            component: 'RssWidget',
            position: { column: 'right', order: 4 },
            enabled: true
          },

           {
             component: 'DevtoWidget',
             position: { column: 'middle', order: 4 },
             enabled: true
           }
      ]
  },
   {
     id: 'finance',
     label: 'Finance',
     icon: '💰',
     description: 'Financial markets, stocks, and economic data',
     layout: 'grid-3col',
      widgets: [
        {
          component: 'MarketIndicesWidget',
          position: { column: 'left', order: 1 },
          enabled: true
        },
        {
          component: 'MarketsWidget',
          position: { column: 'middle', order: 1 },
          enabled: true
        },
        {
          component: 'EconomicIndicatorsWidget',
          position: { column: 'right', order: 1 },
          enabled: true
        }
      ]
   },
    {
      id: 'entertainment',
      label: 'Entertainment',
      icon: '🎮',
      description: 'Gaming streams, videos, and entertainment content',
     layout: 'grid-2col',
      widgets: [
        {
          component: 'KickWidget',
          position: { column: 'left', order: 1 },
          enabled: true
        },
        {
          component: 'TwitchWidget',
          position: { column: 'left', order: 2 },
          enabled: true
        },
        {
          component: 'DramaRedditWidget',
          position: { column: 'middle', order: 2 },
          enabled: true
        },
        {
          component: 'VideosWidget',
          position: { column: 'right', order: 1 },
          enabled: true
        }
       ]
     },
     {
       id: 'ai-chat',
       label: 'AI Chat',
       icon: '🤖',
       description: 'AI-powered chat with conversation history',
       layout: 'grid-2col',
        widgets: [
          {
            component: 'ChatWidget',
            position: { column: 'left', order: 1 },
            enabled: true
          },
          {
            component: 'ConversationViewer',
            position: { column: 'right', order: 1 },
            enabled: true
          }
       ]
     }
 ];

// Helper function to get tab configuration by ID
export function getTabConfig(tabId: string): TabConfig | undefined {
  return DEFAULT_TABS.find(tab => tab.id === tabId);
}

// Helper function to get widgets for a specific column in a tab
export function getWidgetsForColumn(tabId: string, column: 'left' | 'middle' | 'right'): WidgetConfig[] {
  const tab = getTabConfig(tabId);
  if (!tab) return [];

  return tab.widgets
    .filter(widget => widget.position.column === column && widget.enabled)
    .sort((a, b) => a.position.order - b.position.order);
}