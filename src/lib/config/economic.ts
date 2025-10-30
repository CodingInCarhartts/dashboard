import type { EconomicIndicator } from '../types';

export const ECONOMIC_CONFIG: { indicators: EconomicIndicator[]; baseUrl: string } = {
  indicators: [
    { id: 'GDP', name: 'GDP Growth', series: 'GDP', frequency: 'quarterly', unit: 'percent', value: 0, date: '' },
    { id: 'CPI', name: 'Inflation (CPI)', series: 'CPIAUCSL', frequency: 'monthly', unit: 'index', value: 0, date: '' },
    { id: 'UNRATE', name: 'Unemployment', series: 'UNRATE', frequency: 'monthly', unit: 'percent', value: 0, date: '' },
    { id: 'FEDFUNDS', name: 'Fed Funds Rate', series: 'FEDFUNDS', frequency: 'monthly', unit: 'percent', value: 0, date: '' },
    { id: 'UMCSENT', name: 'Consumer Sentiment', series: 'UMCSENT', frequency: 'monthly', unit: 'index', value: 0, date: '' },
    { id: 'HOUST', name: 'Housing Starts', series: 'HOUST', frequency: 'monthly', unit: 'thousands', value: 0, date: '' },
    { id: 'RSAFS', name: 'Retail Sales', series: 'RSAFS', frequency: 'monthly', unit: 'millions', value: 0, date: '' },
    { id: 'NAPM', name: 'PMI', series: 'NAPM', frequency: 'monthly', unit: 'index', value: 0, date: '' },
    { id: 'DGS10', name: '10-Year Treasury Yield', series: 'DGS10', frequency: 'daily', unit: 'percent', value: 0, date: '' }
  ],
  baseUrl: 'https://api.stlouisfed.org/fred/series/observations'
};
