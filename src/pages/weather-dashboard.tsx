import CurrentWeather from "@/components/CurrentWeather";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/use-geoLocation";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import HourlyTemperature from "./hourly-temperature";
import WeatherDetails from "./weather-details";
import WeatherForecast from "./weather-forecast";
import { FavoriteCities } from "./favourite-cities";
import { Separator } from "@/components/ui/separator";
import { useFavorites } from "@/hooks/use-favorite";
import { toast } from "sonner";
import { WeatherSkeleton } from "@/components/loading-skeleton";

interface WeatherDashboardProps {
  className?: string;
}

const WeatherDashboard = ({ className }: WeatherDashboardProps) => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading,
  } = useGeoLocation();

  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const locationQuery = useReverseGeocodeQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  const handleToggleFavorite = () => {
    if (coordinates && locationQuery.data?.[0]) {
      const cityId = `${coordinates.lat}-${coordinates.lon}`;
      const locationName = locationQuery.data[0].name;
      if (isFavorite(coordinates.lat, coordinates.lon)) {
        removeFavorite.mutate(cityId);
        toast.success(`Removed ${locationName} from favorites`);
      } else {
        addFavorite.mutate({
          name: locationName,
          lat: coordinates.lat,
          lon: coordinates.lon,
          country: locationQuery.data[0].country,
        });
        toast.success(`Added ${locationName} to favorites`);
      }
    }
  };

  const showFavorites = favorites && favorites.length > 0;

  if (isLoading) return <WeatherSkeleton />;

  if (locationError || !coordinates) {
    return (
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {showFavorites && (
          <>
            <FavoriteCities />
            <Separator className="my-6" />
          </>
        )}
        <Alert
          variant="destructive"
          className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <div>
                <AlertTitle className="text-xl font-semibold text-red-700 dark:text-red-300">
                  {locationError
                    ? "Location Access Denied"
                    : "Location Access Required"}
                </AlertTitle>
                <AlertDescription className="mt-2 text-base text-red-600/90 dark:text-red-400/90">
                  Please enable location services to get accurate weather
                  information for your area.
                </AlertDescription>
              </div>
            </div>
            <Button
              onClick={getLocation}
              className="w-fit bg-red-600 hover:bg-red-700 text-white border-0"
            >
              <MapPin className="size-4 mr-2" />
              Enable Location Access
            </Button>
          </div>
        </Alert>
      </div>
    );
  }

  const locationName = locationQuery.data?.[0].name;

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <div className="container mx-auto px-4 py-12">
        {showFavorites && (
          <>
            <FavoriteCities />
            <Separator className="my-6" />
          </>
        )}
        <div className="max-w-2xl mx-auto text-center space-y-6 bg-card/30 backdrop-blur-md p-8 rounded-xl border border-border/50">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-muted p-4">
              <svg
                className="w-12 h-12 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                Weather Data Unavailable
              </h3>
              <p className="text-muted-foreground max-w-md">
                We're unable to fetch the weather information at the moment.
                This could be due to connection issues or service
                unavailability.
              </p>
            </div>

            <Button
              onClick={handleRefresh}
              className="mt-4 bg-primary hover:bg-primary/90"
            >
              <RefreshCw className="size-4 mr-2" />
              Refresh Weather Data
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            Error:{" "}
            {weatherQuery.error?.message ||
              forecastQuery.error?.message ||
              "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }

  return (
    <main
      className={`container mx-auto px-3 sm:px-4 py-4 sm:py-6 ${className}`}
    >
      {showFavorites && (
        <>
          <FavoriteCities />
          <Separator className="my-6" />
        </>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            My Location
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Current weather and forecast
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          className="hover:bg-accent"
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw
            className={`size-4 ${
              weatherQuery.isFetching || forecastQuery.isFetching
                ? "animate-spin"
                : ""
            }`}
          />
        </Button>
      </div>

      <div className="grid gap-4 sm:gap-6">
        <CurrentWeather
          data={weatherQuery.data}
          locationName={locationName ? {
            name: locationName,
            lat: coordinates?.lat ?? 0,
            lon: coordinates?.lon ?? 0,
            country: "Unknown"
          } : undefined}
          isFavorite={
            coordinates ? isFavorite(coordinates.lat, coordinates.lon) : false
          }
          onToggleFavorite={handleToggleFavorite}
        />
        <HourlyTemperature data={forecastQuery.data} />
        <WeatherDetails data={weatherQuery.data} />
        <WeatherForecast data={forecastQuery.data} />
      </div>
    </main>
  );
};

export default WeatherDashboard;
