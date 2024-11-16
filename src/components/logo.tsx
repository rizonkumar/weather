import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative w-8 h-8">
        {/* Sun */}
        <div className="absolute inset-0 bg-yellow-500 dark:bg-yellow-400 rounded-full" />
        
        {/* Cloud */}
        <div className="absolute -right-1 bottom-0 w-6 h-3.5 bg-blue-400 dark:bg-blue-300 rounded-full" />
        <div className="absolute -right-2 bottom-1 w-6 h-3 bg-blue-400 dark:bg-blue-300 rounded-full" />
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200 bg-clip-text text-transparent">
        WeatherApp
      </span>
    </div>
  );
}
