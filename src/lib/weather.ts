// src/lib/weather.ts

export type EvaWeatherCode =
  | "橙色图案"
  | "插入栓待机"
  | "LCL污染"
  | "LCL泄漏"
  | "使徒接近"
  | "第二次冲击之冬"
  | "使徒来袭"
  | "AT力场崩坏";

export interface WeatherData {
  evaCode: EvaWeatherCode;
  temperature: number;
  windSpeed: number;
  city: string;
}

const WMO_TO_EVA: Record<number, EvaWeatherCode> = {
  0: "橙色图案",
  1: "橙色图案",
  2: "插入栓待机",
  3: "插入栓待机",
  45: "LCL污染",
  48: "LCL污染",
  51: "LCL泄漏",
  53: "LCL泄漏",
  55: "LCL泄漏",
  61: "使徒接近",
  63: "使徒接近",
  65: "使徒接近",
  80: "使徒接近",
  81: "使徒接近",
  82: "使徒接近",
  71: "第二次冲击之冬",
  73: "第二次冲击之冬",
  75: "第二次冲击之冬",
  77: "第二次冲击之冬",
  85: "第二次冲击之冬",
  86: "第二次冲击之冬",
  95: "使徒来袭",
  96: "使徒来袭",
  99: "使徒来袭",
};

const WEATHER_PARTICLE_CONFIG: Record<EvaWeatherCode, { count: number; color: string; speed: number }> = {
  "橙色图案": { count: 0, color: "transparent", speed: 0 },
  "插入栓待机": { count: 0, color: "transparent", speed: 0 },
  "LCL污染": { count: 30, color: "#660099", speed: 0.2 },
  "LCL泄漏": { count: 80, color: "#660099", speed: 3 },
  "使徒接近": { count: 200, color: "#660099", speed: 5 },
  "第二次冲击之冬": { count: 100, color: "#FFFFFF", speed: 1 },
  "使徒来袭": { count: 150, color: "#FF0000", speed: 6 },
  "AT力场崩坏": { count: 60, color: "#FF0000", speed: 8 },
};

export function getWeatherParticleConfig(code: EvaWeatherCode) {
  return WEATHER_PARTICLE_CONFIG[code];
}

const CACHE_KEY = "eva-weather-cache";
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

interface CacheEntry {
  data: WeatherData;
  timestamp: number;
}

function getCachedWeather(): WeatherData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_DURATION) return null;
    return entry.data;
  } catch {
    return null;
  }
}

function setCachedWeather(data: WeatherData) {
  try {
    const entry: CacheEntry = { data, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // localStorage full or unavailable — silently skip
  }
}

export interface WeatherError {
  type: "timeout" | "network" | "api" | "geolocation" | "no_data";
  message: string;
}

export async function fetchWeather(
  lat: number,
  lon: number,
  retryOnFailure = true
): Promise<WeatherData> {
  // Check fresh cache first
  const cached = getCachedWeather();
  if (cached) return cached;

  const doFetch = async (): Promise<WeatherData> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,temperature_2m,wind_speed_10m`,
        { signal: controller.signal }
      );

      if (!res.ok) throw { type: "api", message: `MAGI 响应异常: ${res.status}` } as WeatherError;

      const json = await res.json();
      if (!json.current) throw { type: "no_data", message: "MAGI 数据链路中断" } as WeatherError;

      const wmoCode = json.current.weather_code as number;
      const temperature = json.current.temperature_2m as number;
      const windSpeed = json.current.wind_speed_10m as number;

      let evaCode = WMO_TO_EVA[wmoCode] ?? "插入栓待机";

      // Wind override
      if (windSpeed > 30 && evaCode !== "使徒来袭") {
        evaCode = "AT力场崩坏";
      }

      const data: WeatherData = {
        evaCode,
        temperature,
        windSpeed,
        city: "TOKYO-3",
      };

      setCachedWeather(data);
      return data;
    } catch (err) {
      if (err && typeof err === "object" && "type" in err) throw err;
      if ((err as Error)?.name === "AbortError") {
        throw { type: "timeout", message: "MAGI 响应超时" } as WeatherError;
      }
      throw { type: "network", message: "MAGI 网络链路中断" } as WeatherError;
    } finally {
      clearTimeout(timeout);
    }
  };

  try {
    return await doFetch();
  } catch (err) {
    if (retryOnFailure) {
      // One retry after 1500ms
      await new Promise((resolve) => setTimeout(resolve, 1500));
      try {
        return await doFetch();
      } catch {
        // Both attempts failed, fall through to fallback
      }
    }

    // Return stale cache as degraded fallback
    const stale = getStaleCachedWeather();
    if (stale) return stale;

    // Last resort: static TOKYO-3 fallback
    return {
      evaCode: "插入栓待机",
      temperature: 25,
      windSpeed: 0,
      city: "TOKYO-3",
    };
  }
}

function getStaleCachedWeather(): WeatherData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    return entry.data;
  } catch {
    return null;
  }
}

export function getSeason(): string {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return "春";
  if (month >= 6 && month <= 8) return "夏";
  if (month >= 9 && month <= 11) return "秋";
  return "冬";
}

export function getDateEffect(): string | null {
  const today = new Date();
  const md = `${today.getMonth() + 1}-${today.getDate()}`;

  if (md === "10-4") return "使徒袭来纪念日";

  // Check birthday from config (loaded separately)
  try {
    const config = JSON.parse(
      document.querySelector('script[data-config="site-config"]')?.textContent ?? "{}"
    );
    if (config.birthday) {
      const [bm, bd] = config.birthday.split("-").map(Number);
      if (bm === today.getMonth() + 1 && bd === today.getDate()) {
        return "适格者诞生日";
      }
    }
  } catch {
    // no config
  }

  if (md === "1-1") return "新世纪元旦";

  return null;
}

export { WEATHER_PARTICLE_CONFIG };
