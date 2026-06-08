import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FavoriteCity } from "@/api/type";

export function useFavorites() {
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: () => {
      const item = window.localStorage.getItem("favorites");
      if (!item) return [];
      try {
        const parsed = JSON.parse(item);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    },
    staleTime: Infinity,
  });

  const addFavorite = useMutation({
    mutationFn: async (city: Omit<FavoriteCity, "id" | "addedAt">) => {
      const newFavorite: FavoriteCity = {
        ...city,
        id: `${city.lat}-${city.lon}`,
        addedAt: Date.now(),
      };

      const currentFavorites = favoritesQuery.data || [];
      const exists = currentFavorites.some((fav) => fav.id === newFavorite.id);
      if (exists) return currentFavorites;

      const newFavorites = [...currentFavorites, newFavorite];
      window.localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["favorites"], data);
    },
  });

  const removeFavorite = useMutation({
    mutationFn: async (cityId: string) => {
      const currentFavorites = favoritesQuery.data || [];
      const newFavorites = currentFavorites.filter((city) => city.id !== cityId);
      window.localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["favorites"], data);
    },
  });

  return {
    favorites: favoritesQuery.data || [],
    addFavorite,
    removeFavorite,
    isFavorite: (lat: number, lon: number) => {
      return (favoritesQuery.data || []).some((city) => city.lat === lat && city.lon === lon);
    },
  };
}
