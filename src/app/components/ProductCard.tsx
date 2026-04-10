import { motion } from "motion/react";
import { ImageWithFallback } from "./ImageWithFallback";

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
  index: number;
  customizable?: boolean;
  onCustomize?: () => void;
}

export function ProductCard({ name, description, price, image, index, customizable, onCustomize }: ProductCardProps) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {customizable && (
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            onClick={onCustomize}
            className="absolute bottom-4 left-4 right-4 bg-accent text-accent-foreground py-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            Customize
          </motion.button>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-xl tracking-tight">{name}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
        <p className="text-lg text-accent">{price}</p>
      </div>
    </motion.div>
  );
}
