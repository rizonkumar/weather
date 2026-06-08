import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;

      const parsed = JSON.parse(item);

      // Validate parsed value type against initialValue
      if (Array.isArray(initialValue)) {
        return Array.isArray(parsed) ? (parsed as unknown as T) : initialValue;
      }

      if (initialValue !== null && typeof initialValue === "object") {
        return parsed !== null && typeof parsed === "object"
          ? (parsed as T)
          : initialValue;
      }

      if (typeof initialValue !== typeof parsed) {
        return initialValue;
      }

      return parsed as T;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
