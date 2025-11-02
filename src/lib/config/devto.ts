import type { DevtoFeed } from '../types';

export const DEVTO_CONFIG: { feeds: DevtoFeed[]; maxArticles: number; refreshInterval: number } = {
  feeds: [
    { url: 'https://dev.to/feed', title: 'Dev.to Latest', limit: 5 },
    { url: 'https://dev.to/feed/tag/javascript', title: 'JavaScript', limit: 3 },
    { url: 'https://dev.to/feed/tag/react', title: 'React', limit: 3 },
    { url: 'https://dev.to/feed/tag/python', title: 'Python', limit: 3 },
    { url: 'https://dev.to/feed/tag/webdev', title: 'Web Development', limit: 3 },
    { url: 'https://dev.to/feed/tag/svelte', title: 'Svelte', limit: 3 },
  ],
  maxArticles: 5,
  refreshInterval: 30 * 60 * 1000, // 30 minutes
};
