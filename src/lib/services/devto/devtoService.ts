import type { DevtoArticle, DevtoService } from '../../types';
import { DEVTO_CONFIG } from '../../config';

class DevtoServiceImpl implements DevtoService {
  async fetchDevtoArticles(): Promise<DevtoArticle[]> {
    const feedPromises = DEVTO_CONFIG.feeds.map(async (feed) => {
      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`
        );
        if (!response.ok) {
          throw new Error(`Dev.to API error for ${feed.url}: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.items) {
          return data.items.slice(0, feed.limit).map((item: any) => ({
            ...item,
            feedTitle: feed.title,
            tags: item.categories || [],
          }));
        }
      } catch (error) {
        console.error('Error fetching Dev.to feed:', feed.url, error);
      }
      return [];
    });

    const feedResults = await Promise.all(feedPromises);
    const allArticles = feedResults.flat();

    // Remove duplicates based on title and deduplicate
    const seen = new Set<string>();
    const uniqueArticles = allArticles.filter((article) => {
      const key = `${article.title}_${article.pubDate}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Sort by publication date (newest first) and limit
    return uniqueArticles
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, DEVTO_CONFIG.maxArticles);
  }
}

export const devtoService: DevtoService = new DevtoServiceImpl();
