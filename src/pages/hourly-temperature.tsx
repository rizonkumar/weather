import { ForecastData } from "@/api/type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
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
  }));

  console.log("Data ------", data);
  return (
    <Card className="bg-card/30 backdrop-blur-md border-border/50 h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          Today's Temperature
        </CardTitle>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-primary mr-1" />
            <span className="text-xs text-muted-foreground">Temperature</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-muted-foreground mr-1" />
            <span className="text-xs text-muted-foreground">Feels Like</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
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
                domain={["auto", "auto"]}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="rounded-lg border bg-card p-2 shadow-lg">
                        <div className="grid gap-2">
                          <div className="flex items-center justify-between gap-8">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {payload[0].payload.time}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-8">
                            <span className="text-sm font-medium">
                              Temperature:
                            </span>
                            <span className="font-bold">
                              {payload[0].value}°
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-8">
                            <span className="text-sm font-medium">
                              Feels Like:
                            </span>
                            <span className="font-bold">
                              {payload[1].value}°
                            </span>
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
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
                activeDot={{ r: 4, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTemperature;
