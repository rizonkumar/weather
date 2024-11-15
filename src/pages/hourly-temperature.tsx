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
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
    weather: item.weather[0],
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6">
      {/* Temperature Chart */}
      <Card className="bg-card/30 backdrop-blur-md border-border/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">
            Temperature Trend
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span className="text-xs text-muted-foreground">Temp</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-gray-400" />
              <span className="text-xs text-muted-foreground">Feels</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] w-full">
            <ResponsiveContainer>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
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
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}°`}
                  domain={["dataMin - 2", "dataMax + 2"]}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      const weatherData = payload[0].payload.weather;
                      return (
                        <div className="rounded-lg border bg-card/95 backdrop-blur-md p-3 shadow-lg">
                          <div className="grid gap-2">
                            <div className="flex items-center gap-2">
                              <img
                                src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                                alt={weatherData.description}
                                className="w-10 h-10"
                              />
                              <div>
                                <p className="text-sm font-medium capitalize">
                                  {weatherData.description}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {payload[0].payload.time}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6 pt-2 text-center">
                              <div>
                                <p className="text-xs text-muted-foreground">
                                  Temperature
                                </p>
                                <p className="text-lg font-bold text-blue-500">
                                  {payload[0].value}°
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">
                                  Feels Like
                                </p>
                                <p className="text-lg font-bold text-gray-400">
                                  {payload[1].value}°
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
                  activeDot={{ r: 6, strokeWidth: 0, fill: "#3b82f6" }}
                />
                <Line
                  type="monotone"
                  dataKey="feels_like"
                  stroke="#9ca3af"
                  strokeWidth={2.5}
                  dot={false}
                  strokeDasharray="5 5"
                  activeDot={{ r: 6, strokeWidth: 0, fill: "#9ca3af" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Hourly Forecast Cards */}
      <Card className="bg-card/30 backdrop-blur-md border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Hourly Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {chartData.map((hour, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg",
                  "bg-card/50 border border-border/50",
                  "hover:bg-card/80 transition-all duration-200",
                  "hover:scale-[1.02]"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                    <img
                      src={`https://openweathermap.org/img/wn/${hour.weather.icon}@2x.png`}
                      alt={hour.weather.description}
                      className="h-10 w-10"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{hour.time}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {hour.weather.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{hour.temp}°</div>
                  <div className="text-sm text-muted-foreground">
                    Feels like {hour.feels_like}°
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
