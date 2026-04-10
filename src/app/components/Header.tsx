import { motion } from "motion/react";
import { Heart } from "lucide-react";

export function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <Heart className="w-6 h-6 text-accent fill-accent" />
          <span className="text-xl tracking-tight">Sweet Moments</span>
        </button>

        <nav className="flex items-center gap-8">
          <button
            onClick={() => scrollToSection('cakes')}
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            Cakes
          </button>
          <button
            onClick={() => scrollToSection('hampers')}
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            Hampers
          </button>
          <button
            onClick={() => scrollToSection('gifts')}
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            Gifts
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
