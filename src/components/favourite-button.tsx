import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorite";
import { toast } from "sonner";
import { WeatherData } from "@/api/type";
import { motion } from "framer-motion";

interface FavoriteButtonProps {
  data: WeatherData;
}

export function FavoriteButton({ data }: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

  const handleToggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from Favorites`);
    } else {
      addFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to Favorites`);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant={isCurrentlyFavorite ? "default" : "outline"}
        size="icon"
        onClick={handleToggleFavorite}
        className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500" : "border-border hover:bg-accent"}
      >
        <Star
          className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current text-white" : "text-yellow-500"}`}
        />
      </Button>
    </motion.div>
  );
}
