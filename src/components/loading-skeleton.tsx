import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ScrollBar, ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  children: React.ReactNode;
}

// Helper wrapper to add standard shimmer classes to cards
function ShimmerCardWrapper({ className, children }: SkeletonCardProps) {
  return (
    <Card className={cn("bg-card/60 backdrop-blur-sm border border-border shadow-sm shimmer-card", className)}>
      {children}
    </Card>
  );
}

function HourlyTemperatureSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-4">
      {/* Temperature Chart Skeleton */}
      <ShimmerCardWrapper>
        <CardHeader className="flex flex-row items-center justify-between p-4 md:p-6 pb-2">
          <Skeleton className="h-5 w-32 sm:w-40" />
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <div className="h-[200px] sm:h-[250px] md:h-[280px] relative mt-2">
            <Skeleton className="h-full w-full rounded-xl opacity-60" />
            {/* Axis grid lines representation */}
            <div className="absolute inset-0 flex flex-col justify-between py-6 px-1 pointer-events-none opacity-40">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border-b border-border border-dashed w-full h-0" />
              ))}
            </div>
          </div>
        </CardContent>
      </ShimmerCardWrapper>

      {/* Hourly Forecast Cards Skeleton */}
      <ShimmerCardWrapper>
        <CardHeader className="p-4 md:p-6 pb-2">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <div className="space-y-2.5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl border border-border bg-muted/10"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-14 sm:w-20" />
                    <Skeleton className="h-3 w-16 sm:w-24" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-6 w-10 sm:w-14" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </ShimmerCardWrapper>
    </div>
  );
}

// Weather Details Skeleton
function WeatherDetailsSkeleton() {
  return (
    <ShimmerCardWrapper>
      <CardHeader className="p-4 md:p-6 pb-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-lg" />
          <Skeleton className="h-5 w-36 sm:w-48" />
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex gap-3 rounded-xl p-3 sm:p-4 border border-border bg-muted/10"
            >
              <Skeleton className="h-9 w-9 rounded-xl shrink-0" />
              <div className="space-y-1.5 flex-1 min-w-0">
                <Skeleton className="h-3 w-12 sm:w-16" />
                <Skeleton className="h-5 w-16 sm:w-24" />
                <Skeleton className="h-3 w-20 sm:w-28" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </ShimmerCardWrapper>
  );
}

// Weather Forecast Skeleton
function WeatherForecastSkeleton() {
  return (
    <div className="space-y-4">
      {/* Weather Map Skeleton */}
      <ShimmerCardWrapper>
        <CardHeader className="p-4 pb-2">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="p-0">
          <Skeleton className="h-[250px] w-full rounded-none sm:rounded-b-xl" />
        </CardContent>
      </ShimmerCardWrapper>

      {/* 5-Day Forecast Cards Skeleton */}
      <ShimmerCardWrapper>
        <CardHeader className="p-4 pb-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-48 mt-1" />
        </CardHeader>
        <CardContent className="p-3 sm:p-4">
          <div className="grid gap-2.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl border border-border bg-muted/10"
              >
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                  <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-4.5 w-24 sm:w-32" />
                    <Skeleton className="h-3.5 w-16 sm:w-20" />
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  <div className="grid grid-cols-2 sm:flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                    <div className="flex gap-4">
                      <div className="space-y-1 text-center">
                        <Skeleton className="h-3 w-6 mx-auto" />
                        <Skeleton className="h-4 w-10" />
                      </div>
                      <div className="space-y-1 text-center">
                        <Skeleton className="h-3 w-6 mx-auto" />
                        <Skeleton className="h-4 w-10" />
                      </div>
                    </div>
                    <div className="flex gap-4 sm:border-l sm:border-border sm:pl-5">
                      <div className="space-y-1 text-center">
                        <Skeleton className="h-3 w-10 mx-auto" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                      <div className="space-y-1 text-center">
                        <Skeleton className="h-3 w-8 mx-auto" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </ShimmerCardWrapper>
    </div>
  );
}

function CurrentWeatherSkeleton() {
  return (
    <ShimmerCardWrapper>
      <CardContent className="p-5 sm:p-6 md:p-8">
        {/* Location Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/5 border border-primary/10">
              <Skeleton className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-5 w-28 sm:w-40" />
              <Skeleton className="h-3 w-16 sm:w-24" />
            </div>
          </div>
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-6 md:gap-8">
          <div className="space-y-6">
            {/* Temperature Display */}
            <div>
              <div className="flex items-center gap-5">
                <Skeleton className="h-14 sm:h-20 w-28 sm:w-44" />
                
                {/* Mobile inline icon */}
                <div className="md:hidden flex-shrink-0">
                  <Skeleton className="h-14 w-14 rounded-2xl" />
                </div>
                
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-14" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>

              {/* Min/Max Temperature */}
              <div className="flex gap-2 sm:gap-3 mt-4">
                <Skeleton className="h-7 w-16 rounded-xl" />
                <Skeleton className="h-7 w-16 rounded-xl" />
              </div>
            </div>

            {/* Weather Metrics */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl border border-border bg-muted/10">
                  <Skeleton className="h-7 w-7 rounded-xl" />
                  <Skeleton className="h-3 w-10 mt-1" />
                  <Skeleton className="h-5 w-8 mt-0.5" />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Weather Icon panel */}
          <div className="hidden md:flex flex-col items-center justify-center p-5 border border-border bg-muted/10 rounded-2xl relative">
            <Skeleton className="h-28 w-28 rounded-full" />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
              <Skeleton className="h-6 w-28 rounded-full" />
            </div>
          </div>
        </div>
      </CardContent>
    </ShimmerCardWrapper>
  );
}

function FavoriteCitiesSkeleton() {
  return (
    <div className="w-full space-y-3 px-1 py-1">
      <Skeleton className="h-4 w-24" />
      <ScrollArea className="w-full pb-2">
        <div className="flex space-x-3 p-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="relative flex min-w-[200px] md:min-w-[250px] items-center gap-3 
                rounded-xl border border-border bg-card/60 backdrop-blur-sm p-3 md:p-4 pr-9"
            >
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-xl" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-16 md:w-24" />
                  <Skeleton className="h-3 w-10" />
                </div>
              </div>
              <div className="ml-auto text-right space-y-1.5">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-3 w-14" />
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

// Main Weather Dashboard Skeleton
function WeatherSkeleton() {
  return (
    <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="space-y-1.5">
          <Skeleton className="h-7 w-28 sm:w-36" />
          <Skeleton className="h-4 w-44 sm:w-56" />
        </div>
        <Skeleton className="h-9 w-9 rounded-lg" />
      </div>

      <div className="grid gap-6">
        {/* Favorite Cities Skeleton */}
        <FavoriteCitiesSkeleton />

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

export { 
  WeatherSkeleton,
  WeatherDetailsSkeleton,
  WeatherForecastSkeleton,
  HourlyTemperatureSkeleton,
  FavoriteCitiesSkeleton,
  CurrentWeatherSkeleton
};
