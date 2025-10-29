import { CACHE_CONFIG, KICK_CONFIG, DEVTO_CONFIG, ECONOMIC_CONFIG, CHAT_CONFIG } from './config';
import type { KickApiResponse } from './types';
import { weatherService } from './services/weather';
import { rssService } from './services/rss';
import { youtubeService } from './services/youtube';
import { kickService } from './services/kick';
import { redditService } from './services/reddit';
import { githubService } from './services/github';
import { marketsService } from './services/markets';
import { economicService } from './services/economic';
import { devtoService } from './services/devto';
import { chatService } from './services/chat';
import { hackerNewsService } from './services/hacker-news';
import type { CacheEntry, CacheType } from './types';

// Simple in-memory cache with localStorage persistence for client-side
class ClientCache {
  private isClient = typeof window !== 'undefined';

  private getStorageKey(key: string): string {
    return `dashboard_cache_${key}`;
  }

  async get<T>(key: string): Promise<CacheEntry<T> | null> {
    if (!this.isClient) return null;

    try {
      const stored = localStorage.getItem(this.getStorageKey(key));
      if (!stored) return null;

      const entry: CacheEntry<T> = JSON.parse(stored);
      return entry;
    } catch (error) {
      console.error('Cache read error:', error);
      return null;
    }
  }

  async set<T>(key: string, data: T): Promise<void> {
    if (!this.isClient) return;

    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(this.getStorageKey(key), JSON.stringify(entry));
    } catch (error) {
      console.error('Cache write error:', error);
    }
  }

  async isValid<T>(key: string, ttl: number): Promise<boolean> {
    const entry = await this.get<T>(key);
    if (!entry) return false;

    const age = Date.now() - entry.timestamp;
    return age < ttl;
  }

  async getOrFetch<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl: number
  ): Promise<T> {
    // Check cache first
    if (await this.isValid<T>(key, ttl)) {
      const cached = await this.get<T>(key);
      if (cached) {
        console.log(`Cache hit for ${key}`);
        return cached.data;
      }
    }

    // Cache miss or expired, fetch fresh data
    console.log(`Cache miss for ${key}, fetching fresh data`);
    try {
      const data = await fetchFn();
      await this.set(key, data);
      return data;
    } catch (error) {
      // If fetch fails, try to return stale cache data if available
      const stale = await this.get<T>(key);
      if (stale) {
        console.log(`Fetch failed for ${key}, returning stale cache`);
        return stale.data;
      }
      throw error;
    }
  }

  async clear(key?: string): Promise<void> {
    if (!this.isClient) return;

    try {
      if (key) {
        localStorage.removeItem(this.getStorageKey(key));
      } else {
        // Clear all cache entries
        const keys = Object.keys(localStorage);
        keys.forEach(k => {
          if (k.startsWith('dashboard_cache_')) {
            localStorage.removeItem(k);
          }
        });
      }
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }
}

export const cache = new ClientCache();

// Convenience functions for different data types






export async function getCachedYouTubeVideos(channelId: string): Promise<any> {
  const cacheKey = `youtube_${channelId}`;
  return cache.getOrFetch(
    cacheKey,
    async () => {
      return await youtubeService.fetchYoutubeVideos(channelId);
    },
    CACHE_CONFIG.youtube.ttl
  );
}

export async function getCachedKickChannels(channelSlugs: string[]): Promise<KickApiResponse> {
  const cacheKey = `kick_channels_${channelSlugs.sort().join('_')}`;
  return cache.getOrFetch(
    cacheKey,
    async () => {
      return await kickService.fetchKickChannels(channelSlugs);
    },
    CACHE_CONFIG.kick.ttl
  );
}

export async function getCachedRedditPosts(subreddit: string): Promise<any[]> {
  const cacheKey = `reddit_${subreddit}`;
  return cache.getOrFetch(
    cacheKey,
    async () => {
      return await redditService.fetchRedditPosts(subreddit);
    },
    CACHE_CONFIG.reddit.ttl
  );
}





export async function getCachedEconomicIndicators(): Promise<Array<{
  id: string;
  name: string;
  value: number;
  date: string;
  previousValue?: number;
  change?: number;
  changePercent?: number;
  frequency: string;
  unit: string;
}>> {
  const cacheKey = 'economic_indicators';
  return cache.getOrFetch(
    cacheKey,
    async () => {
      return await economicService.fetchEconomicIndicators();
    },
    CACHE_CONFIG.economic.ttl
  );
}

export async function getCachedDevtoArticles(): Promise<any[]> {
  const cacheKey = 'devto_articles';
  return cache.getOrFetch(
    cacheKey,
    async () => {
      return await devtoService.fetchDevtoArticles();
    },
    CACHE_CONFIG.devto.ttl
  );
}




// Cache management utilities
export async function clearAllCache(): Promise<void> {
  await cache.clear();
  console.log('All cache cleared');
}

export async function clearCacheByType(type: CacheType): Promise<void> {
  const keys = Object.keys(localStorage);
  const prefix = `dashboard_cache_`;

  for (const key of keys) {
    if (key.startsWith(prefix)) {
      const cacheKey = key.replace(prefix, '');
      if (cacheKey.startsWith(type)) {
        localStorage.removeItem(key);
      }
    }
  }
  console.log(`${type} cache cleared`);
}

export async function getCacheStats(): Promise<{
  totalEntries: number;
  totalSize: number;
  entries: Array<{ key: string; age: number; size: number }>;
}> {
  if (typeof window === 'undefined') {
    return { totalEntries: 0, totalSize: 0, entries: [] };
  }

  const keys = Object.keys(localStorage);
  const prefix = `dashboard_cache_`;
  let totalSize = 0;
  const entries: Array<{ key: string; age: number; size: number }> = [];

  for (const key of keys) {
    if (key.startsWith(prefix)) {
      const cacheKey = key.replace(prefix, '');
      const stored = localStorage.getItem(key);
      if (stored) {
        const size = new Blob([stored]).size;
        totalSize += size;

        try {
          const entry = JSON.parse(stored);
          const age = Date.now() - entry.timestamp;
          entries.push({ key: cacheKey, age, size });
        } catch (e) {
          // Invalid JSON, skip
        }
      }
    }
  }

  return {
    totalEntries: entries.length,
    totalSize,
    entries
  };
}