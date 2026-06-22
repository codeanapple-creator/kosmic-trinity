import { useState } from "react";
import { MotionSection } from "@/components/ui/motion-section";
import { Star } from "lucide-react";
import CheckoutModal, { type CheckoutItem } from "@/components/ui/checkout-modal";

const SERVICES: Array<{
  id: string;
  name: string;
  path: string;
  description: string;
  amountPaise: number;
  currency: string;
}> = [
  {
    id: "samriddhi",
    name: "Samriddhi Session",
    path: "Artha",
    description: "Wealth astrology reading — career, abundance blocks, business timing and financial direction.",
    amountPaise: 850000,
    currency: "INR",
  },
  {
    id: "sarthak",
    name: "SARTHAK PDF Report",
    path: "Artha",
    description: "Comprehensive written birth chart analysis delivered as a detailed PDF within 5–7 days.",
    amountPaise: 250000,
    currency: "INR",
  },
  {
    id: "power-of-pentacles",
    name: "Power of Pentacles",
    path: "Artha",
    description: "Tarot & oracle session focused on practical prosperity — money mindset, career clarity, and next steps.",
    amountPaise: 350000,
    currency: "INR",
  },
  {
    id: "shree-by-shruti",
    name: "SHREE by Shruti",
    path: "Artha",
    description: "Financial planning session with CA Shruti Gupta — tax, investments, and wealth strategy aligned with your astrology.",
    amountPaise: 250000,
    currency: "INR",
  },
  {
    id: "sayujya-couples",
    name: "Sayujya Session — Couples",
    path: "Kaam",
    description: "Two-chart compatibility reading — relational dynamics, love language, karmic bonds. 60-minute Zoom.",
    amountPaise: 1600000,
    currency: "INR",
  },
  {
    id: "sayujya-individual",
    name: "Sayujya Session — Individual",
    path: "Kaam",
    description: "Your relationship astrology — love patterns, attachment, and soul's approach to intimacy. 60-minute Zoom.",
    amountPaise: 850000,
    currency: "INR",
  },
  {
    id: "sayujya-tarot",
    name: "Sayujya Tarot Reading",
    path: "Kaam",
    description: "Tarot & oracle focus on relationships — current dynamics, hidden patterns, and next steps. 30-minute Zoom.",
    amountPaise: 350000,
    currency: "INR",
  },
  {
    id: "santati",
    name: "Santati Session",
    path: "Kaam",
    description: "Child's birth chart reading — creative potential, talents, challenges, aligned activities. For children up to age 10.",
    amountPaise: 850000,
    currency: "INR",
  },
  {
    id: "karmic-blueprint",
    name: "Karmic Blueprint Reading",
    path: "Dharma",
    description: "Natal chart through an evolutionary lens — karmic loops, North/South Nodes, past life echoes.",
    amountPaise: 850000,
    currency: "INR",
  },
  {
    id: "soul-print",
    name: "Soul Print Reading",
    path: "Dharma",
    description: "Tarot archetypes combined with your astrological signature — symbolic mapping of your soul's language.",
    amountPaise: 850000,
    currency: "INR",
  },
  {
    id: "transits",
    name: "Current Transits & Life Direction",
    path: "Dharma",
    description: "Progressions, solar returns, and timing cycles — navigate transitions with grace.",
    amountPaise: 850000,
    currency: "INR",
  },
];

function formatPrice(paise: number, currency: string) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export default function Booking() {
  const [checkoutItem, setCheckoutItem] = useState<CheckoutItem | null>(null);

  const paths = [...new Set(SERVICES.map((s) => s.path))];

  return (
    <div className="w-full pt-32 pb-24 relative min-h-screen">
      <div className="star-bg" />
      <div className="container mx-auto px-4 max-w-5xl">
        <MotionSection className="text-center mb-12">
          <span className="text-primary font-serif text-lg mb-2 block uppercase tracking-widest">Sacred Booking</span>
          <h1 className="text-4xl md:text-5xl font-serif gold-gradient-text mb-4">Choose Your Session</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Select a service and pay securely via UPI, NetBanking, or international card. A confirmation and calendar booking link will be sent to your email.
          </p>
        </MotionSection>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-12" />

        <div className="space-y-12">
          {paths.map((path) => (
            <div key={path}>
              <h2 className="font-serif text-xl gold-gradient-text mb-6 flex items-center gap-3">
                <Star size={14} className="text-primary" />
                {path}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SERVICES.filter((s) => s.path === path).map((service) => (
                  <button
                    key={service.id}
                    onClick={() =>
                      setCheckoutItem({
                        name: service.name,
                        type: "service",
                        amountPaise: service.amountPaise,
                        currency: service.currency,
                      })
                    }
                    className="text-left p-6 border border-border bg-card/30 backdrop-blur rounded hover:border-primary/50 hover:bg-card/50 transition-all glow-hover group"
                  >
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{service.path}</p>
                    <h3 className="font-serif text-base text-foreground mb-2 group-hover:text-primary transition-colors">{service.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                    <span className="text-primary font-serif text-lg">{formatPrice(service.amountPaise, service.currency)}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {checkoutItem && (
        <CheckoutModal item={checkoutItem} onClose={() => setCheckoutItem(null)} />
      )}
    </div>
  );
}
