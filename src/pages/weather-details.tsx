import {
  Sunrise,
  Sunset,
  Gauge,
  Wind,
  Droplets,
  Sun,
  CloudRain,
} from "lucide-react";
import { format } from "date-fns";
import { WeatherData } from "@/api/type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, main, sys } = data;

  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "bg-orange-500/10 text-orange-500",
      ringColor: "ring-orange-500/20",
      description: "Dawn breaks",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "bg-blue-500/10 text-blue-500",
      ringColor: "ring-blue-500/20",
      description: "Dusk falls",
    },
    {
      title: "Wind Speed",
      value: `${wind.speed} m/s`,
      icon: Wind,
      color: "bg-cyan-500/10 text-cyan-500",
      ringColor: "ring-cyan-500/20",
      description: getWindDirection(wind.deg),
    },
    {
      title: "Air Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "bg-purple-500/10 text-purple-500",
      ringColor: "ring-purple-500/20",
      description: "Atmospheric",
    },
    {
      title: "Humidity",
      value: `${main.humidity}%`,
      icon: Droplets,
      color: "bg-sky-500/10 text-sky-500",
      ringColor: "ring-sky-500/20",
      description: "Moisture level",
    },
    {
      title: "UV Index",
      value: "Moderate",
      icon: Sun,
      color: "bg-yellow-500/10 text-yellow-500",
      ringColor: "ring-yellow-500/20",
      description: "Moderate exposure",
    },
  ];

  return (
    <Card className="bg-card/30 backdrop-blur-md border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <CloudRain className="h-5 w-5 text-primary" />
          Weather Conditions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {details.map((detail) => (
            <div
              key={detail.title}
              className={cn(
                "group flex gap-4 rounded-xl p-4",
                "bg-card/50 border border-border/50",
                "transition-all duration-300",
                "hover:bg-card/80 hover:scale-[1.02]",
                "hover:shadow-lg"
              )}
            >
              <div
                className={cn(
                  "p-2.5 rounded-lg",
                  "ring-2 ring-offset-2 ring-offset-background",
                  detail.color,
                  detail.ringColor,
                  "transition-all duration-300",
                  "group-hover:ring-offset-4"
                )}
              >
                <detail.icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm text-muted-foreground font-medium">
                  {detail.title}
                </p>
                <p className="text-xl font-semibold tracking-tight">
                  {detail.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {detail.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
