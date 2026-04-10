import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { Footer } from './components/Footer';
import { CustomizeModal } from './components/CustomizeModal';

export default function App() {
  const [customizeModalOpen, setCustomizeModalOpen] = useState(false);
  const [selectedCake, setSelectedCake] = useState('');

  const handleCustomize = (cakeName: string) => {
    setSelectedCake(cakeName);
    setCustomizeModalOpen(true);
  };

  const cakes = [
    {
      name: 'Chocolate Elegance',
      description: 'Rich dark chocolate layers with velvet frosting',
      price: 'From ₹999',
      image: 'https://images.unsplash.com/photo-1594403759538-5141d2cc452a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      customizable: true
    },
    {
      name: 'Vanilla Dream',
      description: 'Classic vanilla sponge with buttercream',
      price: 'From ₹899',
      image: 'https://images.unsplash.com/photo-1557776959-f066eb37857f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      customizable: true
    },
    {
      name: 'Red Velvet',
      description: 'Smooth cream cheese frosting on red velvet',
      price: 'From ₹1199',
      image: 'https://images.unsplash.com/photo-1604413191066-4dd20bedf486?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      customizable: true
    },
    {
      name: 'Strawberry Delight',
      description: 'Fresh strawberries and light cream',
      price: 'From ₹1099',
      image: 'https://images.unsplash.com/photo-1726828952313-385d63df2514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      customizable: true
    },
    {
      name: 'Lemon Citrus',
      description: 'Fresh lemon zest with tangy glaze',
      price: 'From ₹949',
      image: 'https://images.unsplash.com/photo-1552958492-9cb8e9446673?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      customizable: true
    },
    {
      name: 'Caramel Delight',
      description: 'Salted caramel buttercream perfection',
      price: 'From ₹1049',
      image: 'https://images.unsplash.com/photo-1658413381696-e75f942aa3d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      customizable: true
    },
    {
      name: 'Raspberry Rose',
      description: 'Delicate rose water with fresh raspberries',
      price: 'From ₹1299',
      image: 'https://images.unsplash.com/photo-1670225078962-0c3490641003?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      customizable: true
    },
    {
      name: 'Pistachio Bliss',
      description: 'Ground pistachios with white chocolate',
      price: 'From ₹1399',
      image: 'https://images.unsplash.com/photo-1701944578045-dc3f7fd28335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      customizable: true
    },
    {
      name: 'Matcha Green Tea',
      description: 'Japanese matcha with honey glaze',
      price: 'From ₹1199',
      image: 'https://images.unsplash.com/photo-1672504015204-07372bd02933?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      customizable: true
    },
    {
      name: 'Tiramisu Supreme',
      description: 'Coffee-soaked layers with mascarpone',
      price: 'From ₹1499',
      image: 'https://images.unsplash.com/photo-1671721100511-4cb82346d66a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      customizable: true
    }
  ];

  const hampers = [
    {
      name: 'Birthday Celebration',
      description: 'Balloons, cupcakes, and party treats',
      price: '₹1599',
      image: 'https://images.unsplash.com/photo-1583875762487-5f8f7c718d14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    },
    {
      name: 'Anniversary Bliss',
      description: 'Champagne truffles, rose petals, and balloons',
      price: '₹2199',
      image: 'https://images.unsplash.com/photo-1644890916891-5a595c8c098f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    },
    {
      name: 'Sweet Surprise',
      description: 'Assorted pastries with celebration balloons',
      price: '₹1299',
      image: 'https://images.unsplash.com/photo-1644890916875-65f1254ef092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    }
  ];

  const gifts = [
    {
      name: 'Custom Printed T-Shirt',
      description: 'Personalized design of your choice',
      price: '₹599',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    },
    {
      name: 'Personalized Mug',
      description: 'Custom printed coffee cup with your message',
      price: '₹299',
      image: 'https://images.unsplash.com/photo-1668697753062-8a2a5a09d8d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    },
    {
      name: 'Custom Cushion',
      description: 'Soft cushion with your photo or text',
      price: '₹499',
      image: 'https://images.unsplash.com/photo-1629949009710-2df14c41a72e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />

      <main>
        <section id="cakes" className="max-w-7xl mx-auto px-6 py-32">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">Custom Cakes</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Choose your favorite flavor and size. Each cake is handcrafted with love and premium ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cakes.map((cake, index) => (
              <ProductCard
                key={cake.name}
                {...cake}
                index={index}
                onCustomize={() => handleCustomize(cake.name)}
              />
            ))}
          </div>
        </section>

        <section id="hampers" className="max-w-7xl mx-auto px-6 py-32 border-t border-border">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">Celebration Hampers</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Perfect for birthdays and anniversaries. Each hamper includes festive balloons and sweet treats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hampers.map((hamper, index) => (
              <ProductCard key={hamper.name} {...hamper} index={index} />
            ))}
          </div>
        </section>

        <section id="gifts" className="max-w-7xl mx-auto px-6 py-32 border-t border-border">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">Personalized Gifts</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Custom printed t-shirts, mugs, and cushions. Add your personal touch to every gift.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gifts.map((gift, index) => (
              <ProductCard key={gift.name} {...gift} index={index} />
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <CustomizeModal
        isOpen={customizeModalOpen}
        onClose={() => setCustomizeModalOpen(false)}
        cakeName={selectedCake}
      />
    </div>
  );
}