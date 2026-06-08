import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";
import { FavoriteCity } from "@/api/type";

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>(
    "favorites",
    []
  );
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: () => favorites,
    initialData: favorites,
    staleTime: Infinity,
  });

  const addFavorite = useMutation({
    mutationFn: async (city: Omit<FavoriteCity, "id" | "addedAt">) => {
      const newFavorite: FavoriteCity = {
        ...city,
        id: `${city.lat}-${city.lon}`,
        addedAt: Date.now(),
      };

      const currentFavorites = Array.isArray(favorites) ? favorites : [];
      const exists = currentFavorites.some((fav) => fav.id === newFavorite.id);
      if (exists) return currentFavorites;

      const newFavorites = [...currentFavorites, newFavorite];
      setFavorites(newFavorites);
      return newFavorites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const removeFavorite = useMutation({
    mutationFn: async (cityId: string) => {
      const currentFavorites = Array.isArray(favorites) ? favorites : [];
      const newFavorites = currentFavorites.filter((city) => city.id !== cityId);
      setFavorites(newFavorites);
      return newFavorites;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  return {
    favorites: Array.isArray(favoritesQuery.data) ? favoritesQuery.data : [],
    addFavorite,
    removeFavorite,
    isFavorite: (lat: number, lon: number) => {
      const currentFavorites = Array.isArray(favorites) ? favorites : [];
      return currentFavorites.some((city) => city.lat === lat && city.lon === lon);
    },
  };
}
