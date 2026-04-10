import { motion } from "motion/react";
import { ImageWithFallback } from "./ImageWithFallback";

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1738631476299-5affb429854c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
          alt="Beautiful custom cakes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
      </div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
      >
        <motion.h1
          className="text-6xl md:text-8xl mb-6 tracking-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Sweet Moments
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Handcrafted cakes, curated hampers, and personalized gifts for every celebration
        </motion.p>
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          onClick={() => document.getElementById('cakes')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-accent text-accent-foreground px-8 py-4 rounded-full hover:bg-accent/90 transition-colors"
        >
          Explore Collections
        </motion.button>
      </motion.div>
    </section>
  );
}
