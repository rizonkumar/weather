import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader } from "./ui/card";

function HourlyTemperatureSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6">
      {/* Temperature Chart Skeleton */}
      <Card className="bg-card/30 backdrop-blur-md border-border/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Skeleton className="h-6 w-40" />
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] relative">
            <Skeleton className="h-full w-full rounded-lg" />
            {/* Y-axis ticks */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-6">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-8" />
              ))}
            </div>
            {/* X-axis ticks */}
            <div className="absolute bottom-0 w-full flex justify-between px-6">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-12" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hourly Forecast Cards Skeleton */}
      <Card className="bg-card/30 backdrop-blur-md border-border/50">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-md" />
                  <div>
                    <Skeleton className="h-5 w-24 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-7 w-16 mb-2" />
                  <Skeleton className="h-4 w-24" />
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
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-6 w-48" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-xl p-4 bg-card/50 border border-border/50"
            >
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-20 mb-1" />
                <Skeleton className="h-3 w-32" />
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
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-6 w-36" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-xl bg-card/50 border border-border/50"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <div>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <Skeleton className="h-4 w-8 mx-auto mb-2" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="text-center">
                  <Skeleton className="h-4 w-8 mx-auto mb-2" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="flex gap-6 pl-6 border-l border-border">
                  <div className="text-center">
                    <Skeleton className="h-4 w-16 mx-auto mb-2" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <div className="text-center">
                    <Skeleton className="h-4 w-16 mx-auto mb-2" />
                    <Skeleton className="h-6 w-20" />
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
        <Card className="relative overflow-hidden bg-card/30 backdrop-blur-md border-border/50">
          <CardContent className="p-6 md:p-8">
            {/* ... existing Current Weather skeleton content ... */}
          </CardContent>
        </Card>

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
