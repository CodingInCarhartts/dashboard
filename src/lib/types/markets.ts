export interface Market {
  symbol: string;
  name: string;
  price?: number;
  change?: number;
  changePercent?: number;
}

export interface Index extends Pick<Market, 'symbol' | 'name'> {}

export interface MarketIndex extends Market {}
