import {
  Sunrise,
  Sunset,
  Gauge,
  Wind,
  Droplets,
  Eye,
  Cloud,
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
  const { wind, main, sys, visibility, clouds } = data;

  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  const getVisibilityDesc = (vis?: number) => {
    if (vis === undefined) return "N/A";
    if (vis >= 10000) return "Perfect clarity";
    if (vis >= 7000) return "Clear view";
    if (vis >= 4000) return "Light haze";
    if (vis >= 1000) return "Moderate fog";
    return "Heavy mist/fog";
  };

  const getCloudCoverDesc = (cloudsAll?: number) => {
    if (cloudsAll === undefined) return "N/A";
    if (cloudsAll === 0) return "Clear skies";
    if (cloudsAll <= 20) return "Fair skies";
    if (cloudsAll <= 50) return "Partly cloudy";
    if (cloudsAll <= 85) return "Mostly cloudy";
    return "Overcast";
  };

  const windDirection = getWindDirection(wind.deg);
  const windGusts = wind.gust ? ` (Gusts ${wind.gust} m/s)` : "";
  const windDescription = `${windDirection}${windGusts}`;

  let pressureDescription = "Atmospheric";
  if (main.sea_level && main.grnd_level) {
    pressureDescription = `Sea: ${main.sea_level} hPa | Ground: ${main.grnd_level} hPa`;
  } else if (main.sea_level) {
    pressureDescription = `Sea level: ${main.sea_level} hPa`;
  } else if (main.grnd_level) {
    pressureDescription = `Ground level: ${main.grnd_level} hPa`;
  }

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
      description: windDescription,
    },
    {
      title: "Air Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "bg-purple-500/10 text-purple-500",
      ringColor: "ring-purple-500/20",
      description: pressureDescription,
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
      title: "Visibility",
      value: visibility !== undefined ? `${(visibility / 1000).toFixed(1)} km` : "N/A",
      icon: Eye,
      color: "bg-emerald-500/10 text-emerald-500",
      ringColor: "ring-emerald-500/20",
      description: getVisibilityDesc(visibility),
    },
    {
      title: "Cloud Cover",
      value: clouds ? `${clouds.all}%` : "N/A",
      icon: Cloud,
      color: "bg-indigo-500/10 text-indigo-500",
      ringColor: "ring-indigo-500/20",
      description: getCloudCoverDesc(clouds?.all),
    },
  ];

  return (
    <Card className="bg-card/30 backdrop-blur-md border-border/50">
      <CardHeader className="p-3 sm:p-4 md:p-6">
        <CardTitle className="text-base sm:text-lg font-medium flex items-center gap-2">
          <CloudRain className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          Weather Conditions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 md:p-6">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {details.map((detail, index) => (
            <div
              key={detail.title}
              className={cn(
                "group flex gap-3 rounded-xl p-3 sm:p-4",
                "bg-card/50 border border-border/50",
                "transition-all duration-300",
                "hover:bg-card/80 hover:scale-[1.02]",
                "hover:shadow-lg",
                // Ensure last item spans full width on mobile if odd number of items
                index === details.length - 1 &&
                  details.length % 2 !== 0 &&
                  "xs:col-span-2 lg:col-span-1"
              )}
            >
              <div
                className={cn(
                  "shrink-0",
                  "p-2 sm:p-2.5 rounded-lg",
                  "ring-2 ring-offset-2 ring-offset-background",
                  detail.color,
                  detail.ringColor,
                  "transition-all duration-300",
                  "group-hover:ring-offset-4"
                )}
              >
                <detail.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground font-medium truncate">
                  {detail.title}
                </p>
                <p className="text-base sm:text-lg font-semibold tracking-tight truncate">
                  {detail.value}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 truncate">
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
