import type { EconomicIndicator } from '../types';

export const ECONOMIC_CONFIG: { indicators: EconomicIndicator[]; baseUrl: string } = {
  indicators: [
    { id: 'GDP', name: 'GDP Growth', series: 'GDP', frequency: 'quarterly', unit: 'percent', value: 0, date: '' },
    { id: 'CPI', name: 'Inflation (CPI)', series: 'CPIAUCSL', frequency: 'monthly', unit: 'index', value: 0, date: '' },
    { id: 'UNRATE', name: 'Unemployment', series: 'UNRATE', frequency: 'monthly', unit: 'percent', value: 0, date: '' },
    { id: 'FEDFUNDS', name: 'Fed Funds Rate', series: 'FEDFUNDS', frequency: 'monthly', unit: 'percent', value: 0, date: '' },
    { id: 'UMCSENT', name: 'Consumer Sentiment', series: 'UMCSENT', frequency: 'monthly', unit: 'index', value: 0, date: '' }
  ],
  baseUrl: 'https://api.stlouisfed.org/fred/series/observations'
};
