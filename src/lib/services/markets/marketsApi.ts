import { FINNHUB_API_KEY } from '../../env';

export async function searchSymbols(query: string): Promise<Array<{symbol: string, displaySymbol: string, description: string, type: string}>> {
  const response = await fetch(`https://finnhub.io/api/v1/search?q=${encodeURIComponent(query)}&token=${FINNHUB_API_KEY}`);
  const data = await response.json();
  return data.result || [];
}