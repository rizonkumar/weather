import { useNavigate } from "react-router-dom";
import { useWeatherQuery } from "@/hooks/use-weather";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorite";
import { toast } from "sonner";
import { FavoriteCityTabletProps } from "@/api/type";
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
    <div
      onClick={handleClick}
      className="relative flex min-w-[200px] md:min-w-[250px] cursor-pointer items-center gap-2 md:gap-3 
        rounded-lg border bg-card p-3 md:p-4 pr-6 md:pr-8 shadow-sm transition-all hover:shadow-md
        hover:scale-[1.02]"
      role="button"
      tabIndex={0}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 opacity-70 
          hover:opacity-100 hover:text-destructive-foreground"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Removed ${name} from Favorites`);
        }}
      >
        <X className="h-3 w-3 md:h-4 md:w-4" />
      </Button>

      {isLoading ? (
        <div className="flex h-8 items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : weather ? (
        <>
          <div className="flex items-center gap-1 md:gap-2">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="h-6 w-6 md:h-8 md:w-8"
            />
            <div>
              <p className="text-sm md:text-base font-medium truncate max-w-[100px] md:max-w-[150px]">
                {name}
              </p>
              <p className="text-[10px] md:text-xs text-muted-foreground">
                {weather.sys.country}
              </p>
            </div>
          </div>
          <div className="ml-auto text-right">
            <p className="text-lg md:text-xl font-bold">
              {Math.round(weather.main.temp)}°
            </p>
            <p className="text-[10px] md:text-xs capitalize text-muted-foreground truncate max-w-[80px] md:max-w-[120px]">
              {weather.weather[0].description}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}

export function FavoriteCities() {
  const { favorites, removeFavorite } = useFavorites();

  if (!favorites.length) {
    return null;
  }

  return (
    <div className="w-full px-4 md:px-6 py-4">
      <h1 className="text-lg md:text-xl font-bold tracking-tight mb-4">
        Favorites
      </h1>
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-2 md:gap-4">
          {favorites.map((city) => (
            <FavoriteCityTablet
              key={city.id}
              {...city}
              onRemove={() => removeFavorite.mutate(city.id)}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>
    </div>
  );
}
