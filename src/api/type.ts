export interface Coordinates {
  lat: number;
  lon: number;
}

export interface GeocodingResponse {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherData {
  coord: Coordinates;
  weather: WeatherCondition[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };
  name: string;
  dt: number;
  visibility?: number;
  clouds?: {
    all: number;
  };
}

export interface ForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level?: number;
      grnd_level?: number;
      humidity: number;
      temp_kf?: number;
    };
    wind: {
      speed: number;
      deg?: number;
      gust?: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds?: {
      all: number;
    };
    visibility?: number;
    pop?: number; // Probability of precipitation (0 to 1)
    rain?: {
      "3h"?: number;
    };
    sys?: {
      pod: string;
    };
    dt_txt?: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population?: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
  searchedAt: number;
}

export interface FavoriteCity {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  addedAt: number;
}

export interface FavoriteCityTabletProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}

export interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}