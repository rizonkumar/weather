import { ForecastData } from "@/api/type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CloudRain } from "lucide-react";
import { motion } from "framer-motion";
import WeatherIcon from "@/components/weather-icon";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface HourlyTemperatureProps {
  data: ForecastData;
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp_max),
    weather: item.weather[0],
    pop: item.pop ?? 0,
    humidity: item.main.humidity,
    wind: item.wind.speed,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-4">
      {/* Temperature Chart */}
      <Card className="bg-card/60 backdrop-blur-sm border-border shadow-sm">
        <CardHeader className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between p-4 md:p-6">
          <CardTitle className="text-base sm:text-lg font-bold">
            Temperature Trend
          </CardTitle>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-blue-500" />
              <span className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase tracking-wider">
                Temp Trend
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <div className="h-[200px] sm:h-[250px] md:h-[280px] w-full">
            <ResponsiveContainer>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 5, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  opacity={0.25}
                  vertical={false}
                />
                <XAxis
                  dataKey="time"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: "10px", dy: 10, fontWeight: 500 }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}°`}
                  domain={["dataMin - 2", "dataMax + 2"]}
                  tick={{ fontSize: "10px", fontWeight: 500 }}
                />
                <Tooltip
                  cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1, strokeDasharray: "4 4" }}
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      const weatherData = payload[0].payload.weather;
                      return (
                        <div className="rounded-xl border border-border bg-card/95 backdrop-blur-sm p-3.5 shadow-lg max-w-xs">
                          <div className="grid gap-2">
                            <div className="flex items-center gap-3">
                              <div className="p-1 rounded-lg bg-muted/50 border border-border/20">
                                <WeatherIcon iconCode={weatherData.icon} size={36} />
                              </div>
                              <div>
                                <p className="text-xs sm:text-sm font-extrabold capitalize text-foreground leading-tight">
                                  {weatherData.description}
                                </p>
                                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-medium">
                                  Forecast at {payload[0].payload.time}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3 pt-2 mt-1 border-t border-border/40 text-center">
                              <div>
                                <p className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider">
                                  Temp
                                </p>
                                <p className="text-xs sm:text-sm font-black text-blue-500 mt-0.5">
                                  {payload[0].value}°
                                </p>
                              </div>
                              <div>
                                <p className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider">
                                  Humidity
                                </p>
                                <p className="text-xs sm:text-sm font-black text-sky-500 mt-0.5">
                                  {payload[0].payload.humidity}%
                                </p>
                              </div>
                              <div>
                                <p className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider">
                                  Precip.
                                </p>
                                <p className="text-xs sm:text-sm font-black text-blue-400 mt-0.5">
                                  {Math.round(payload[0].payload.pop * 100)}%
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 0, fill: "#3b82f6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Hourly Forecast Cards */}
      <Card className="bg-card/60 backdrop-blur-sm border-border shadow-sm">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base sm:text-lg font-bold">
            Hourly Forecast
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <motion.div 
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
            className="space-y-2 sm:space-y-2.5 overflow-y-auto max-h-[220px] sm:max-h-[270px] md:max-h-[300px] pr-2 scrollbar-thin scrollbar-thumb-muted"
          >
            {chartData.map((hour, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  show: { opacity: 1, x: 0 }
                }}
                whileHover={{ scale: 1.015, x: 2 }}
                className={cn(
                  "flex items-center justify-between p-2.5 sm:p-3",
                  "rounded-xl bg-muted/20 border border-border/80 transition-all duration-300",
                  "hover:bg-muted/40 hover:border-primary/20 cursor-default"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-background border border-border/50 shrink-0 shadow-sm">
                    <WeatherIcon iconCode={hour.weather.icon} size={32} className="h-7 w-7 sm:h-8 sm:w-8" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-bold text-foreground">
                      {hour.time}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <p className="text-xs sm:text-sm text-muted-foreground capitalize">
                        {hour.weather.description}
                      </p>
                      {hour.pop > 0 && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-blue-600 dark:text-blue-400 font-bold bg-blue-500/10 px-1.5 py-0.5 rounded-full shrink-0">
                          <CloudRain className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          {Math.round(hour.pop * 100)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg sm:text-2xl font-black text-foreground">
                    {hour.temp}°
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HourlyTemperature;
