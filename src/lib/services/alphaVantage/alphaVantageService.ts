import type { OHLCData } from '../../types';
import { cache } from '../../cache';
import { CACHE_CONFIG } from '../../config/cache';
import { ALPHA_VANTAGE_API_KEY } from '../../env';

export async function fetchDailyOHLC(symbol: string): Promise<OHLCData[]> {
  const cacheKey = `alpha_daily_${symbol}`;
  return cache.getOrFetch(
    cacheKey,
    async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
        );
        const data = await response.json();

        if (data['Time Series (Daily)']) {
          const series = data['Time Series (Daily)'];
          const ohlc: OHLCData[] = Object.keys(series)
            .sort()
            .slice(-5) // Last 5 days
            .map((date) => ({
              date,
              open: parseFloat(series[date]['1. open']),
              high: parseFloat(series[date]['2. high']),
              low: parseFloat(series[date]['3. low']),
              close: parseFloat(series[date]['4. close']),
            }));
          return ohlc;
        } else {
          console.error('Alpha Vantage error:', data);
          return [];
        }
      } catch (error) {
        console.error('Error fetching Alpha Vantage data:', error);
        return [];
      }
    },
    CACHE_CONFIG.markets.ttl
  );
}
