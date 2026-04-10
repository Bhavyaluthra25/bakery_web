import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useState } from "react";

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  cakeName: string;
}

export function CustomizeModal({ isOpen, onClose, cakeName }: CustomizeModalProps) {
  const [selectedFlavor, setSelectedFlavor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const flavors = [
    { name: "Chocolate Fudge", description: "Rich dark chocolate with ganache" },
    { name: "Vanilla Bean", description: "Classic Madagascar vanilla" },
    { name: "Red Velvet", description: "Cocoa with cream cheese frosting" },
    { name: "Lemon Citrus", description: "Fresh lemon zest and glaze" },
    { name: "Strawberry Dream", description: "Fresh strawberries and cream" },
    { name: "Caramel Delight", description: "Salted caramel buttercream" },
    { name: "Raspberry Rose", description: "Rose water with fresh raspberries" },
    { name: "Pistachio Bliss", description: "Ground pistachios and white chocolate" },
    { name: "Matcha Green Tea", description: "Japanese matcha with honey" },
    { name: "Tiramisu Supreme", description: "Coffee-soaked with mascarpone" }
  ];

  const sizes = [
    { name: "6-inch", serves: "6-8 people", price: "₹899" },
    { name: "8-inch", serves: "12-15 people", price: "₹1399" },
    { name: "10-inch", serves: "20-25 people", price: "₹1899" },
    { name: "12-inch", serves: "30-35 people", price: "₹2699" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-50 bg-background rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="relative max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-background/95 backdrop-blur-lg border-b border-border p-6 flex items-center justify-between">
                <h2 className="text-2xl">Customize Your {cakeName}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-8">
                <div>
                  <h3 className="text-xl mb-4">Choose Your Flavor</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {flavors.map((flavor) => (
                      <button
                        key={flavor.name}
                        onClick={() => setSelectedFlavor(flavor.name)}
                        className={`p-4 rounded-xl text-left transition-all border-2 ${
                          selectedFlavor === flavor.name
                            ? 'border-accent bg-accent/10'
                            : 'border-border hover:border-accent/50'
                        }`}
                      >
                        <div className="tracking-tight mb-1">{flavor.name}</div>
                        <div className="text-sm text-muted-foreground">{flavor.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl mb-4">Select Size</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size.name}
                        onClick={() => setSelectedSize(size.name)}
                        className={`p-4 rounded-xl text-left transition-all border-2 ${
                          selectedSize === size.name
                            ? 'border-accent bg-accent/10'
                            : 'border-border hover:border-accent/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="tracking-tight">{size.name}</span>
                          <span className="text-accent">{size.price}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{size.serves}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  disabled={!selectedFlavor || !selectedSize}
                  className="w-full bg-accent text-accent-foreground py-4 rounded-full hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Order
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
