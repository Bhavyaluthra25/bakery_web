import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-accent fill-accent" />
              <span className="text-lg tracking-tight">Sweet Moments</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Creating beautiful memories, one sweet treat at a time.
            </p>
          </div>

          <div>
            <h4 className="mb-4">Collections</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Custom Cakes</li>
              <li>Celebration Hampers</li>
              <li>Personalized Gifts</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>hello@sweetmoments.com</li>
              <li>+44 20 1234 5678</li>
              <li>London, UK</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-muted-foreground pt-8 border-t border-border">
          <p>© 2026 Sweet Moments. Made with love.</p>
        </div>
      </div>
    </footer>
  );
}
