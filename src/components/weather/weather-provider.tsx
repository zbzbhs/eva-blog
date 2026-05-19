"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { WeatherData, WeatherError, fetchWeather } from "@/lib/weather";

interface WeatherContextType {
  weather: WeatherData | null;
  loading: boolean;
  error: WeatherError | null;
}

const WeatherContext = createContext<WeatherContextType>({
  weather: null,
  loading: true,
  error: null,
});

export function useWeather() {
  return useContext(WeatherContext);
}

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<WeatherError | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError({ type: "geolocation", message: "MAGI 定位不可用" });
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await fetchWeather(
            pos.coords.latitude,
            pos.coords.longitude
          );
          setWeather(data);
        } catch (err) {
          const weatherErr = err as WeatherError;
          setError(weatherErr);
          // fetchWeather returns fallback data even on error,
          // but if it throws instead, try without retry
          try {
            const fallback = await fetchWeather(
              pos.coords.latitude,
              pos.coords.longitude,
              false
            );
            setWeather(fallback);
          } catch {
            // Absolute last resort
            setWeather({
              evaCode: "插入栓待机",
              temperature: 25,
              windSpeed: 0,
              city: "TOKYO-3",
            });
          }
        }
        setLoading(false);
      },
      (geoErr) => {
        let msg = "MAGI 定位被拒绝";
        if (geoErr.code === geoErr.PERMISSION_DENIED) msg = "MAGI 定位被拒绝";
        else if (geoErr.code === geoErr.TIMEOUT) msg = "MAGI 定位超时";
        setError({ type: "geolocation", message: msg });
        setWeather({
          evaCode: "插入栓待机",
          temperature: 25,
          windSpeed: 0,
          city: "TOKYO-3",
        });
        setLoading(false);
      },
      { timeout: 8000 }
    );
  }, []);

  return (
    <WeatherContext.Provider value={{ weather, loading, error }}>
      {children}
    </WeatherContext.Provider>
  );
}
