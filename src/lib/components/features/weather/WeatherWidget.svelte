<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { WEATHER_CONFIG } from '$lib/config';
  import { weatherService } from '$lib/services/weather';
  import type { WeatherData, WeatherDetail } from '$lib/types';
  import { weatherCodes, weatherIcons } from '$lib/utils/constants';

  import { WeatherCard } from './';
  import '$lib/styles/components/features/weather.css';

  let location = WEATHER_CONFIG.location;
  let weather: WeatherData | null = null;
  let loading = true;
  let error = '';
  let currentSlide = 0;
  let autoScrollInterval: number | undefined;
  let isPaused = false;

  function formatTime(timeString: string): string {
    return new Date(timeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function getTemperatureTheme(temp: number): string {
    if (temp <= 32) return 'cold'; // Freezing
    if (temp <= 50) return 'cool'; // Cool
    if (temp <= 70) return 'mild'; // Mild
    if (temp <= 85) return 'warm'; // Warm
    return 'hot'; // Hot
  }

  function getWeatherDetails(weather: WeatherData) {
    return [
      {
        icon: '🌡️',
        label: 'Feels Like',
        value: `${weather.feelsLike}°`
      },
      {
        icon: '💧',
        label: 'Humidity',
        value: `${weather.humidity}%`
      },
      {
        icon: '💨',
        label: 'Wind',
        value: `${weather.windspeed} ${WEATHER_CONFIG.units === 'imperial' ? 'mph' : 'km/h'}`
      },
      {
        icon: '🌅',
        label: 'Sunrise',
        value: formatTime(weather.sunrise)
      },
      {
        icon: '🌇',
        label: 'Sunset',
        value: formatTime(weather.sunset)
      }
    ];
   }

  async function fetchWeather() {
    try {
      const units = WEATHER_CONFIG.units === 'imperial' ? 'fahrenheit' : 'celsius';
      const data = await weatherService.fetchWeather(WEATHER_CONFIG.latitude, WEATHER_CONFIG.longitude, units);
      weather = {
        temperature: data.current.temperature_2m,
        weathercode: data.current.weather_code,
        windspeed: data.current.wind_speed_10m,
        winddirection: data.current.wind_direction_10m,
        humidity: data.current.relative_humidity_2m,
        feelsLike: data.current.apparent_temperature,
        pressure: data.current.pressure_msl,
        sunrise: data.daily.sunrise[0],
        sunset: data.daily.sunset[0]
      };
    } catch (err) {
      error = 'Failed to load weather';
      console.error('Error loading weather:', err);
    } finally {
      loading = false;
    }
  }

  function nextSlide() {
    if (!weather) return;
    const details = getWeatherDetails(weather);
    currentSlide = (currentSlide + 1) % details.length;
  }

  function goToSlide(index: number) {
    if (!weather) return;
    const details = getWeatherDetails(weather);
    currentSlide = Math.min(index, details.length - 1);
    resetAutoScroll();
  }

  function startAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, 3500); // Change every 3.5 seconds
  }

  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = undefined;
    }
  }

  function resetAutoScroll() {
    stopAutoScroll();
    setTimeout(() => {
      if (!isPaused) {
        startAutoScroll();
      }
    }, 1000); // Restart after 1 second
  }

  onMount(() => {
    fetchWeather();
  });

  // Start auto-scroll when weather data is available
  $: if (weather && !loading) {
    startAutoScroll();
  }

  // Cleanup auto-scroll on unmount
  onDestroy(() => {
    stopAutoScroll();
  });
</script>

<div class="widget weather-widget {weather ? getTemperatureTheme(weather.temperature) : ''}">
  <h3>Weather - {location}</h3>
   {#if loading}
     <div class="weather-loading">
       <div class="weather-loading-spinner"></div>
       <span>Loading weather...</span>
     </div>
   {:else if error}
     <div class="weather-error">
       <div class="weather-error-icon">⚠️</div>
       <div class="weather-error-message">{error}</div>
     </div>
   {:else if weather}
     <div class="weather-content">
       <div class="weather-main">
         <div class="weather-icon">{weatherIcons[weather.weathercode] || '❓'}</div>
         <div class="temp">{weather.temperature}<span class="temp-unit">°{WEATHER_CONFIG.units === 'imperial' ? 'F' : 'C'}</span></div>
       </div>
       <div class="condition">{weatherCodes[weather.weathercode] || 'Unknown'}</div>
              <div class="weather-details-carousel" role="region" on:mouseenter={() => isPaused = true} on:mouseleave={() => isPaused = false}>
                <div class="weather-details" style="transform: translateX(-{currentSlide * 100}%)">
                  {#each getWeatherDetails(weather) as detail}
                    <WeatherCard {detail} />
                  {/each}
                </div>
                <div class="carousel-dots">
                  {#each getWeatherDetails(weather) as _, i}
                    <button class="dot" class:active={i === currentSlide} on:click={() => goToSlide(i)} aria-label="Go to weather detail {i + 1}"></button>
                  {/each}
                </div>
              </div>     </div>
   {/if}
</div>

