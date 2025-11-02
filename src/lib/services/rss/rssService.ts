import type { RssService, RssApiResponse } from '../../types';
import { cache } from '../../cache';
import { CACHE_CONFIG } from '../../config/cache';

class RssServiceImpl implements RssService {
  async fetchRss(feedUrl: string): Promise<RssApiResponse> {
    const cacheKey = `rss_${btoa(feedUrl)}`;
    return cache.getOrFetch(
      cacheKey,
      async () => {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`
        );
        if (!response.ok) {
          throw new Error(`RSS API error: ${response.statusText}`);
        }
        return await response.json();
      },
      CACHE_CONFIG.rss.ttl
    );
  }
}

export const rssService: RssService = new RssServiceImpl();
