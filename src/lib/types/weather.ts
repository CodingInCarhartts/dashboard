export interface WeatherConfig {
  location: string;
  latitude: number;
  longitude: number;
  units: 'imperial' | 'metric';
}

export interface WeatherData {
  temperature: number;
  weathercode: number;
  windspeed: number;
  winddirection: number;
  humidity: number;
  feelsLike: number;
  pressure: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherApiResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    pressure_msl: number;
  };
  daily: {
    sunrise: string[];
    sunset: string[];
  };
}

export interface WeatherDetail {
  icon: string;
  label: string;
  value: string;
}
