import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Sun, Cloud } from "lucide-react";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <motion.div 
        animate={{ y: [0, -2, 2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-8.5 h-8.5 flex items-center justify-center bg-primary/5 rounded-xl border border-border/50 shadow-sm overflow-hidden"
      >
        {/* Elegant mini icon set */}
        <Sun className="h-4.5 w-4.5 text-amber-500 dark:text-amber-400 absolute top-1.5 left-1.5 animate-spin" style={{ animationDuration: "35s" }} />
        <Cloud className="h-4 w-4 text-sky-500 dark:text-sky-400 fill-sky-500/10 dark:fill-sky-400/10 absolute bottom-1.5 right-1.5 stroke-[2.2]" />
      </motion.div>
      <span className="text-lg font-black tracking-tight text-foreground leading-none">
        Weather<span className="text-blue-500 dark:text-sky-400">App</span>
      </span>
    </div>
  );
}

