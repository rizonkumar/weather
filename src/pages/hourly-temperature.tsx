import { ForecastData } from "@/api/type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface HourlyTemperatureProps {
  data: ForecastData;
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp_max),
    weather: item.weather[0],
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-4">
      {/* Temperature Chart */}
      <Card className="bg-card/30 backdrop-blur-md border-border/50">
        <CardHeader className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between p-4 md:p-6">
          <CardTitle className="text-base sm:text-lg font-medium">
            Temperature Trend
          </CardTitle>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-blue-500" />
              <span className="text-xs sm:text-sm text-muted-foreground">
                Temp
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="h-[200px] sm:h-[250px] md:h-[280px] w-full">
            <ResponsiveContainer>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 5, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  opacity={0.3}
                  vertical={false}
                />
                <XAxis
                  dataKey="time"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: "10px", dy: 10 }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}°`}
                  domain={["dataMin - 2", "dataMax + 2"]}
                  tick={{ fontSize: "10px" }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      const weatherData = payload[0].payload.weather;
                      return (
                        <div className="rounded-lg border bg-card/95 backdrop-blur-md p-2 sm:p-3 shadow-lg">
                          <div className="grid gap-1 sm:gap-2">
                            <div className="flex items-center gap-2">
                              <img
                                src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                                alt={weatherData.description}
                                className="w-8 h-8 sm:w-10 sm:h-10"
                              />
                              <div>
                                <p className="text-xs sm:text-sm font-medium capitalize">
                                  {weatherData.description}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {payload[0].payload.time}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 sm:gap-6 pt-1 sm:pt-2 text-center">
                              <div>
                                <p className="text-[10px] sm:text-xs text-muted-foreground">
                                  Temperature
                                </p>
                                <p className="text-sm sm:text-lg font-bold text-blue-500">
                                  {payload[0].value}°
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
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 0, fill: "#3b82f6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Hourly Forecast Cards */}
      <Card className="bg-card/30 backdrop-blur-md border-border/50">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base sm:text-lg font-medium">
            Hourly Forecast
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-2 sm:space-y-3 overflow-y-auto max-h-[500px] pr-2">
            {chartData.map((hour, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-center justify-between p-2 sm:p-3",
                  "rounded-lg bg-card/50 border border-border/50",
                  "hover:bg-card/80 transition-all duration-200",
                  "hover:scale-[1.02] hover:shadow-lg"
                )}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-md bg-primary/10">
                    <img
                      src={`https://openweathermap.org/img/wn/${hour.weather.icon}@2x.png`}
                      alt={hour.weather.description}
                      className="h-8 w-8 sm:h-10 sm:w-10"
                    />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-medium">
                      {hour.time}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground capitalize">
                      {hour.weather.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg sm:text-2xl font-bold">
                    {hour.temp}°
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

export default HourlyTemperature;
