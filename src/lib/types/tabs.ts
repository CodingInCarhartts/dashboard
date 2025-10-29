export interface TabState {
  activeTab: string;
}

export interface WidgetConfig {
  component: string; // Component name like 'RssWidget', 'HackerNewsWidget'
  props?: Record<string, any>; // Optional props to pass to the component
  position: {
    column: 'left' | 'middle' | 'right';
    order: number;
    span?: 2 | 3 | 'full'; // Optional: span multiple columns
  };
  enabled: boolean;
}

export interface TabConfig {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  widgets: WidgetConfig[];
  layout: 'grid-3col' | 'grid-2col' | 'single-col' | 'custom';
}
