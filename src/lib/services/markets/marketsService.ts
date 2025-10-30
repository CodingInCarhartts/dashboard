import type { Market, MarketsService } from '../../types';
import { cache } from '../../cache';
import { CACHE_CONFIG } from '../../config/cache';
import { searchSymbols } from './marketsApi';
import { FINNHUB_API_KEY } from '../../env';
import type { HistoricalData } from '../../types';

class MarketsServiceImpl implements MarketsService {
  async fetchMarkets(markets: Array<{symbol: string, name: string}>, forceRefresh = false): Promise<Market[]> {
    const cacheKey = `markets_${markets.map(m => m.symbol).sort().join('_')}${forceRefresh ? `_${Date.now()}` : ''}`;
    return cache.getOrFetch(
      cacheKey,
      async () => {
        const promises = markets.map(async (market) => {
          try {
            const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${market.symbol}&token=${FINNHUB_API_KEY}`);
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

  async searchSymbols(query: string): Promise<Market[]> {
    const cacheKey = `search_${query}`;
    return cache.getOrFetch(
      cacheKey,
      async () => {
        const results = await searchSymbols(query);
        const topResults = results.slice(0, 5); // Limit to 5 results

        const promises = topResults.map(async (result) => {
          try {
            const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${result.symbol}&token=${FINNHUB_API_KEY}`);
            const data = await response.json();
            if (data.c && data.d !== undefined && data.dp !== undefined) {
              return {
                symbol: result.displaySymbol,
                name: result.description,
                price: data.c,
                change: data.d,
                changePercent: data.dp
              };
            }
          } catch (error) {
            console.error('Error fetching quote for', result.symbol, error);
          }

          // Fallback
          return {
            symbol: result.displaySymbol,
            name: result.description,
            price: Math.random() * 1000,
            change: (Math.random() - 0.5) * 100,
            changePercent: (Math.random() - 0.5) * 10
          };
        });

        return await Promise.all(promises);
      },
      CACHE_CONFIG.markets.ttl // Use same TTL
    );
  }

  async fetchHistoricalData(symbol: string, resolution: string, days: number, forceRefresh = false): Promise<HistoricalData[]> {
    const to = Math.floor(Date.now() / 1000);
    const from = to - days * 24 * 60 * 60; // Calculate 'from' timestamp based on number of days

    const cacheKey = `historical_${symbol}_${resolution}_${days}${forceRefresh ? `_${Date.now()}` : ''}`;
    return cache.getOrFetch(
      cacheKey,
      async () => {
        try {
          const response = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`);
          const data = await response.json();

          if (data.s === 'ok' && data.c && data.t) {
            return data.c.map((close: number, index: number) => ({
              date: new Date(data.t[index] * 1000).toISOString().split('T')[0], // Convert timestamp to YYYY-MM-DD
              close: close
            }));
          } else {
            console.error('Error fetching historical data:', data);
            return [];
          }
        } catch (error) {
          console.error('Error fetching historical data for', symbol, error);
          return [];
        }
      },
      forceRefresh ? 0 : CACHE_CONFIG.markets.ttl
    );
  }
}

export const marketsService: MarketsService = new MarketsServiceImpl();
