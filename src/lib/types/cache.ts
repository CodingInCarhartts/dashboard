export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  lastAccessed?: number;  // For LRU eviction
  compressed?: boolean;   // Whether data is compressed
  size?: number;         // Size in bytes
}

export type CacheType = 'hacker_news' | 'weather' | 'rss' | 'youtube' | 'kick' | 'reddit' | 'github' | 'markets' | 'devto' | 'economic';
