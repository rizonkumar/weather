import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <motion.div 
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-8 h-8"
      >
        {/* Sun */}
        <div className="absolute inset-0 bg-yellow-500 dark:bg-yellow-400 rounded-full" />
        
        {/* Cloud */}
        <div className="absolute -right-1 bottom-0 w-6 h-3.5 bg-blue-400 dark:bg-blue-300 rounded-full" />
        <div className="absolute -right-2 bottom-1 w-6 h-3 bg-blue-400 dark:bg-blue-300 rounded-full" />
      </motion.div>
      <span className="text-xl font-extrabold tracking-tight text-foreground">
        Weather<span className="text-blue-600 dark:text-sky-400">App</span>
      </span>
    </div>
  );
}
