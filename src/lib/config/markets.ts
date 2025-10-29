import type { Market, Index } from '../types';

export const MARKETS_CONFIG: { markets: Market[]; indices: Index[] } = {
  markets: [
    { symbol: 'SPY', name: 'S&P 500' },
    { symbol: 'BTC-USD', name: 'Bitcoin' },
    { symbol: 'NVDA', name: 'NVIDIA' },
    { symbol: 'AAPL', name: 'Apple' },
    { symbol: 'MSFT', name: 'Microsoft' }
  ],
  indices: [
    { symbol: '^GSPC', name: 'S&P 500' },
    { symbol: '^DJI', name: 'Dow Jones' },
    { symbol: '^IXIC', name: 'NASDAQ' },
    { symbol: '^RUT', name: 'Russell 2000' },
    { symbol: '^VIX', name: 'VIX Fear Index' }
  ]
};
