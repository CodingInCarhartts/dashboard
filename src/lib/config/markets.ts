import type { Market, Index } from '../types';

export const MARKETS_CONFIG: { markets: Market[]; indices: Index[] } = {
  markets: [
    { symbol: 'SPY', name: 'S&P 500' },
    { symbol: 'BTC-USD', name: 'Bitcoin' },
    { symbol: 'NVDA', name: 'NVIDIA' },
    { symbol: 'AAPL', name: 'Apple' },
    { symbol: 'MSFT', name: 'Microsoft' },
    { symbol: 'TSLA', name: 'Tesla' },
    { symbol: 'GOOGL', name: 'Alphabet' },
    { symbol: 'AMZN', name: 'Amazon' },
    { symbol: 'META', name: 'Meta Platforms' },
    { symbol: 'ETH-USD', name: 'Ethereum' },
  ],
  indices: [
    { symbol: '^GSPC', name: 'S&P 500' },
    { symbol: '^DJI', name: 'Dow Jones' },
    { symbol: '^IXIC', name: 'NASDAQ' },
    { symbol: '^RUT', name: 'Russell 2000' },
    { symbol: '^VIX', name: 'VIX Fear Index' },
    { symbol: '^NYA', name: 'NYSE Composite' },
    { symbol: '^SOX', name: 'Philadelphia Semiconductor' },
    { symbol: '^MID', name: 'S&P MidCap 400' },
  ],
};
