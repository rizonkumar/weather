import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader } from "./ui/card";

function HourlyTemperatureSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-3 sm:gap-6">
      {/* Temperature Chart Skeleton */}
      <Card className="bg-card/30 backdrop-blur-md border-border/50">
        <CardHeader className="flex flex-row items-center justify-between p-2 sm:p-4 pb-2">
          <Skeleton className="h-4 sm:h-6 w-24 sm:w-40" />
          <div className="flex gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Skeleton className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full" />
              <Skeleton className="h-3 sm:h-4 w-10 sm:w-16" />
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Skeleton className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full" />
              <Skeleton className="h-3 sm:h-4 w-10 sm:w-16" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
          <div className="h-[200px] sm:h-[280px] relative">
            <Skeleton className="h-full w-full rounded-lg" />
            {/* Y-axis ticks */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-4 sm:py-6">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-3 sm:h-4 w-6 sm:w-8" />
              ))}
            </div>
            {/* X-axis ticks */}
            <div className="absolute bottom-0 w-full flex justify-between px-4 sm:px-6">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-3 sm:h-4 w-8 sm:w-12" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hourly Forecast Cards Skeleton */}
      <Card className="bg-card/30 backdrop-blur-md border-border/50">
        <CardHeader className="p-2 sm:p-4">
          <Skeleton className="h-4 sm:h-6 w-24 sm:w-40" />
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
          <div className="space-y-2 sm:space-y-3">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-card/50 border border-border/50"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <Skeleton className="h-8 w-8 sm:h-12 sm:w-12 rounded-md" />
                  <div>
                    <Skeleton className="h-3.5 sm:h-5 w-16 sm:w-24 mb-1 sm:mb-2" />
                    <Skeleton className="h-3 sm:h-4 w-20 sm:w-32" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-5 sm:h-7 w-12 sm:w-16 mb-1 sm:mb-2" />
                  <Skeleton className="h-3 sm:h-4 w-16 sm:w-24" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Weather Details Skeleton
function WeatherDetailsSkeleton() {
  return (
    <Card className="bg-card/30 backdrop-blur-md border-border/50">
      <CardHeader className="p-2 sm:p-4 pb-2 sm:pb-4">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Skeleton className="h-4 w-4 sm:h-5 sm:w-5" />
          <Skeleton className="h-4 sm:h-6 w-32 sm:w-48" />
        </div>
      </CardHeader>
      <CardContent className="p-2 sm:p-4">
        <div className="grid gap-2 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex gap-2 sm:gap-4 rounded-xl p-2 sm:p-4 bg-card/50 border border-border/50"
            >
              <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-3 sm:h-4 w-16 sm:w-24 mb-1 sm:mb-2" />
                <Skeleton className="h-4 sm:h-6 w-14 sm:w-20 mb-0.5 sm:mb-1" />
                <Skeleton className="h-2.5 sm:h-3 w-24 sm:w-32" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Weather Forecast Skeleton
function WeatherForecastSkeleton() {
  return (
    <Card className="bg-card/30 backdrop-blur-md border-border/50">
      <CardHeader className="p-2 sm:p-4 pb-2 sm:pb-4">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Skeleton className="h-4 w-4 sm:h-5 sm:w-5" />
          <Skeleton className="h-4 sm:h-6 w-24 sm:w-36" />
        </div>
      </CardHeader>
      <CardContent className="p-2 sm:p-4">
        <div className="grid gap-2 sm:gap-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-4 rounded-xl bg-card/50 border border-border/50"
            >
              <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-0">
                <Skeleton className="h-8 w-8 sm:h-12 sm:w-12 rounded-xl" />
                <div>
                  <Skeleton className="h-3.5 sm:h-5 w-24 sm:w-32 mb-1 sm:mb-2" />
                  <Skeleton className="h-3 sm:h-4 w-16 sm:w-24" />
                </div>
              </div>
              <div className="flex items-center justify-between sm:gap-6">
                <div className="text-center">
                  <Skeleton className="h-3 sm:h-4 w-6 sm:w-8 mx-auto mb-1 sm:mb-2" />
                  <Skeleton className="h-4 sm:h-6 w-12 sm:w-16" />
                </div>
                <div className="text-center">
                  <Skeleton className="h-3 sm:h-4 w-6 sm:w-8 mx-auto mb-1 sm:mb-2" />
                  <Skeleton className="h-4 sm:h-6 w-12 sm:w-16" />
                </div>
                <div className="flex gap-4 sm:gap-6 pl-4 sm:pl-6 border-l border-border">
                  <div className="text-center">
                    <Skeleton className="h-3 sm:h-4 w-12 sm:w-16 mx-auto mb-1 sm:mb-2" />
                    <Skeleton className="h-4 sm:h-6 w-14 sm:w-20" />
                  </div>
                  <div className="text-center">
                    <Skeleton className="h-3 sm:h-4 w-12 sm:w-16 mx-auto mb-1 sm:mb-2" />
                    <Skeleton className="h-4 sm:h-6 w-14 sm:w-20" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Current Weather Skeleton
export function CurrentWeatherSkeleton() {
  return (
    <Card className="bg-card/30 backdrop-blur-md border-border/50">
      <CardContent className="p-2 sm:p-4 md:p-6 lg:p-8">
        {/* Location Header */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-4 md:mb-6">
          <div className="p-1 sm:p-1.5 md:p-2 rounded-full bg-primary/10">
            <Skeleton className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 sm:h-5 md:h-6 w-28 sm:w-40 md:w-48" />
            <Skeleton className="h-3 sm:h-4 w-16 sm:w-24" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-2 sm:gap-4 md:gap-6">
          <div className="space-y-2 sm:space-y-4 md:space-y-6">
            {/* Temperature Display */}
            <div>
              <div className="flex flex-row items-start gap-2 sm:gap-4">
                <Skeleton className="h-8 sm:h-14 md:h-16 lg:h-20 w-20 sm:w-32 md:w-40 lg:w-48" />
                <div className="mt-1 sm:mt-2">
                  <Skeleton className="h-2.5 sm:h-4 w-14 sm:w-20 mb-1" />
                  <Skeleton className="h-3.5 sm:h-5 md:h-6 w-10 sm:w-16" />
                </div>
              </div>

              {/* Min/Max Temperature */}
              <div className="flex gap-2 sm:gap-4 mt-2 md:mt-4">
                <div className="flex items-center gap-1">
                  <Skeleton className="h-2.5 w-2.5 sm:h-4 sm:w-4 rounded-full" />
                  <Skeleton className="h-3.5 sm:h-5 w-10 sm:w-16" />
                </div>
                <div className="flex items-center gap-1">
                  <Skeleton className="h-2.5 w-2.5 sm:h-4 sm:w-4 rounded-full" />
                  <Skeleton className="h-3.5 sm:h-5 w-10 sm:w-16" />
                </div>
              </div>
            </div>

            {/* Weather Metrics */}
            <div className="grid grid-cols-3 gap-1 sm:gap-3 md:gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-1.5 sm:p-3 rounded-lg bg-card/50 border border-border/50 space-y-1">
                  <Skeleton className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 rounded-full" />
                  <Skeleton className="h-2.5 sm:h-4 w-10 sm:w-16" />
                  <Skeleton className="h-3.5 sm:h-5 w-6 sm:w-10" />
                </div>
              ))}
            </div>
          </div>

          {/* Weather Icon and Description - Hidden on Mobile */}
          <div className="hidden lg:flex flex-col items-center justify-center p-4">
            <Skeleton className="h-28 w-28 sm:h-32 sm:w-32 md:h-48 md:w-48 rounded-full" />
            <div className="mt-4 space-y-2 text-center">
              <Skeleton className="h-5 w-24 mx-auto" />
              <Skeleton className="h-4 w-32 mx-auto" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Main Weather Skeleton
function WeatherSkeleton() {
  return (
    <main className="container mx-auto px-4 py-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>

      <div className="grid gap-6">
        {/* Current Weather Skeleton */}
        <CurrentWeatherSkeleton />

        {/* Hourly Temperature Skeleton */}
        <HourlyTemperatureSkeleton />

        {/* Weather Details Skeleton */}
        <WeatherDetailsSkeleton />

        {/* Weather Forecast Skeleton */}
        <WeatherForecastSkeleton />
      </div>
    </main>
  );
}

export default WeatherSkeleton;
