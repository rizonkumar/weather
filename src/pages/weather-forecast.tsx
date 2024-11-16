import { ForecastData } from "@/api/type";
import { ArrowDown, ArrowUp, Droplets, Wind, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import WeatherMap3D from "@/components/WeatherMap3D";

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
    <div className="space-y-4">
      {/* Weather Map Card */}
      <Card className="bg-card/30 backdrop-blur-md border-border/50">
        <CardHeader className="p-3 sm:p-4">
          <CardTitle className="text-base sm:text-lg font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Weather Map
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <WeatherMap3D
            center={[data.city.coord.lon, data.city.coord.lat]}
            zoom={8}
            className="rounded-none sm:rounded-b-xl"
            weatherData={{
              temperature: data.list[0].main.temp_min,
              feelsLike: data.list[0].main.temp_min,
              humidity: data.list[0].main.humidity,
              windSpeed: data.list[0].wind.speed,
              description: data.list[0].weather[0].description
            }}
          />
        </CardContent>
      </Card>

      {/* 5-Day Forecast Card */}
      <Card className="bg-card/30 backdrop-blur-md border-border/50">
        <CardHeader className="p-3 sm:p-4">
          <CardTitle className="text-base sm:text-lg font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            5-Day Forecast
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4">
          <div className="grid gap-2 sm:gap-3">
            {nextDays.map((day) => (
              <div
                key={day.date}
                className={cn(
                  "group p-3 sm:p-4 rounded-xl",
                  "bg-card/50 border border-border/50",
                  "transition-all duration-300",
                  "hover:bg-card/80 hover:scale-[1.02]",
                  "hover:shadow-lg"
                )}
              >
                {/* Main Content Container */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  {/* Date and Weather Icon */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                      <img
                        src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                        alt={day.weather.description}
                        className="h-8 w-8 sm:h-10 sm:w-10"
                      />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-medium">
                        {format(new Date(day.date * 1000), "EEE, MMM d")}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground capitalize">
                        {day.weather.description}
                      </p>
                    </div>
                  </div>

                  {/* Stats Container */}
                  <div className="grid grid-cols-2 sm:flex items-center gap-3 sm:gap-6 pl-0 sm:pl-4">
                    {/* Temperature */}
                    <div className="flex gap-4 sm:gap-6 col-span-2 sm:col-span-1 justify-center sm:justify-start">
                      {/* Min Temp */}
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          Min
                        </p>
                        <div className="flex items-center text-blue-500 font-semibold">
                          <ArrowDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          <span className="text-sm sm:text-base">
                            {formatTemp(day.temp_min)}
                          </span>
                        </div>
                      </div>

                      {/* Max Temp */}
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          Max
                        </p>
                        <div className="flex items-center text-red-500 font-semibold">
                          <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          <span className="text-sm sm:text-base">
                            {formatTemp(day.temp_max)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Humidity and Wind */}
                    <div className="flex justify-between sm:justify-start sm:gap-6 sm:border-l sm:border-border sm:pl-6">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          Humidity
                        </p>
                        <div className="flex items-center justify-center text-sky-500">
                          <Droplets className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          <span className="text-sm sm:text-base font-semibold">
                            {day.humidity}%
                          </span>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          Wind
                        </p>
                        <div className="flex items-center justify-center text-emerald-500">
                          <Wind className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          <span className="text-sm sm:text-base font-semibold">
                            {day.wind}m/s
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherForecast;