export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export type CacheType = 'hacker_news' | 'weather' | 'rss' | 'youtube' | 'kick' | 'reddit' | 'github' | 'markets' | 'devto' | 'economic';
