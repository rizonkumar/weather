import { Skeleton } from "./ui/skeleton";

function WeatherSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-8">
        {/* Main weather card */}
        <Skeleton className="h-[400px] w-full rounded-xl bg-gray-200/80 dark:bg-gray-800/80" />

        {/* Hourly forecast */}
        <Skeleton className="h-[200px] w-full rounded-xl bg-gray-200/80 dark:bg-gray-800/80" />

        {/* Daily forecast and details */}
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="h-[300px] rounded-xl bg-gray-200/80 dark:bg-gray-800/80" />
          <Skeleton className="h-[300px] rounded-xl bg-gray-200/80 dark:bg-gray-800/80" />
        </div>
      </div>
    </div>
  );
}

export default WeatherSkeleton;
