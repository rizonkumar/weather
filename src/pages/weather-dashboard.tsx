import CurrentWeather from "@/components/CurrentWeather";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/use-geoLocation";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading,
  } = useGeoLocation();

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

  if (isLoading) return <WeatherSkeleton />;

  if (locationError || !coordinates) {
    return (
      <div className="container mx-auto px-4 py-8">
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

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-6 bg-gray-50 dark:bg-gray-900/50 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
          <div className="flex flex-col items-center gap-4">
            {/* Weather Icon */}
            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4">
              <svg
                className="w-12 h-12 text-gray-400 dark:text-gray-500"
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

            {/* Error Message */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Weather Data Unavailable
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                We're unable to fetch the weather information at the moment.
                This could be due to connection issues or service
                unavailability.
              </p>
            </div>

            {/* Action Button */}
            <Button
              onClick={handleRefresh}
              className="mt-4 bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
            >
              <RefreshCw className="size-4" />
              Refresh Weather Data
            </Button>
          </div>

          {/* Additional Details */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
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
    <main className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            My Location
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Current weather and forecast
          </p>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={getLocation}
          className="hover:bg-gray-100 dark:hover:bg-gray-800"
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw
            className={`size-4 ${weatherQuery.isFetching || forecastQuery.isFetching ? "animate-spin" : ""}`}
            onClick={handleRefresh}
          />
        </Button>
      </div>

      <div className="grid gap-6">
        <div>
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />
          {/* Current Weather Icon */}
          {/* Hourly Temperatures */}
        </div>
        <div>{/* Details Forecast */}</div>
      </div>
    </main>
  );
};

export default WeatherDashboard;
