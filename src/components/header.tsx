import { Link } from "react-router-dom";
import { useTheme } from "@/context/theme-provider.tsx";
import { Moon, Sun } from "lucide-react";
import CitySearch from "./city-search";

function Header() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 md:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex-shrink-0">
          <img
            src={isDark ? "/logo.png" : "/logo2.png"}
            alt="klimate logo"
            className="h-10 md:h-14 w-auto"
          />
        </Link>

        <CitySearch />
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          {isDark ? (
            <Sun className="size-5 text-yellow-500 transition-all" />
          ) : (
            <Moon className="size-5 text-blue-500 transition-all" />
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
