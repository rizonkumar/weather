import type { PropsWithChildren } from "react";
import Header from "@/components/header.tsx";
import { motion } from "framer-motion";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-background min-h-screen flex flex-col text-foreground font-sans antialiased">
      <Header />
      <motion.main 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex-grow container mx-auto px-4 py-8 max-w-7xl"
      >
        {children}
      </motion.main>
      <footer className="border-t bg-card py-6 mt-auto border-border">
        <div className="container mx-auto px-4 text-center text-xs sm:text-sm text-muted-foreground font-medium">
          <p>Made with ❤️ by Rizon Kumar Rahi</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
