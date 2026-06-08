import { useNavigate } from "react-router-dom";
import { useWeatherQuery } from "@/hooks/use-weather";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorite";
import { toast } from "sonner";
import { FavoriteCityTabletProps } from "@/api/type";
import { motion, AnimatePresence } from "framer-motion";
import WeatherIcon from "@/components/weather-icon";
import { cn } from "@/lib/utils";

function FavoriteCityTablet({
  id,
  name,
  lat,
  lon,
  onRemove,
}: FavoriteCityTabletProps) {
  const navigate = useNavigate();
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

  const handleClick = () => {
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  const getWeatherGlowClass = (iconCode: string) => {
    const code = iconCode?.slice(0, 2);
    switch (code) {
      case "01": return "weather-glow-clear";
      case "02":
      case "03":
      case "04": return "weather-glow-clouds";
      case "09":
      case "10": return "weather-glow-rain";
      case "11": return "weather-glow-thunder";
      case "13": return "weather-glow-snow";
      case "50": return "weather-glow-mist";
      default: return "";
    }
  };

  const ambientGlowClass = weather ? getWeatherGlowClass(weather.weather[0].icon) : "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={cn(
        "relative flex min-w-[200px] md:min-w-[250px] cursor-pointer items-center gap-2.5 md:gap-4",
        "rounded-xl border border-border bg-card/50 backdrop-blur-sm p-3 md:p-4 pr-9 md:pr-11",
        "shadow-sm transition-all duration-300 hover:shadow-md hover:bg-card",
        ambientGlowClass
      )}
      role="button"
      tabIndex={0}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1.5 top-1.5 h-5 w-5 rounded-full p-0 opacity-40 hover:opacity-100 hover:bg-muted text-muted-foreground hover:text-destructive transition-all duration-200 z-20"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Removed ${name} from Favorites`);
        }}
      >
        <X className="h-3 w-3" />
      </Button>

      {isLoading ? (
        <div className="flex h-10 w-full items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      ) : weather ? (
        <>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex items-center justify-center p-1.5 rounded-xl bg-muted/40 border border-border/20">
              <WeatherIcon iconCode={weather.weather[0].icon} size={32} className="md:w-9 md:h-9" />
            </div>
            <div className="min-w-0">
              <p className="text-sm md:text-base font-extrabold text-foreground truncate max-w-[100px] md:max-w-[120px] tracking-tight leading-tight">
                {name}
              </p>
              <p className="text-[10px] md:text-xs text-muted-foreground font-semibold uppercase mt-0.5 tracking-wider">
                {weather.sys.country}
              </p>
            </div>
          </div>
          <div className="ml-auto text-right pl-2">
            <p className="text-base md:text-lg font-black text-foreground leading-none">
              {Math.round(weather.main.temp)}°
            </p>
            <p className="text-[9px] md:text-[10px] capitalize text-muted-foreground truncate max-w-[70px] md:max-w-[90px] font-semibold mt-1 tracking-wide">
              {weather.weather[0].description}
            </p>
          </div>
        </>
      ) : null}
    </motion.div>
  );
}

export function FavoriteCities() {
  const { favorites, removeFavorite } = useFavorites();

  if (!favorites.length) {
    return null;
  }

  return (
    <div className="w-full px-1 py-1">
      <h2 className="text-xs sm:text-sm font-bold tracking-wider text-muted-foreground uppercase mb-3 px-1">
        Favorite Cities
      </h2>
      <ScrollArea className="w-full pb-2">
        <div className="flex gap-3 md:gap-4 p-1">
          <AnimatePresence mode="popLayout">
            {favorites.map((city) => (
              <FavoriteCityTablet
                key={city.id}
                {...city}
                onRemove={() => removeFavorite.mutate(city.id)}
              />
            ))}
          </AnimatePresence>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

