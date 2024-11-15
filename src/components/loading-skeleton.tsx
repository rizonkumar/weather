import { Skeleton } from "./ui/skeleton";
import { Card, CardContent } from "./ui/card";

function HourlyTemperatureSkeleton() {
  return (
    <Card className="bg-card/30 backdrop-blur-md border-border/50 h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-40" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-[300px] relative">
            <Skeleton className="h-full w-full" />
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
        </div>
      </CardContent>
    </Card>
  );
}

function WeatherSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>

      <div className="grid gap-6">
        {/* Current Weather Skeleton */}
        <Card className="relative overflow-hidden bg-card/30 backdrop-blur-md border-border/50">
          <CardContent className="p-6 md:p-8">
            {/* Location Header Skeleton */}
            <div className="flex items-center gap-2 mb-6">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
              <div className="space-y-8">
                {/* Temperature Display Skeleton */}
                <div>
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-32 w-64" /> {/* Large temperature */}
                    <div className="mt-2 space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                  </div>

                  {/* Min/Max Temperature Skeleton */}
                  <div className="flex gap-6 mt-4">
                    <div className="flex items-center gap-1.5">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>

                {/* Weather Metrics Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border/50"
                    >
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weather Icon and Description Skeleton */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <Skeleton className="h-48 w-48 rounded-full" />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full flex justify-center">
                    <Skeleton className="h-8 w-32 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hourly Temperature Skeleton */}
        <div className="grid gap-6 md:grid-cols-2">
          <HourlyTemperatureSkeleton />
          {/* Add another skeleton component here if needed */}
        </div>
      </div>
    </div>
  );
}

export default WeatherSkeleton;
