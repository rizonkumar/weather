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
import WeatherIcon from "./weather-icon";

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

  // Determine the custom ambient glow style class based on the weather icon code
  const getWeatherGlowClass = (iconCode: string) => {
    const code = iconCode?.slice(0, 2);
    switch (code) {
      case "01":
        return "weather-glow-clear";
      case "02":
      case "03":
      case "04":
        return "weather-glow-clouds";
      case "09":
      case "10":
        return "weather-glow-rain";
      case "11":
        return "weather-glow-thunder";
      case "13":
        return "weather-glow-snow";
      case "50":
        return "weather-glow-mist";
      default:
        return "";
    }
  };

  const ambientGlowClass = getWeatherGlowClass(currentWeather.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className={cn(
        "relative overflow-hidden bg-card/60 backdrop-blur-sm border border-border transition-all duration-500",
        ambientGlowClass
      )}>
        <CardContent className="p-5 sm:p-6 md:p-8">
          {/* Location Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/5 border border-primary/10 transition-colors duration-300">
                <MapPin className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground flex items-baseline gap-1">
                  <span>{locationName?.name || data.name}</span>
                  {locationName?.state && (
                    <span className="text-muted-foreground font-normal text-xs sm:text-sm">
                      , {locationName.state}
                    </span>
                  )}
                </h2>
                <p className="text-xs text-muted-foreground font-medium">
                  {locationName?.country || data.sys.country}
                </p>
              </div>
            </div>

            {/* Favorite Button */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
            >
              <Button
                variant={isFavorite ? "default" : "outline"}
                size="icon"
                className={cn(
                  "h-9 w-9 rounded-full shadow-sm transition-all duration-300 border border-border",
                  isFavorite
                    ? "bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600"
                    : "bg-background hover:bg-accent hover:text-red-500"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite();
                }}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart
                  className={cn(
                    "h-4.5 w-4.5 transition-transform duration-300",
                    isFavorite ? "fill-current text-white scale-110" : "text-red-500"
                  )}
                />
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-6 md:gap-8">
            <div className="space-y-5 sm:space-y-6">
              {/* Temperature Display */}
              <div>
                <div className="flex items-center gap-5">
                  <div className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-foreground leading-none">
                    {formatTemperature(temp)}
                  </div>
                  
                  {/* Inline Icon for Mobile/Tablet */}
                  <div className="md:hidden flex-shrink-0 bg-muted/20 border border-border/50 rounded-2xl p-2.5">
                    <WeatherIcon iconCode={currentWeather.icon} size={64} />
                  </div>
                  
                  <div className="space-y-0.5">
                    <p className="text-xs text-muted-foreground font-semibold tracking-wide uppercase">
                      Feels like
                    </p>
                    <p className="text-lg sm:text-xl font-extrabold text-foreground">
                      {formatTemperature(feels_like)}
                    </p>
                  </div>
                </div>

                {/* Min/Max Temperature */}
                <div className="flex gap-2 sm:gap-3 mt-4">
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
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-2">
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

            {/* Weather Icon and Description (Desktop Panel) */}
            <div className="hidden md:flex flex-col items-center justify-center p-5 bg-muted/15 border border-border/40 rounded-2xl relative transition-colors duration-300 hover:bg-muted/20">
              <WeatherIcon iconCode={currentWeather.icon} size={144} className="filter drop-shadow-md" />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                <p className="text-center font-bold capitalize bg-card border border-border rounded-full px-4 py-1 text-xs text-foreground shadow-sm whitespace-nowrap tracking-wide">
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
        "flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/80 bg-muted/30 transition-colors hover:bg-muted/50 cursor-default",
        variant === "blue" && "text-blue-600 dark:text-blue-400 hover:border-blue-200/30",
        variant === "red" && "text-red-600 dark:text-red-400 hover:border-red-200/30"
      )}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-xs sm:text-sm font-black leading-none mt-0.5">
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
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "flex flex-col items-center gap-1.5 p-2.5 sm:p-4 rounded-xl bg-muted/20 border border-border transition-colors cursor-default",
        color === "blue" && "text-blue-500 hover:border-blue-400/30 dark:hover:border-blue-900/40",
        color === "cyan" && "text-cyan-500 hover:border-cyan-400/30 dark:hover:border-cyan-900/40",
        color === "purple" && "text-purple-500 hover:border-purple-400/30 dark:hover:border-purple-900/40",
        className
      )}
    >
      <div className="p-1.5 rounded-xl bg-background shadow-sm border border-border/30">
        {icon}
      </div>
      <p className="text-[10px] text-muted-foreground font-bold tracking-wider uppercase mt-1 text-center truncate max-w-full">
        {label}
      </p>
      <div className="text-center mt-0.5">
        <p className="text-base sm:text-lg font-black text-foreground leading-none">
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

