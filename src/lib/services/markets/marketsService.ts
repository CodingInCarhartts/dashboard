import type { Market, MarketsService } from '../../types';
import { cache } from '../../cache';
import { CACHE_CONFIG } from '../../config/cache';

class MarketsServiceImpl implements MarketsService {
  async fetchMarkets(markets: Array<{symbol: string, name: string}>, forceRefresh = false): Promise<Market[]> {
    const cacheKey = `markets_${markets.map(m => m.symbol).sort().join('_')}${forceRefresh ? `_${Date.now()}` : ''}`;
    return cache.getOrFetch(
      cacheKey,
      async () => {
        const API_KEY = 'd3ejb6hr01qh40feln50d3ejb6hr01qh40feln5g';

        const promises = markets.map(async (market) => {
          try {
            const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${market.symbol}&token=${API_KEY}`);
            const data = await response.json();
            if (data.c && data.d !== undefined && data.dp !== undefined) {
              return { ...market, price: data.c, change: data.d, changePercent: data.dp };
            }
          } catch (error) {
            console.error('Error fetching quote for', market.symbol, error);
          }

          // Fallback to mock data if API fails
          return {
            ...market,
            price: Math.random() * 1000,
            change: (Math.random() - 0.5) * 100,
            changePercent: (Math.random() - 0.5) * 10
          };
        });

        return await Promise.all(promises);
      },
      forceRefresh ? 0 : CACHE_CONFIG.markets.ttl
    );
  }
}

export const marketsService: MarketsService = new MarketsServiceImpl();
