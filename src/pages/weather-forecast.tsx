import { ForecastData } from "@/api/type";
import { ArrowDown, ArrowUp, Droplets, Wind, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const dailyForecasts = data.list.reduce(
    (acc, forecast) => {
      const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

      if (!acc[date]) {
        acc[date] = {
          temp_min: forecast.main.temp_min,
          temp_max: forecast.main.temp_max,
          humidity: forecast.main.humidity,
          wind: forecast.wind.speed,
          weather: forecast.weather[0],
          date: forecast.dt,
        };
      } else {
        acc[date].temp_min = Math.min(
          acc[date].temp_min,
          forecast.main.temp_min
        );
        acc[date].temp_max = Math.max(
          acc[date].temp_max,
          forecast.main.temp_max
        );
      }

      return acc;
    },
    {} as Record<string, DailyForecast>
  );

  const nextDays = Object.values(dailyForecasts).slice(1, 6);
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card className="bg-card/30 backdrop-blur-md border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          5-Day Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {nextDays.map((day, index) => (
            <div
              key={day.date}
              className={cn(
                "group flex items-center justify-between p-4 rounded-xl",
                "bg-card/50 border border-border/50",
                "transition-all duration-300",
                "hover:bg-card/80 hover:scale-[1.02]",
                "hover:shadow-lg"
              )}
            >
              {/* Date and Weather Icon */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                    alt={day.weather.description}
                    className="h-10 w-10"
                  />
                </div>
                <div>
                  <p className="font-medium">
                    {format(new Date(day.date * 1000), "EEE, MMM d")}
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {day.weather.description}
                  </p>
                </div>
              </div>

              {/* Temperature */}
              <div className="flex items-center gap-6">
                {/* Min Temp */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Min</p>
                  <div className="flex items-center text-blue-500 font-semibold">
                    <ArrowDown className="mr-1 h-4 w-4" />
                    {formatTemp(day.temp_min)}
                  </div>
                </div>

                {/* Max Temp */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Max</p>
                  <div className="flex items-center text-red-500 font-semibold">
                    <ArrowUp className="mr-1 h-4 w-4" />
                    {formatTemp(day.temp_max)}
                  </div>
                </div>

                {/* Humidity and Wind */}
                <div className="flex gap-6 pl-6 border-l border-border">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      Humidity
                    </p>
                    <div className="flex items-center justify-center text-sky-500">
                      <Droplets className="mr-1 h-4 w-4" />
                      <span className="font-semibold">{day.humidity}%</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Wind</p>
                    <div className="flex items-center justify-center text-emerald-500">
                      <Wind className="mr-1 h-4 w-4" />
                      <span className="font-semibold">{day.wind}m/s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
