import type { HackerNewsService, HNStory } from '../../types';
import { cache } from '../../cache';
import { CACHE_CONFIG } from '../../config/cache';
import { fetchHackerNewsApi } from './hackerNewsApi';

class HackerNewsServiceImpl implements HackerNewsService {
  async fetchHackerNews(): Promise<HNStory[]> {
    return cache.getOrFetch(
      'hacker_news',
      async () => {
        return await fetchHackerNewsApi();
      },
      CACHE_CONFIG.hackerNews.ttl
    );
  }
}

export const hackerNewsService: HackerNewsService = new HackerNewsServiceImpl();
