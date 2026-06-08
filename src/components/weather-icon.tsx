import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudLightning,
  Snowflake,
  CloudFog,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WeatherIconProps {
  iconCode: string;
  className?: string;
  size?: number;
}

export default function WeatherIcon({ iconCode, className, size = 24 }: WeatherIconProps) {
  // Normalize iconCode (e.g., "01d", "01n", "10d")
  const code = iconCode?.replace(/[^0-9a-z]/gi, "") || "01d";

  // Clean, custom color classes for weather icons
  const iconColorClass = cn(
    "stroke-[2.2]",
    code.endsWith("d") 
      ? "text-amber-500 dark:text-amber-400" // Day/Sun colors
      : "text-indigo-400 dark:text-indigo-300" // Night/Moon colors
  );

  // Helper container to scale
  const style = { width: size, height: size };

  switch (code) {
    // Clear Sky
    case "01d":
      return (
        <motion.div
          style={style}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className={cn("flex items-center justify-center", className)}
        >
          <Sun className={cn(iconColorClass, "text-amber-500 dark:text-yellow-400")} size={size} />
        </motion.div>
      );
    case "01n":
      return (
        <motion.div
          style={style}
          animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.03, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className={cn("flex items-center justify-center", className)}
        >
          <Moon className={cn(iconColorClass, "text-slate-400 dark:text-indigo-300 fill-slate-400/10 dark:fill-indigo-300/10")} size={size} />
        </motion.div>
      );

    // Few Clouds
    case "02d":
      return (
        <div style={style} className={cn("relative flex items-center justify-center", className)}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
            className="absolute -top-[12%] -left-[12%]"
          >
            <Sun className="text-amber-500 dark:text-yellow-400 stroke-[2.2]" size={size * 0.7} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -1.5, 1.5, 0], x: [0, 0.5, -0.5, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute z-10"
          >
            <Cloud className="text-slate-400 dark:text-slate-300 stroke-[2.2] fill-slate-100/40 dark:fill-slate-800/40" size={size} />
          </motion.div>
        </div>
      );
    case "02n":
      return (
        <div style={style} className={cn("relative flex items-center justify-center", className)}>
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute -top-[10%] -left-[10%]"
          >
            <Moon className="text-indigo-400 dark:text-indigo-300 stroke-[2.2] fill-indigo-400/5" size={size * 0.7} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -1.5, 1.5, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute z-10"
          >
            <Cloud className="text-slate-400 dark:text-slate-300 stroke-[2.2] fill-slate-100/40 dark:fill-slate-800/40" size={size} />
          </motion.div>
        </div>
      );

    // Scattered Clouds
    case "03d":
    case "03n":
      return (
        <motion.div
          style={style}
          animate={{ y: [0, -2, 2, 0] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
          className={cn("flex items-center justify-center", className)}
        >
          <Cloud className="text-slate-400 dark:text-slate-300 stroke-[2.2] fill-slate-100/20 dark:fill-slate-800/20" size={size} />
        </motion.div>
      );

    // Broken / Overcast Clouds
    case "04d":
    case "04n":
      return (
        <div style={style} className={cn("relative flex items-center justify-center", className)}>
          <motion.div
            animate={{ y: [0, -1, 1, 0], x: [0, -1, 1, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            className="absolute -top-[5%] -left-[5%] opacity-70"
          >
            <Cloud className="text-slate-500 dark:text-slate-400 stroke-[2.2] fill-slate-500/10" size={size * 0.85} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -2, 2, 0], x: [0, 1, -1, 0] }}
            transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
            className="absolute z-10 -bottom-[5%] -right-[5%]"
          >
            <Cloud className="text-slate-400 dark:text-slate-300 stroke-[2.2] fill-slate-200/40 dark:fill-slate-700/40" size={size * 0.9} />
          </motion.div>
        </div>
      );

    // Shower Rain / Drizzle
    case "09d":
    case "09n":
      return (
        <div style={style} className={cn("relative flex items-center justify-center", className)}>
          <motion.div
            animate={{ y: [0, -1.5, 1.5, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <CloudDrizzle className="text-blue-500 dark:text-blue-400 stroke-[2.2] fill-blue-500/5" size={size} />
          </motion.div>
          {/* Animated Falling Drops */}
          <div className="absolute inset-0 top-[65%] flex justify-around px-1 overflow-hidden pointer-events-none">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 8, opacity: [0, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  delay: i * 0.4,
                  ease: "linear",
                }}
                className="w-0.5 h-1.5 bg-blue-400 dark:bg-blue-300 rounded-full"
              />
            ))}
          </div>
        </div>
      );

    // Rain
    case "10d":
    case "10n":
      return (
        <div style={style} className={cn("relative flex items-center justify-center", className)}>
          <motion.div
            animate={{ y: [0, -2, 2, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
          >
            <CloudRain className="text-blue-600 dark:text-sky-400 stroke-[2.2] fill-blue-600/5" size={size} />
          </motion.div>
          {/* Animated Heavy Rain Drops */}
          <div className="absolute inset-0 top-[60%] flex justify-around px-0.5 overflow-hidden pointer-events-none">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 12, opacity: [0, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.9,
                  delay: i * 0.22,
                  ease: "linear",
                }}
                className="w-0.5 h-2 bg-blue-500 dark:bg-sky-400 rounded-full rotate-[12deg]"
              />
            ))}
          </div>
        </div>
      );

    // Thunderstorm
    case "11d":
    case "11n":
      return (
        <div style={style} className={cn("relative flex items-center justify-center", className)}>
          <motion.div
            animate={{ y: [0, -1.5, 1.5, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <CloudLightning className="text-violet-600 dark:text-violet-400 stroke-[2.2] fill-violet-600/5" size={size} />
          </motion.div>
          {/* Lightning flash overlay */}
          <motion.div
            animate={{ opacity: [0, 1, 0, 0.8, 0, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              repeatDelay: 2,
              ease: "linear",
            }}
            className="absolute inset-0 bg-violet-400/10 dark:bg-violet-400/5 rounded-full filter blur-md pointer-events-none"
          />
        </div>
      );

    // Snow
    case "13d":
    case "13n":
      return (
        <motion.div
          style={style}
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{
            rotate: { repeat: Infinity, duration: 15, ease: "linear" },
            scale: { repeat: Infinity, duration: 3, ease: "easeInOut" }
          }}
          className={cn("flex items-center justify-center", className)}
        >
          <Snowflake className="text-cyan-500 dark:text-cyan-300 stroke-[2.2]" size={size} />
        </motion.div>
      );

    // Atmosphere / Mist / Fog / Haze
    case "50d":
    case "50n":
      return (
        <div style={style} className={cn("relative flex items-center justify-center", className)}>
          <motion.div
            animate={{ y: [0, -2, 2, 0] }}
            transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
          >
            <CloudFog className="text-teal-600 dark:text-teal-400 stroke-[2.2] fill-teal-600/5" size={size} />
          </motion.div>
          {/* Drifting wind lines */}
          <div className="absolute inset-x-0 bottom-1 flex flex-col gap-1 pointer-events-none">
            <motion.div
              animate={{ x: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="h-[1.5px] w-[60%] mx-auto bg-teal-400/60 rounded-full"
            />
            <motion.div
              animate={{ x: [8, -8, 8] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="h-[1.5px] w-[40%] mx-auto bg-teal-400/40 rounded-full"
            />
          </div>
        </div>
      );

    default:
      return (
        <motion.div
          style={style}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className={cn("flex items-center justify-center", className)}
        >
          <Sun className={cn(iconColorClass)} size={size} />
        </motion.div>
      );
  }
}
