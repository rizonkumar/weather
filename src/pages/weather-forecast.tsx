import { useState } from "react";
import { ForecastData } from "@/api/type";
import { ArrowDown, ArrowUp, Droplets, Wind, Calendar, CloudRain, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import WeatherMap3D from "@/components/WeatherMap3D";
import { motion, AnimatePresence } from "framer-motion";
import WeatherIcon from "@/components/weather-icon";

interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  wind_gust: number;
  pressure: number;
  clouds: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  max_pop: number;
  total_rain: number;
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const dailyForecasts = data.list.reduce(
    (acc, forecast) => {
      const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");
      const pop = forecast.pop ?? 0;
      const rain = forecast.rain?.["3h"] ?? 0;

      if (!acc[date]) {
        acc[date] = {
          temp_min: forecast.main.temp_min,
          temp_max: forecast.main.temp_max,
          humidity: forecast.main.humidity,
          wind: forecast.wind.speed,
          wind_gust: forecast.wind.gust ?? 0,
          pressure: forecast.main.pressure,
          clouds: forecast.clouds?.all ?? 0,
          weather: forecast.weather[0],
          date: forecast.dt,
          max_pop: pop,
          total_rain: rain,
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
        acc[date].max_pop = Math.max(acc[date].max_pop, pop);
        acc[date].total_rain += rain;
        acc[date].humidity = Math.round((acc[date].humidity + forecast.main.humidity) / 2);
        acc[date].wind = Math.max(acc[date].wind, forecast.wind.speed);
        acc[date].wind_gust = Math.max(acc[date].wind_gust, forecast.wind.gust ?? 0);
        acc[date].pressure = Math.round((acc[date].pressure + forecast.main.pressure) / 2);
        acc[date].clouds = Math.round((acc[date].clouds + (forecast.clouds?.all ?? 0)) / 2);
      }

      return acc;
    },
    {} as Record<string, DailyForecast>
  );

  const nextDays = Object.values(dailyForecasts).slice(1, 6);
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  const toggleExpand = (date: number) => {
    setExpandedDay(expandedDay === date ? null : date);
  };

  return (
    <div className="space-y-4">
      {/* Weather Map Card */}
      <Card className="bg-card/60 backdrop-blur-sm border-border shadow-sm">
        <CardHeader className="p-4">
          <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
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
      <Card className="bg-card/60 backdrop-blur-sm border-border shadow-sm">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            5-Day Forecast
          </CardTitle>
          <p className="text-xs text-muted-foreground">Click on any day to see detailed conditions</p>
        </CardHeader>
        <CardContent className="p-3 sm:p-4">
          <motion.div 
            layout="position"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.04
                }
              }
            }}
            initial="hidden"
            animate="show"
            className="grid gap-2.5 sm:grid-cols-1"
          >
            {nextDays.map((day) => {
              const isExpanded = expandedDay === day.date;
              return (
                <motion.div
                  key={day.date}
                  layout="position"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                  onClick={() => toggleExpand(day.date)}
                  className={cn(
                    "group p-3 sm:p-4 rounded-xl cursor-pointer select-none",
                    "bg-muted/20 border border-border/80",
                    "transition-all duration-300",
                    "hover:bg-muted/40 hover:border-primary/20",
                    isExpanded && "bg-muted/40 border-primary/20 shadow-sm"
                  )}
                >
                  {/* Main Content Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    {/* Left: Date, Icon & Description */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-background border border-border/50 shrink-0 shadow-sm">
                        <WeatherIcon iconCode={day.weather.icon} size={32} className="h-7 w-7 sm:h-8 sm:w-8" />
                      </div>
                      <div>
                        <p className="text-sm sm:text-base font-bold text-foreground">
                          {format(new Date(day.date * 1000), "EEE, MMM d")}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <p className="text-xs sm:text-sm text-muted-foreground capitalize truncate max-w-[120px] sm:max-w-none">
                            {day.weather.description}
                          </p>
                          {day.max_pop > 0 && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] sm:text-xs text-blue-600 dark:text-blue-400 font-bold bg-blue-500/10 px-1.5 py-0.5 rounded-full shrink-0">
                              <CloudRain className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                              {Math.round(day.max_pop * 100)}%
                              {day.total_rain > 0 && ` (${day.total_rain.toFixed(1)}mm)`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Stats and Chevron */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                      <div className="grid grid-cols-2 sm:flex items-center gap-4 sm:gap-6">
                        {/* Temperature bounds */}
                        <div className="flex gap-4 sm:gap-5">
                          <div className="text-center">
                            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Min</p>
                            <div className="flex items-center text-blue-500 font-bold">
                              <ArrowDown className="h-3.5 w-3.5 mr-0.5" />
                              <span className="text-xs sm:text-sm">{formatTemp(day.temp_min)}</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Max</p>
                            <div className="flex items-center text-red-500 font-bold">
                              <ArrowUp className="h-3.5 w-3.5 mr-0.5" />
                              <span className="text-xs sm:text-sm">{formatTemp(day.temp_max)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Quick conditions */}
                        <div className="flex gap-4 sm:gap-5 sm:border-l sm:border-border/40 sm:pl-5">
                          <div className="text-center">
                            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Humidity</p>
                            <div className="flex items-center justify-center text-sky-500 font-bold">
                              <Droplets className="h-3.5 w-3.5 mr-0.5" />
                              <span className="text-xs sm:text-sm">{day.humidity}%</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Wind</p>
                            <div className="flex items-center justify-center text-emerald-500 font-bold">
                              <Wind className="h-3.5 w-3.5 mr-0.5" />
                              <span className="text-xs sm:text-sm">{day.wind.toFixed(1)}m/s</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expand indicator chevron */}
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="text-muted-foreground/60 group-hover:text-foreground hidden sm:block"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Expandable Details Container */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border/30 mt-3 pt-3.5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                          <div className="p-2 bg-background/30 rounded-lg border border-border/10">
                            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">Atmospheric Pressure</p>
                            <p className="text-sm font-extrabold text-foreground mt-0.5">{day.pressure} hPa</p>
                          </div>
                          <div className="p-2 bg-background/30 rounded-lg border border-border/10">
                            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">Cloud Coverage</p>
                            <p className="text-sm font-extrabold text-foreground mt-0.5">{day.clouds}%</p>
                          </div>
                          <div className="p-2 bg-background/30 rounded-lg border border-border/10">
                            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">Max Wind Gusts</p>
                            <p className="text-sm font-extrabold text-foreground mt-0.5">
                              {day.wind_gust > 0 ? `${day.wind_gust.toFixed(1)} m/s` : "No gusts"}
                            </p>
                          </div>
                          <div className="p-2 bg-background/30 rounded-lg border border-border/10">
                            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">Total Rain Volume</p>
                            <p className="text-sm font-extrabold text-foreground mt-0.5">
                              {day.total_rain > 0 ? `${day.total_rain.toFixed(1)} mm` : "No rain"}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherForecast;