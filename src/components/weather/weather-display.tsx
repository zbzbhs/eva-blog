"use client";

import { useWeather } from "./weather-provider";
import { getDateEffect } from "@/lib/weather";

export function WeatherDisplay() {
  const { weather, loading, error } = useWeather();
  const dateEffect = getDateEffect();

  // Date effects override everything
  if (dateEffect) {
    return <span className="text-eva-red">{dateEffect}</span>;
  }

  // Loading: show minimal indicator
  if (loading) {
    return <span className="text-text-muted">MAGI 同步中...</span>;
  }

  // Error with fallback data (weather was loaded as fallback)
  if (error && weather) {
    return (
      <span className="text-text-muted">
        {weather.city} | {weather.evaCode} · {weather.temperature.toFixed(1)}°C
        <span className="text-eva-red ml-1" title={error.message}>
          *
        </span>
      </span>
    );
  }

  // Error with no data
  if (error && !weather) {
    return <span className="text-eva-red text-xs">{error.message}</span>;
  }

  // No weather data at all
  if (!weather) {
    return <span className="text-text-muted">TOKYO-3</span>;
  }

  // Normal display
  return (
    <span className="text-text-secondary">
      {weather.city} | {weather.evaCode} · {weather.temperature.toFixed(1)}°C
    </span>
  );
}
