import React, { useState } from "react";
import { MotionSection } from "@/components/ui/motion-section";
import { ArrowRight, ShoppingBag } from "lucide-react";
import CheckoutModal, { type CheckoutItem } from "@/components/ui/checkout-modal";

import ganeshPlate from "@assets/20250903_084431_1779269733076.jpg";
import ganeshDetail from "@assets/20250903_084417_1779269733047.jpg";
import peacockDiya from "@assets/20250924_071513_1779269733077.jpg";
import wallPanelSet from "@assets/20251010_083707_1779269733078.jpg";
import wallPanelSingle from "@assets/20251010_083736_1779269733080.jpg";
import quoteCalendar from "@assets/IMG-20240813-WA0008_1779269733081.jpg";
import omMandala from "@assets/IMG-20251014-WA0009_1779269733082.jpg";

const WHATSAPP = "https://wa.me/message/kosmictrinity";

const products: Array<{
  id: number;
  name: string;
  type: string;
  amountPaise: number;
  images: string[];
  tag: string;
  description: string;
}> = [
  {
    id: 1,
    name: "Ganesha Mandala Plate",
    type: "Handpainted · Folk Art",
    amountPaise: 250000,
    images: [ganeshPlate, ganeshDetail],
    tag: "Wall Décor",
    description:
      "A hand-painted Ganesha on a round wooden plate, bordered with vibrant folk-art motifs and shisha mirror work. Each piece is one-of-a-kind, made with acrylic colours and finished with a protective coat.",
  },
  {
    id: 2,
    name: "Peacock Diya Set",
    type: "Handpainted · Set of 2",
    amountPaise: 200000,
    images: [peacockDiya],
    tag: "Festive · Tealight Holders",
    description:
      "A pair of hand-painted peacock-shaped tealight holders in deep indigo with feather detailing. Each peacock holds six pink tealight cups — perfect for pooja corners, gifting, and festive décor.",
  },
  {
    id: 3,
    name: "Floral Folk Wall Panel — Set of 2",
    type: "Handpainted · Mirror Work",
    amountPaise: 250000,
    images: [wallPanelSet],
    tag: "Wall Décor · Set",
    description:
      "A matching set of two oval-scalloped yellow wall panels with hand-sculpted 3D folk floral motifs, mirror-work inlay, and gold bead borders. Inspired by Rajasthani folk art — brilliant alone, stunning as a pair.",
  },
  {
    id: 4,
    name: "Floral Folk Wall Panel — Single",
    type: "Handpainted · Mirror Work",
    amountPaise: 150000,
    images: [wallPanelSingle],
    tag: "Wall Décor",
    description:
      "A single large oval wall panel in warm saffron yellow with a hand-sculpted floral centrepiece, shisha mirrors, and gold bead trim. A statement piece for entryways, puja rooms, or living spaces.",
  },
  {
    id: 5,
    name: "Quote Desk Calendar",
    type: "Illustrated · Stationery",
    amountPaise: 100000,
    images: [quoteCalendar],
    tag: "Gift · Stationery",
    description:
      "A spiral-bound desk calendar featuring original watercolour illustrations and handwritten soul quotes — one for every month. A thoughtful gift for anyone on a growth journey.",
  },
  {
    id: 6,
    name: "OM Mandala Wall Sculpture",
    type: "Handpainted · Large Format",
    amountPaise: 300000,
    images: [omMandala],
    tag: "Statement Piece",
    description:
      "A large semicircular OM mandala wall installation with lotus petals, mirror medallions, and layered folk motifs in teal, fuchsia, and saffron. Designed to anchor a prayer wall, meditation corner, or living room.",
  },
];

function formatPrice(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

function ProductCard({
  product,
  delay,
  onBuy,
}: {
  product: (typeof products)[0];
  delay: number;
  onBuy: (item: CheckoutItem) => void;
}) {
  const [hovered, setHovered] = React.useState(false);
  const showSecond = hovered && product.images.length > 1;

  return (
    <MotionSection delay={delay}>
      <div
        className="bg-card border border-border rounded overflow-hidden group hover:border-primary/50 transition-colors h-full flex flex-col"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="aspect-square bg-secondary/50 relative overflow-hidden">
          <img
            src={showSecond ? product.images[1] : product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
          />
          <span className="absolute top-3 left-3 px-2 py-1 bg-background/80 backdrop-blur text-[10px] uppercase tracking-widest text-primary rounded border border-primary/20">
            {product.tag}
          </span>
          <div className="absolute inset-0 bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
            <button
              onClick={() =>
                onBuy({ name: product.name, type: "product", amountPaise: product.amountPaise, currency: "INR" })
              }
              className="px-5 py-2.5 bg-primary text-primary-foreground font-serif tracking-widest text-sm uppercase rounded shadow-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <ShoppingBag size={14} /> Buy Now
            </button>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] uppercase tracking-widest text-primary">{product.type}</span>
            <span className="font-serif text-lg text-foreground">{formatPrice(product.amountPaise)}</span>
          </div>
          <h3 className="text-xl font-serif mb-3 text-foreground group-hover:text-primary transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground font-light leading-relaxed flex-grow">{product.description}</p>
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() =>
                onBuy({ name: product.name, type: "product", amountPaise: product.amountPaise, currency: "INR" })
              }
              className="flex-1 py-2 bg-primary text-primary-foreground font-serif tracking-wider uppercase text-xs rounded hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag size={12} /> Buy Now
            </button>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 border border-primary/40 text-primary font-serif tracking-wider uppercase text-xs rounded hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
            >
              Enquire <ArrowRight size={10} />
            </a>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

export default function Storefront() {
  const [checkoutItem, setCheckoutItem] = useState<CheckoutItem | null>(null);

  return (
    <div className="w-full pt-32 pb-24 relative min-h-screen">
      <div className="star-bg" />

      <div className="container mx-auto px-4 max-w-6xl">
        <MotionSection className="text-center mb-6">
          <span className="text-primary font-serif text-xl mb-2 block">The Soul Store</span>
          <h1 className="text-4xl md:text-6xl font-serif gold-gradient-text mb-4">Storefront</h1>
          <p className="text-muted-foreground uppercase tracking-widest text-sm max-w-xl mx-auto">
            Soulful Artworks · Folk Décor · Stationery · Handcrafted Gifts
          </p>
        </MotionSection>

        <MotionSection delay={0.1} className="text-center mb-14">
          <p className="text-muted-foreground font-light max-w-xl mx-auto text-base leading-relaxed">
            Every piece in the Soul Store is handcrafted by{" "}
            <span className="text-foreground italic">@splash_your_soul</span> — painted with intention,
            designed to bring beauty, warmth, and sacred energy into your home.
          </p>
        </MotionSection>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-14" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} delay={idx * 0.08} onBuy={setCheckoutItem} />
          ))}
        </div>

        <MotionSection delay={0.5} className="mt-16 text-center">
          <div className="border border-primary/20 bg-card/20 rounded p-8 max-w-lg mx-auto backdrop-blur">
            <p className="text-primary font-serif text-lg mb-2">Custom Orders Welcome</p>
            <p className="text-muted-foreground text-sm font-light mb-6 leading-relaxed">
              Looking for personalised poetry gifts, custom artwork, or a bespoke décor piece? Reach out on WhatsApp — every order is a conversation.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-serif tracking-wider uppercase text-xs rounded hover:bg-primary/90 transition-colors"
            >
              Chat with us <ArrowRight size={12} />
            </a>
          </div>
        </MotionSection>
      </div>

      {checkoutItem && (
        <CheckoutModal item={checkoutItem} onClose={() => setCheckoutItem(null)} />
      )}
    </div>
  );
}
