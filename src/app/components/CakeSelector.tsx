import { useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
interface CartItem {
  id: string;
  flavour: string;
  weight: string;
  grams: number;
  priceMin: number;
  priceMax: number;
  qty: number;
}

interface WeightDef {
  label: string;
  grams: number;
  serves: string;
}

interface Category {
  cat: string;
  key: string;
  flavours: string[];
}

// ── Data ─────────────────────────────────────────────────────────────────────
const WEIGHT_DEFS: WeightDef[] = [
  { label: "250g", grams: 250, serves: "2–3 serves" },
  { label: "500g", grams: 500, serves: "4–6 serves" },
  { label: "1 Kg",  grams: 1000, serves: "8–12 serves" },
];

const FLAVOUR_PRICES: Record<string, [number, number]> = {
  "Vanilla":               [500,  700],
  "Chocolate":             [500,  800],
  "Butterscotch":          [550,  800],
  "Strawberry":            [600,  900],
  "Pineapple":             [500,  700],
  "Black Forest":          [600,  900],
  "White Forest":          [600,  900],
  "Dark Chocolate":        [600, 1000],
  "Milk Chocolate":        [550,  900],
  "Chocolate Truffle":     [700, 1200],
  "Chocolate Fudge":       [800, 1300],
  "Chocolate Hazelnut":    [900, 1500],
  "Chocolate Oreo":        [800, 1400],
  "Chocolate Mint":        [750, 1200],
  "Mango":                 [700, 1200],
  "Blueberry":             [800, 1400],
  "Raspberry":             [900, 1500],
  "Mixed Fruit":           [700, 1200],
  "Kiwi":                  [800, 1300],
  "Orange":                [650, 1000],
  "Lychee":                [750, 1200],
  "Almond":                [900, 1400],
  "Cashew":                [850, 1350],
  "Pistachio (Pista)":     [1000,1600],
  "Walnut":                [900, 1450],
  "Hazelnut Praline":      [1100,1800],
  "Red Velvet":            [900, 1500],
  "Cheesecake Blueberry":  [1200,2500],
  "Cheesecake Strawberry": [1200,2500],
  "Cheesecake Mango":      [1200,2200],
  "Tiramisu":              [1200,2200],
  "Coffee Mocha":          [900, 1600],
  "Caramel Crunch":        [950, 1600],
  "Salted Caramel":        [1000,1700],
  "Oreo Cream":            [800, 1400],
  "KitKat Cake":           [900, 1600],
  "Ferrero Rocher":        [1200,2000],
  "Nutella Cake":          [1100,1800],
  "Biscoff (Lotus)":       [1200,2000],
  "Bubblegum":             [700, 1100],
  "Rasmalai":              [900, 1500],
  "Gulab Jamun":           [800, 1400],
  "Kesar Pista":           [900, 1600],
  "Coconut":               [600, 1000],
  "Jaggery (Gur)":         [700, 1100],
  "Matcha (Green Tea)":    [900, 1500],
  "Lavender":              [900, 1500],
  "Rose":                  [800, 1300],
  "Chai Spice":            [750, 1200],
  "Lemon Zest":            [700, 1100],
  "Peanut Butter":         [800, 1300],
};

const CATEGORIES: Category[] = [
  { cat: "Classic",               key: "classic",  flavours: ["Chocolate","Butterscotch","Strawberry","Pineapple","Black Forest","White Forest","Vanilla"] },
  { cat: "Chocolate-Based",       key: "choco",    flavours: ["Dark Chocolate","Milk Chocolate","Chocolate Truffle","Chocolate Fudge","Chocolate Hazelnut","Chocolate Oreo","Chocolate Mint"] },
  { cat: "Fruit",                 key: "fruit",    flavours: ["Mango","Blueberry","Raspberry","Mixed Fruit","Kiwi","Orange","Lychee"] },
  { cat: "Nut & Rich",            key: "nut",      flavours: ["Almond","Cashew","Pistachio (Pista)","Walnut","Hazelnut Praline"] },
  { cat: "Premium & Dessert",     key: "premium",  flavours: ["Red Velvet","Cheesecake Blueberry","Cheesecake Strawberry","Cheesecake Mango","Tiramisu","Coffee Mocha","Caramel Crunch","Salted Caramel"] },
  { cat: "Fusion & Trendy",       key: "fusion",   flavours: ["Oreo Cream","KitKat Cake","Ferrero Rocher","Nutella Cake","Biscoff (Lotus)","Bubblegum"] },
  { cat: "Indian-Inspired",       key: "indian",   flavours: ["Rasmalai","Gulab Jamun","Kesar Pista","Coconut","Jaggery (Gur)"] },
  { cat: "Unique & Experimental", key: "unique",   flavours: ["Matcha (Green Tea)","Lavender","Rose","Chai Spice","Lemon Zest","Peanut Butter"] },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function calcPrice(min1kg: number, max1kg: number, grams: number): [number, number] {
  const r = grams / 1000;
  return [Math.round(min1kg * r), Math.round(max1kg * r)];
}

function getTier(min: number): { label: string; color: string; bg: string } {
  if (min >= 1000) return { label: "Premium",   color: "#3C3489", bg: "#EEEDFE" };
  if (min >= 700)  return { label: "Mid-range", color: "#633806", bg: "#FAEEDA" };
  return               { label: "Classic",   color: "#0C447C", bg: "#E6F1FB" };
}

const CAT_COLORS: Record<string, { sel: string; text: string }> = {
  classic:  { sel: "#E6F1FB", text: "#0C447C" },
  choco:    { sel: "#FAECE7", text: "#4A1B0C" },
  fruit:    { sel: "#EAF3DE", text: "#27500A" },
  nut:      { sel: "#FAEEDA", text: "#633806" },
  premium:  { sel: "#EEEDFE", text: "#3C3489" },
  fusion:   { sel: "#FBEAF0", text: "#72243E" },
  indian:   { sel: "#E1F5EE", text: "#085041" },
  unique:   { sel: "#FFF3CD", text: "#412402" },
};

// ── Cart Drawer ───────────────────────────────────────────────────────────────
function CartDrawer({
  items,
  onClose,
  onQtyChange,
  onRemove,
}: {
  items: CartItem[];
  onClose: () => void;
  onQtyChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}) {
  const total = items.reduce((s, i) => s + i.priceMin * i.qty, 0);
  const totalMax = items.reduce((s, i) => s + i.priceMax * i.qty, 0);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex" }}>
      {/* backdrop */}
      <div
        onClick={onClose}
        style={{ flex: 1, background: "rgba(0,0,0,0.4)", cursor: "pointer" }}
      />
      {/* drawer */}
      <div style={{
        width: 360, background: "#fff", display: "flex", flexDirection: "column",
        boxShadow: "-4px 0 24px rgba(0,0,0,0.12)", fontFamily: "'DM Sans', sans-serif",
      }}>
        {/* header */}
        <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 18, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>Your Cart</p>
            <p style={{ fontSize: 13, color: "#888", margin: "2px 0 0" }}>{items.length} item{items.length !== 1 ? "s" : ""}</p>
          </div>
          <button onClick={onClose} style={{ border: "none", background: "#f5f5f5", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16, color: "#666" }}>✕</button>
        </div>

        {/* items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 0", color: "#aaa" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🎂</div>
              <p style={{ fontSize: 14 }}>Your cart is empty</p>
            </div>
          ) : (
            items.map(item => {
              const [mn, mx] = [item.priceMin, item.priceMax];
              return (
                <div key={item.id} style={{ padding: "14px 0", borderBottom: "1px solid #f5f5f5" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: "0 0 4px" }}>{item.flavour}</p>
                      <p style={{ fontSize: 12, color: "#888", margin: "0 0 10px" }}>{item.weight}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <button onClick={() => onQtyChange(item.id, item.qty - 1)}
                          style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid #e0e0e0", background: "#fff", cursor: "pointer", fontSize: 16, color: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                        <span style={{ fontSize: 14, fontWeight: 500, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                        <button onClick={() => onQtyChange(item.id, item.qty + 1)}
                          style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid #e0e0e0", background: "#fff", cursor: "pointer", fontSize: 16, color: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: "0 0 4px" }}>₹{mn * item.qty}</p>
                      <p style={{ fontSize: 11, color: "#aaa", margin: "0 0 8px" }}>– ₹{mx * item.qty}</p>
                      <button onClick={() => onRemove(item.id)}
                        style={{ fontSize: 11, color: "#e53e3e", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Remove</button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* footer */}
        {items.length > 0 && (
          <div style={{ padding: "16px 24px 24px", borderTop: "1px solid #f0f0f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: "#888" }}>Subtotal (approx.)</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>₹{total} – ₹{totalMax}</span>
            </div>
            <p style={{ fontSize: 11, color: "#bbb", marginBottom: 16 }}>Final price confirmed at checkout</p>
            <button style={{
              width: "100%", padding: "14px 0", background: "#1a1a1a", color: "#fff",
              border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer",
              letterSpacing: 0.3,
            }}>
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function CakeSelector() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedWeight, setSelectedWeight] = useState<number | null>(null);
  const [selectedFlavour, setSelectedFlavour] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);

  const filteredCats = CATEGORIES
    .filter(d => activeTab === "all" || d.key === activeTab)
    .map(d => ({
      ...d,
      flavours: d.flavours.filter(f => f.toLowerCase().includes(search.toLowerCase())),
    }))
    .filter(d => d.flavours.length > 0);

  const priceRange = selectedFlavour && selectedWeight !== null && FLAVOUR_PRICES[selectedFlavour]
    ? calcPrice(...FLAVOUR_PRICES[selectedFlavour], WEIGHT_DEFS[selectedWeight].grams)
    : null;

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  function addToCart() {
    if (!selectedFlavour || selectedWeight === null || !FLAVOUR_PRICES[selectedFlavour]) return;
    const w = WEIGHT_DEFS[selectedWeight];
    const [mn, mx] = calcPrice(...FLAVOUR_PRICES[selectedFlavour], w.grams);
    const id = `${selectedFlavour}__${w.label}`;
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id, flavour: selectedFlavour!, weight: w.label, grams: w.grams, priceMin: mn, priceMax: mx, qty: 1 }];
    });
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1600);
  }

  function updateQty(id: string, qty: number) {
    if (qty <= 0) setCart(prev => prev.filter(i => i.id !== id));
    else setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 860, margin: "0 auto", padding: "24px 16px", color: "#1a1a1a" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />

      {/* ── Page header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 4px", color: "#1a1a1a" }}>
            Build Your Cake
          </h1>
          <p style={{ fontSize: 14, color: "#888", margin: 0 }}>Choose your size, then pick a flavour</p>
        </div>
        {/* Cart button */}
        <button
          onClick={() => setCartOpen(true)}
          style={{
            position: "relative", display: "flex", alignItems: "center", gap: 8,
            padding: "10px 18px", background: "#1a1a1a", color: "#fff",
            border: "none", borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: "pointer",
          }}
        >
          🛒 Cart
          {cartCount > 0 && (
            <span style={{
              position: "absolute", top: -6, right: -6, background: "#e53e3e",
              color: "#fff", borderRadius: "50%", width: 20, height: 20,
              fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center",
            }}>{cartCount}</span>
          )}
        </button>
      </div>

      {/* ── Size cards ── */}
      <p style={{ fontSize: 12, fontWeight: 600, color: "#aaa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Step 1 — Choose size</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 28 }}>
        {WEIGHT_DEFS.map((w, i) => {
          const isSelected = selectedWeight === i;
          const priceLabel = selectedFlavour && FLAVOUR_PRICES[selectedFlavour]
            ? (() => { const [mn, mx] = calcPrice(...FLAVOUR_PRICES[selectedFlavour], w.grams); return `₹${mn} – ₹${mx}`; })()
            : `From ₹${Math.round(500 * w.grams / 1000)}`;
          return (
            <button
              key={w.label}
              onClick={() => setSelectedWeight(i)}
              style={{
                border: isSelected ? "2px solid #1a1a1a" : "1px solid #e8e8e8",
                borderRadius: 14, padding: "16px 12px", background: isSelected ? "#1a1a1a" : "#fff",
                cursor: "pointer", textAlign: "center", transition: "all 0.15s",
              }}
            >
              <span style={{ display: "block", fontSize: 20, fontWeight: 700, color: isSelected ? "#fff" : "#1a1a1a", marginBottom: 4 }}>{w.label}</span>
              <span style={{ display: "block", fontSize: 12, color: isSelected ? "rgba(255,255,255,0.6)" : "#aaa", marginBottom: 10 }}>{w.serves}</span>
              <span style={{ display: "block", fontSize: 13, fontWeight: 500, color: isSelected ? "#fff" : "#555" }}>{priceLabel}</span>
            </button>
          );
        })}
      </div>

      {/* ── Flavour picker ── */}
      <p style={{ fontSize: 12, fontWeight: 600, color: "#aaa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Step 2 — Pick a flavour</p>

      {/* Search */}
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search flavours..."
        style={{
          width: "100%", padding: "10px 16px", border: "1px solid #e8e8e8",
          borderRadius: 12, fontSize: 14, color: "#1a1a1a", background: "#fafafa",
          marginBottom: 14, outline: "none", boxSizing: "border-box",
        }}
      />

      {/* Category tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {["all", ...CATEGORIES.map(d => d.key)].map(key => {
          const label = key === "all" ? "All" : CATEGORIES.find(d => d.key === key)!.cat;
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                padding: "6px 14px", borderRadius: 999,
                border: isActive ? "none" : "1px solid #e8e8e8",
                background: isActive ? "#1a1a1a" : "#fff",
                color: isActive ? "#fff" : "#666",
                fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Flavour grid */}
      {filteredCats.length === 0 ? (
        <p style={{ color: "#aaa", fontSize: 14, padding: "16px 0" }}>No flavours found for "{search}"</p>
      ) : (
        filteredCats.map(d => {
          const colors = CAT_COLORS[d.key] || CAT_COLORS["classic"];
          return (
            <div key={d.key} style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#aaa", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>{d.cat}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {d.flavours.map(f => {
                  const prices = FLAVOUR_PRICES[f];
                  const isSelected = selectedFlavour === f;
                  const tier = prices ? getTier(prices[0]) : null;
                  return (
                    <button
                      key={f}
                      onClick={() => setSelectedFlavour(isSelected ? null : f)}
                      style={{
                        padding: "8px 14px", borderRadius: 999,
                        border: isSelected ? "none" : "1px solid #e8e8e8",
                        background: isSelected ? colors.sel : "#fff",
                        color: isSelected ? colors.text : "#333",
                        cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                        textAlign: "left", transition: "all 0.15s",
                      }}
                    >
                      <span style={{ display: "block", fontSize: 13, fontWeight: isSelected ? 600 : 400 }}>{f}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                        <span style={{ fontSize: 11, color: isSelected ? colors.text : "#aaa", opacity: 0.85 }}>
                          {prices ? `₹${prices[0]}–${prices[1]}/kg` : ""}
                        </span>
                        {tier && (
                          <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 999, background: tier.bg, color: tier.color, fontWeight: 500 }}>
                            {tier.label}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })
      )}

      {/* ── Add to cart bar ── */}
      <div style={{
        position: "sticky", bottom: 16, marginTop: 24,
        background: "#fff", borderRadius: 16, border: "1px solid #e8e8e8",
        padding: "16px 20px", display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: 16, flexWrap: "wrap",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}>
        <div>
          {selectedFlavour && selectedWeight !== null ? (
            <>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: "0 0 2px" }}>
                {selectedFlavour} · {WEIGHT_DEFS[selectedWeight].label}
              </p>
              <p style={{ fontSize: 13, color: "#888", margin: 0 }}>
                {priceRange ? `₹${priceRange[0]} – ₹${priceRange[1]} approx.` : ""}
              </p>
            </>
          ) : (
            <p style={{ fontSize: 14, color: "#aaa", margin: 0 }}>
              {!selectedWeight && selectedWeight !== 0 ? "Select a size and flavour to continue" : !selectedFlavour ? "Now pick a flavour" : ""}
            </p>
          )}
        </div>
        <button
          onClick={addToCart}
          disabled={!selectedFlavour || selectedWeight === null}
          style={{
            padding: "12px 28px", borderRadius: 12, border: "none",
            background: addedFlash ? "#22c55e" : (selectedFlavour && selectedWeight !== null ? "#1a1a1a" : "#e8e8e8"),
            color: selectedFlavour && selectedWeight !== null ? "#fff" : "#aaa",
            fontSize: 15, fontWeight: 600, cursor: selectedFlavour && selectedWeight !== null ? "pointer" : "not-allowed",
            transition: "background 0.2s", minWidth: 160, fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {addedFlash ? "✓ Added!" : "Add to Cart"}
        </button>
      </div>

      {/* ── Cart Drawer ── */}
      {cartOpen && (
        <CartDrawer
          items={cart}
          onClose={() => setCartOpen(false)}
          onQtyChange={updateQty}
          onRemove={id => setCart(prev => prev.filter(i => i.id !== id))}
        />
      )}
    </div>
  );
}
