import type { WeatherApiResponse, WeatherService } from '../../types';
import { cache } from '../../cache';
import { CACHE_CONFIG } from '../../config/cache';

class WeatherServiceImpl implements WeatherService {
  async fetchWeather(latitude: number, longitude: number, units: string): Promise<WeatherApiResponse> {
    const cacheKey = `weather_${latitude}_${longitude}_${units}`;
    return cache.getOrFetch(
      cacheKey,
      async () => {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,relative_humidity_2m,apparent_temperature,pressure_msl&daily=sunrise,sunset&temperature_unit=${units}&windspeed_unit=${units === 'fahrenheit' ? 'mph' : 'kmh'}&timezone=auto`
        );
        if (!response.ok) {
          throw new Error(`Weather API error: ${response.statusText}`);
        }
        return await response.json();
      },
      CACHE_CONFIG.weather.ttl
    );
  }
}

export const weatherService: WeatherService = new WeatherServiceImpl();
