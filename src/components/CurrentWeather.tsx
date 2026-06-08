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
import { motion } from "framer-motion";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="relative overflow-hidden bg-card border-border shadow-sm">
        <CardContent className="p-4 sm:p-6 md:p-8">
          {/* Location Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-primary/5 border border-primary/10">
                <MapPin className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-foreground">
                  {locationName?.name}
                  <span className="text-muted-foreground font-normal text-sm sm:text-base">
                    , {locationName?.state}
                  </span>
                </h2>
                <p className="text-xs text-muted-foreground">
                  {locationName?.country}
                </p>
              </div>
            </div>

            {/* Favorite Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={isFavorite ? "default" : "outline"}
                size="icon"
                className={cn(
                  "h-9 w-9 rounded-full shadow-sm transition-colors border-border",
                  isFavorite ? "bg-red-500 hover:bg-red-600 text-white border-red-500" : "bg-card hover:bg-accent"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite();
                }}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    isFavorite ? "fill-current text-white" : "text-red-500"
                  )}
                />
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4 sm:gap-6">
            <div className="space-y-4 sm:space-y-6">
              {/* Temperature Display */}
              <div>
                <div className="flex flex-row items-start gap-4">
                  <div className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-foreground">
                    {formatTemperature(temp)}
                  </div>
                  <div className="mt-1 sm:mt-2">
                    <p className="text-xs text-muted-foreground font-medium">
                      Feels like
                    </p>
                    <p className="text-sm sm:text-lg font-semibold text-foreground">
                      {formatTemperature(feels_like)}
                    </p>
                  </div>
                </div>

                {/* Min/Max Temperature */}
                <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
                  <TemperatureIndicator
                    icon={<ArrowDown className="h-3.5 w-3.5" />}
                    value={temp_min}
                    label="Min"
                    variant="blue"
                  />
                  <TemperatureIndicator
                    icon={<ArrowUp className="h-3.5 w-3.5" />}
                    value={temp_max}
                    label="Max"
                    variant="red"
                  />
                </div>
              </div>

              {/* Weather Metrics */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <MetricCard
                  icon={<Droplet className="h-4 sm:h-5 w-4 sm:w-5" />}
                  label="Humidity"
                  value={humidity}
                  unit="%"
                  color="blue"
                />
                <MetricCard
                  icon={<Wind className="h-4 sm:h-5 w-4 sm:w-5" />}
                  label="Wind Speed"
                  value={speed}
                  unit="m/s"
                  color="cyan"
                />
                <MetricCard
                  icon={<Gauge className="h-4 sm:h-5 w-4 sm:w-5" />}
                  label="Pressure"
                  value={pressure}
                  unit="hPa"
                  color="purple"
                />
              </div>
            </div>

            {/* Weather Icon and Description */}
            <div className="hidden lg:flex flex-col items-center justify-center p-4 bg-muted/20 border border-border/50 rounded-2xl relative">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                  alt={currentWeather.description}
                  className="h-36 w-36 md:h-44 md:w-44 object-contain filter drop-shadow-sm"
                />
              </motion.div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                <p className="text-center font-semibold capitalize bg-muted border border-border rounded-full px-4 py-1 text-xs text-foreground shadow-sm">
                  {currentWeather.description}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface TemperatureIndicatorProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  variant: "blue" | "red";
}

const TemperatureIndicator = ({
  icon,
  value,
  label,
  variant,
}: TemperatureIndicatorProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-muted/40",
        variant === "blue" && "text-blue-600 dark:text-blue-400",
        variant === "red" && "text-red-600 dark:text-red-400"
      )}
    >
      {icon}
      <div>
        <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-xs sm:text-sm font-bold">
          {value.toFixed(1)}°C
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
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex flex-col items-center gap-1 p-2 sm:p-3 rounded-lg bg-muted/40 border border-border",
        color === "blue" && "text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-950/30",
        color === "cyan" && "text-cyan-600 dark:text-cyan-400 border-cyan-100 dark:border-cyan-950/30",
        color === "purple" && "text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-950/30",
        className
      )}
    >
      <div className="p-1 rounded-full bg-background/80 shadow-sm">
        {icon}
      </div>
      <p className="text-[10px] sm:text-xs text-muted-foreground font-semibold tracking-wide uppercase mt-0.5">{label}</p>
      <div className="text-center">
        <p className="text-sm sm:text-base font-extrabold text-foreground">
          {value}
          <span className="text-[10px] sm:text-xs font-normal text-muted-foreground ml-0.5">
            {unit}
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;
