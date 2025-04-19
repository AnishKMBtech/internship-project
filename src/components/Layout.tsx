
import { ReactNode } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import ChatBot from "./ChatBot";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen relative overflow-hidden py-8">
      {/* Theme toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 z-50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 animate-gradient bg-[length:400%_400%] transition-colors duration-300"
        style={{
          backgroundImage: "linear-gradient(225deg, var(--gradient-start) 0%, var(--gradient-middle) 48%, var(--gradient-end) 100%)",
        }}
      />
      
      {/* Content container */}
      <div className="relative w-full md:w-[80%] h-[90vh] mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-2xl rounded-xl overflow-auto">
        {children}
      </div>

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
};

export default Layout;
