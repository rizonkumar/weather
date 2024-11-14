import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/use-geoLocation";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading,
  } = useGeoLocation();

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
        >
          <RefreshCw className="size-4" />
        </Button>
      </div>

      {/* Weather content will go here */}
    </main>
  );
};

export default WeatherDashboard;
