import { Link } from "react-router-dom";
import { useTheme } from "@/context/theme-provider.tsx";
import { Moon, Sun } from "lucide-react";

function Header() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"}>
          <img
            src={isDark ? "/logo.png" : "/logo2.png"}
            alt="klimate logo"
            className="h-14"
          />
        </Link>
        <div>
          {/*  Search */}
          {/*  Theme toggle*/}
          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`cursor-pointer flex items-center transition-transform duration-500 ${isDark ? "rotate-180" : "rotate-0"}`}
          >
            {isDark ? (
              <Sun className="size-5 text-yellow-500 rotate-0 transition-all" />
            ) : (
              <Moon className="size-5 text-blue-500 rotate-0 transition-all" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;