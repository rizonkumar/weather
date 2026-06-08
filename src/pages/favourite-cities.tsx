import { useNavigate } from "react-router-dom";
import { useWeatherQuery } from "@/hooks/use-weather";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorite";
import { toast } from "sonner";
import { FavoriteCityTabletProps } from "@/api/type";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="relative flex min-w-[200px] md:min-w-[250px] cursor-pointer items-center gap-2 md:gap-3 
        rounded-lg border border-border bg-card p-3 md:p-4 pr-7 md:pr-9 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
      role="button"
      tabIndex={0}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1 h-5 w-5 rounded-full p-0 opacity-60 hover:opacity-100 hover:bg-muted text-muted-foreground hover:text-destructive"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Removed ${name} from Favorites`);
        }}
      >
        <X className="h-3.5 w-3.5" />
      </Button>

      {isLoading ? (
        <div className="flex h-8 w-full items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      ) : weather ? (
        <>
          <div className="flex items-center gap-1.5 md:gap-2">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="h-7 w-7 md:h-9 md:w-9"
            />
            <div>
              <p className="text-sm md:text-base font-bold truncate max-w-[100px] md:max-w-[140px]">
                {name}
              </p>
              <p className="text-[10px] md:text-xs text-muted-foreground font-medium">
                {weather.sys.country}
              </p>
            </div>
          </div>
          <div className="ml-auto text-right">
            <p className="text-base md:text-lg font-black text-foreground">
              {Math.round(weather.main.temp)}°
            </p>
            <p className="text-[10px] md:text-xs capitalize text-muted-foreground truncate max-w-[80px] md:max-w-[110px] font-medium">
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
    <div className="w-full px-1 py-2">
      <h2 className="text-sm md:text-base font-bold tracking-tight text-foreground/80 mb-3 px-1">
        Favorite Cities
      </h2>
      <ScrollArea className="w-full pb-2">
        <div className="flex gap-2.5 md:gap-4 p-1">
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
