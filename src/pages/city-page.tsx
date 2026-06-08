import { useParams, useSearchParams } from "react-router-dom";
import { useWeatherQuery, useForecastQuery } from "@/hooks/use-weather";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import WeatherForecast from "./weather-forecast";
import WeatherDetails from "./weather-details";
import HourlyTemperature from "./hourly-temperature";
import { WeatherSkeleton } from "@/components/loading-skeleton";
import CurrentWeather from "@/components/CurrentWeather";
import { useFavorites } from "@/hooks/use-favorite";
import { toast } from "sonner";

export function CityPage() {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isCurrentlyFavorite = isFavorite(lat, lon);

  const handleToggleFavorite = () => {
    if (!weatherQuery.data || !params.cityName) return;
    const cityId = `${lat}-${lon}`;
    if (isCurrentlyFavorite) {
      removeFavorite.mutate(cityId);
      toast.error(`Removed ${params.cityName} from Favorites`);
    } else {
      addFavorite.mutate({
        name: params.cityName,
        lat,
        lon,
        country: weatherQuery.data.sys.country,
      });
      toast.success(`Added ${params.cityName} to Favorites`);
    }
  };

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Alert variant="destructive" className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900">
          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-red-700 dark:text-red-300">
            Failed to load weather data for this location. Please check your connection or try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            {params.cityName}, {weatherQuery.data.sys.country}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Detailed weather overview and 5-day forecast
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <CurrentWeather 
          data={weatherQuery.data} 
          locationName={{
            name: params.cityName,
            country: weatherQuery.data.sys.country,
            state: "",
            lat,
            lon
          }}
          isFavorite={isCurrentlyFavorite} 
          onToggleFavorite={handleToggleFavorite}
        />
        <HourlyTemperature data={forecastQuery.data} />
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
}

