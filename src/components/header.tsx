import { Link } from "react-router-dom";
import { useTheme } from "@/context/theme-provider.tsx";
import { Moon, Sun } from "lucide-react";
import CitySearch from "./city-search";
import { Logo } from "./logo";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="container mx-auto flex h-14 md:h-16 items-center gap-2.5 sm:gap-4 px-3 sm:px-4 lg:px-8">
        <Link to="/" className="flex-shrink-0 transition-opacity hover:opacity-90">
          <Logo className="scale-90 sm:scale-100" />
        </Link>

        <div className="flex-1 min-w-0">
          <CitySearch />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="flex-shrink-0 rounded-xl p-2 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-transparent hover:border-border/30"
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0, scale: 0.75 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.75 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {isDark ? (
                <Sun className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-amber-500" />
              ) : (
                <Moon className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-indigo-500" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>
    </header>
  );
}

export default Header;

