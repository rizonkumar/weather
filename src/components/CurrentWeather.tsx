import { GeocodingResponse, WeatherData } from "@/api/type";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplet, Wind, Gauge, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    wind: { speed },
  } = data;

  const formatTemperature = (temp: number) => `${temp.toFixed(1)}°C`;

  return (
    <Card
      className={cn(
        "relative overflow-hidden",
        "bg-card/30 backdrop-blur-md",
        "border-border/50"
      )}
    >
      <CardContent className="p-4 md:p-8">
        {/* Location Header */}
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <div className="p-2 rounded-full bg-primary/10">
            <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-foreground">
              {locationName?.name}
              <span className="text-muted-foreground font-normal">
                , {locationName?.state}
              </span>
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              {locationName?.country}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4 md:gap-8">
          <div className="space-y-4 md:space-y-8">
            {/* Temperature Display */}
            <div>
              <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4">
                <div className="text-6xl sm:text-8xl font-bold tracking-tighter text-foreground">
                  {formatTemperature(temp)}
                </div>
                <div className="mt-0 sm:mt-2">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Feels like
                  </p>
                  <p className="text-lg sm:text-xl font-medium text-foreground">
                    {formatTemperature(feels_like)}
                  </p>
                </div>
              </div>

              {/* Min/Max Temperature */}
              <div className="flex gap-4 mt-2 md:mt-4">
                <TemperatureIndicator
                  icon={<ArrowDown className="h-3 w-3 md:h-4 md:w-4" />}
                  value={temp_min}
                  label="Min"
                  variant="blue"
                />
                <TemperatureIndicator
                  icon={<ArrowUp className="h-3 w-3 md:h-4 md:w-4" />}
                  value={temp_max}
                  label="Max"
                  variant="red"
                />
              </div>
            </div>

            {/* Weather Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4">
              <MetricCard
                icon={<Droplet className="h-4 w-4 md:h-5 md:w-5" />}
                label="Humidity"
                value={humidity}
                unit="%"
                color="blue"
              />
              <MetricCard
                icon={<Wind className="h-4 w-4 md:h-5 md:w-5" />}
                label="Wind Speed"
                value={speed}
                unit="m/s"
                color="cyan"
              />
              <MetricCard
                icon={<Gauge className="h-4 w-4 md:h-5 md:w-5" />}
                label="Pressure"
                value={pressure}
                unit="hPa"
                color="purple"
                className="col-span-2 sm:col-span-1"
              />
            </div>
          </div>

          {/* Weather Icon and Description */}
          <div className="flex flex-col items-center justify-center mt-4 lg:mt-0">
            <div className="relative">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="h-32 w-32 md:h-48 md:w-48 object-contain"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full">
                <p
                  className={cn(
                    "text-center font-medium capitalize",
                    "bg-background/80 backdrop-blur-sm",
                    "rounded-full px-3 py-1.5 md:px-4 md:py-2 mx-auto w-max",
                    "text-xs md:text-sm border border-border/50",
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

const TemperatureIndicator = ({
  icon,
  value,
  label,
  variant,
}: TemperatureIndicatorProps) => (
  <div className="flex items-center gap-1.5">
    <span
      className={cn(
        "flex items-center justify-center",
        "w-5 h-5 md:w-6 md:h-6 rounded-full",
        variant === "blue"
          ? "bg-blue-500/10 text-blue-500"
          : "bg-red-500/10 text-red-500"
      )}
    >
      {icon}
    </span>
    <span className="text-xs md:text-sm font-medium">
      {label}: {value.toFixed(1)}°C
    </span>
  </div>
);

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
  const colorStyles = {
    blue: "bg-blue-500/10 text-blue-500",
    cyan: "bg-cyan-500/10 text-cyan-500",
    purple: "bg-purple-500/10 text-purple-500",
  };

  return (
    <div
      className={cn(
        "group flex items-center gap-2 md:gap-3 p-3 md:p-4",
        "rounded-xl bg-card/50",
        "border border-border/50",
        "transition-all duration-300",
        "hover:bg-card/80 hover:scale-[1.02]",
        "hover:shadow-lg",
        className
      )}
    >
      <div
        className={cn(
          "p-1.5 md:p-2 rounded-full transition-colors duration-300",
          colorStyles[color]
        )}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs md:text-sm text-muted-foreground">{label}</p>
        <p className="text-base md:text-lg font-medium text-foreground">
          {value}
          <span className="text-xs md:text-sm ml-1 text-muted-foreground">
            {unit}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CurrentWeather;
