import { CurrentWeatherProps } from "@/api/type";
import { Card, CardContent } from "./ui/card";
import {
  ArrowDown,
  ArrowUp,
  Droplet,
  Wind,
  Gauge,
  MapPin,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";


const CurrentWeather = ({
  data,
  locationName,
  isFavorite,
  onToggleFavorite,
}: CurrentWeatherProps) => {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    wind: { speed },
  } = data;

  const formatTemperature = (temp: number) => `${temp.toFixed(1)}°C`;
  console.log("locationName",locationName);
  console.log('Current Weather',data)
  return (
    <Card
      className={cn(
        "relative overflow-hidden",
        "bg-card/30 backdrop-blur-md",
        "border-border/50"
      )}
    >
      <CardContent className="p-2 sm:p-4 md:p-6 lg:p-8">
        {/* Location Header */}
        <div className="flex items-center justify-between mb-2 sm:mb-4 md:mb-6">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="p-1 sm:p-1.5 md:p-2 rounded-full bg-primary/10">
              <MapPin className="h-2.5 w-2.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xs sm:text-base md:text-lg lg:text-xl font-semibold text-foreground">
                {locationName?.name}
                <span className="text-muted-foreground font-normal">
                  , {locationName?.state}
                </span>
              </h2>
              <p className="text-[10px] sm:text-sm text-muted-foreground">
                
                {locationName?.country}
              </p>
            </div>
          </div>

          {/* Favorite Button */}
          <Button
            variant={isFavorite ? "default" : "outline"}
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full",
              isFavorite && "bg-red-500 hover:bg-red-600"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
          >
            <Heart
              className={cn(
                "h-4 w-4",
                isFavorite ? "fill-current" : "text-red-500"
              )}
            />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-2 sm:gap-4 md:gap-6">
          {/* Rest of your existing code remains the same */}
          <div className="space-y-2 sm:space-y-4 md:space-y-6">
            {/* Temperature Display */}
            <div>
              <div className="flex flex-row items-start gap-2 sm:gap-4">
                <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground">
                  {formatTemperature(temp)}
                </div>
                <div className="mt-0.5 sm:mt-2">
                  <p className="text-[10px] sm:text-sm text-muted-foreground">
                    Feels like
                  </p>
                  <p className="text-xs sm:text-base md:text-lg lg:text-xl font-medium text-foreground">
                    {formatTemperature(feels_like)}
                  </p>
                </div>
              </div>

              {/* Min/Max Temperature */}
              <div className="flex gap-2 sm:gap-4 mt-1 sm:mt-2 md:mt-4">
                <TemperatureIndicator
                  icon={
                    <ArrowDown className="h-2.5 w-2.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  }
                  value={temp_min}
                  label="Min"
                  variant="blue"
                />
                <TemperatureIndicator
                  icon={
                    <ArrowUp className="h-2.5 w-2.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  }
                  value={temp_max}
                  label="Max"
                  variant="red"
                />
              </div>
            </div>

            {/* Weather Metrics */}
            <div className="grid grid-cols-3 gap-1 sm:gap-3 md:gap-4">
              <MetricCard
                icon={
                  <Droplet className="h-2.5 w-2.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                }
                label="Humidity"
                value={humidity}
                unit="%"
                color="blue"
              />
              <MetricCard
                icon={
                  <Wind className="h-2.5 w-2.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                }
                label="Wind Speed"
                value={speed}
                unit="m/s"
                color="cyan"
              />
              <MetricCard
                icon={
                  <Gauge className="h-2.5 w-2.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                }
                label="Pressure"
                value={pressure}
                unit="hPa"
                color="purple"
              />
            </div>
          </div>

          {/* Weather Icon and Description */}
          <div className="hidden lg:flex flex-col items-center justify-center p-4">
            <div className="relative">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="h-28 w-28 sm:h-32 sm:w-32 md:h-48 md:w-48 object-contain"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full">
                <p
                  className={cn(
                    "text-center font-medium capitalize",
                    "bg-background/80 backdrop-blur-sm",
                    "rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mx-auto w-max",
                    "text-xs sm:text-sm border border-border/50",
                    "shadow-lg"
                  )}
                >
                  {currentWeather.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface TemperatureIndicatorProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  variant: "blue" | "red";
}

const formatTemperature = (temp: number) => `${temp.toFixed(1)}°C`;

const TemperatureIndicator = ({
  icon,
  value,
  label,
  variant,
}: TemperatureIndicatorProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg",
        "border border-border/50",
        "bg-card/50",
        variant === "blue" && "text-blue-500",
        variant === "red" && "text-red-500"
      )}
    >
      {icon}
      <div>
        <p className="text-[10px] sm:text-xs text-muted-foreground">{label}</p>
        <p className="text-xs sm:text-sm font-medium">
          {formatTemperature(value)}
        </p>
      </div>
    </div>
  );
};

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  unit: string;
  color: "blue" | "cyan" | "purple";
  className?: string;
}

const MetricCard = ({
  icon,
  label,
  value,
  unit,
  color,
  className,
}: MetricCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-0.5 sm:gap-1 p-1.5 sm:p-2 md:p-3 rounded-lg",
        "bg-card/50 border border-border/50",
        color === "blue" && "text-blue-500",
        color === "cyan" && "text-cyan-500",
        color === "purple" && "text-purple-500",
        className
      )}
    >
      {icon}
      <p className="text-[10px] sm:text-xs text-muted-foreground">{label}</p>
      <div className="text-center">
        <p className="text-xs sm:text-sm md:text-base font-medium">
          {value}
          <span className="text-[10px] sm:text-xs font-normal text-muted-foreground ml-0.5">
            {unit}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CurrentWeather;
