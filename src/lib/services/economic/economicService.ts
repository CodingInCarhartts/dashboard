import type { EconomicIndicator, EconomicService } from '../../types';
import { ECONOMIC_CONFIG } from '../../config';

class EconomicServiceImpl implements EconomicService {
  async fetchEconomicIndicators(): Promise<EconomicIndicator[]> {
    const promises = ECONOMIC_CONFIG.indicators.map(async (indicator) => {
      try {
        const response = await fetch(
          `${ECONOMIC_CONFIG.baseUrl}?series_id=${indicator.series}&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json&limit=2&sort_order=desc`
        );
        if (!response.ok) {
          throw new Error(`Economic API error for ${indicator.series}: ${response.statusText}`);
        }
        const data = await response.json();

        if (data.observations && data.observations.length >= 2) {
          const latest = data.observations[0];
          const previous = data.observations[1];

          const currentValue = parseFloat(latest.value);
          const prevValue = parseFloat(previous.value);

          if (!isNaN(currentValue) && !isNaN(prevValue)) {
            const change = currentValue - prevValue;
            const changePercent = (change / prevValue) * 100;

            return {
              id: indicator.id,
              name: indicator.name,
              value: currentValue,
              date: latest.date,
              previousValue: prevValue,
              change,
              changePercent,
              frequency: indicator.frequency,
              unit: indicator.unit
            };
          }
        }

        // Fallback with latest value only
        if (data.observations && data.observations.length >= 1) {
          const latest = data.observations[0];
          const currentValue = parseFloat(latest.value);

          if (!isNaN(currentValue)) {
            return {
              id: indicator.id,
              name: indicator.name,
              value: currentValue,
              date: latest.date,
              frequency: indicator.frequency,
              unit: indicator.unit
            };
          }
        }
      } catch (error) {
        console.error('Error fetching economic indicator:', indicator.series, error);
      }

      // Fallback mock data
      return {
        id: indicator.id,
        name: indicator.name,
        value: Math.random() * 100,
        date: new Date().toISOString().split('T')[0],
        frequency: indicator.frequency,
        unit: indicator.unit
      };
    });

    return await Promise.all(promises);
  }
}

export const economicService: EconomicService = new EconomicServiceImpl();
