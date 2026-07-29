import { useState } from "react";
import { MotionSection } from "@/components/ui/motion-section";
import { Star } from "lucide-react";
import CheckoutModal, { type CheckoutItem } from "@/components/ui/checkout-modal";

const SERVICES: Array<{
  id: string;
  name: string;
  tag: string;
  path: "Dharma" | "Artha" | "Kaam";
  subtitle: string;
  description: string;
  price: string;
  amountPaise: number;
  currency: string;
  pdfOnly?: boolean;
}> = [
  // ── Dharma ───────────────────────────────────────────────────────────────
  {
    id: "soul-calling-guidebook",
    name: "Soul Calling Guidebook",
    tag: "PDF · Digital",
    path: "Dharma",
    subtitle: "Astrology · Delivered via Email",
    description:
      "Decode the deeper intention behind your birth - your tendencies, gifts brought from past lives, and karmic tasks for this life. Based on your birth chart and intuitive mapping, this guidebook is crafted personally for you and delivered as a PDF over email.",
    price: "Rs. 3,333",
    amountPaise: 100,
    currency: "INR",
    pdfOnly: true,
  },
  {
    id: "swadharm-astrology",
    name: "Swadharm Session – Astrology-Based",
    tag: "60 Min · Zoom",
    path: "Dharma",
    subtitle: "Live Session · 1:1 · Deep Natal Chart",
    description:
      "Understand repeating patterns and unfinished cycles that shape your journey, and uncover the purpose your soul has uniquely chosen for this life. A discussion around your embedded patterns and how they are leading you toward the Dharm your soul has chosen.",
    price: "Rs. 8,500",
    amountPaise: 100,
    currency: "INR",
  },
  {
    id: "swadharm-intuitive",
    name: "Swadharm Session – Intuitive Reading",
    tag: "30 Min · Zoom",
    path: "Dharma",
    subtitle: "Live Session · 1:1 · Intuitive Consultation",
    description:
      "Understand repeating patterns and unfinished cycles that shape your journey, and uncover the purpose your soul has uniquely chosen for this life. An intuitive consultation exploring the Dharm your soul has chosen.",
    price: "Rs. 3,500",
    amountPaise: 100,
    currency: "INR",
  },
  {
    id: "soulfarm-season-reading",
    name: "Soulfarm Season Reading",
    tag: "Live 1:1 · Astrology",
    path: "Dharma",
    subtitle: "Transits · Solar Return · Timelines",
    description:
      "A live 1:1 Astrology based reading for checking transits, solar return themes, and understanding timelines - to check what to sow, reap and harvest in the current phase of your life. An invitation to align with your cosmic seasons consciously.",
    price: "Rs. 5,500",
    amountPaise: 100,
    currency: "INR",
  },
  // ── Artha ────────────────────────────────────────────────────────────────
  {
    id: "samriddhi",
    name: "Samriddhi Session",
    tag: "1:1 · Live Zoom",
    path: "Artha",
    subtitle: "60 Minutes · Astrology · Wealth & Career",
    description:
      "Identify what wealth means for your soul, the subconscious patterns influencing your financial flow, clarity on direction, decisions, and professional shifts - and work through energetic, psychological, and ancestral blocks around money.",
    price: "Rs. 8,500",
    amountPaise: 100,
    currency: "INR",
  },
  {
    id: "sarthak",
    name: "SARTHAK – A Book of Money Magic",
    tag: "PDF · Birth Chart",
    path: "Artha",
    subtitle: "Digital Reading · Self-Paced · Personalised",
    description:
      "Discover strengths you may not be fully utilising yet - your tangible talents, your money element, and ways to use them for monetary benefits. A PDF reading based on your birth chart, designed to reveal the unique cosmic blueprint behind your earning and holding capacity.",
    price: "Rs. 2,500",
    amountPaise: 100,
    currency: "INR",
    pdfOnly: true,
  },
  {
    id: "power-of-pentacles",
    name: "Power of Pentacles",
    tag: "Live · Oracle Guidance",
    path: "Artha",
    subtitle: "30 Minutes · No Question Limit · Financial Clarity",
    description:
      "Oracle Cards-based reading to uncover solutions for financial issues, fields to monetise, and to resolve blockages and patterns around money concerns. 30-minute live session - no limit on questions within the stipulated timeframe.",
    price: "Rs. 3,500",
    amountPaise: 100,
    currency: "INR",
  },
  {
    id: "shree-by-shruti",
    name: "SHREE by Shruti",
    tag: "With CA Shruti Gupta",
    path: "Artha",
    subtitle: "Financial Structure · Money as Energy · 30-Min Call",
    description:
      "CA Shruti Gupta brings clarity and structure to your financial world. This session goes beyond accounting - working with money as energy, helping you build systems that create ease, confidence, and sustainable growth. For homemakers, women entrepreneurs, and small business owners.",
    price: "Rs. 2,500",
    amountPaise: 100,
    currency: "INR",
  },
  // ── Kaam ─────────────────────────────────────────────────────────────────
  {
    id: "sayujya-couples",
    name: "Sayujya Session – Couples",
    tag: "Astrology · 60 Min",
    path: "Kaam",
    subtitle: "Relationships · Love Language · Soul Connection",
    description:
      "Understand relational dynamics, patterns leading to unresolved emotional loops, conflicts, your unique love language, deep desires, and your soul's chosen way to experience and embody love in close relationships. For couples - 2 birth charts.",
    price: "Rs. 16,000",
    amountPaise: 100,
    currency: "INR",
  },
  {
    id: "sayujya-individual",
    name: "Sayujya Session – Individual",
    tag: "Astrology · 60 Min",
    path: "Kaam",
    subtitle: "Relationships · Love Language · Soul Connection",
    description:
      "Understand relational dynamics, patterns leading to unresolved emotional loops, conflicts, your unique love language, deep desires, and your soul's chosen way to experience and embody love in close relationships. Individual birth chart reading.",
    price: "Rs. 8,500",
    amountPaise: 100,
    currency: "INR",
  },
  {
    id: "sayujya-oracle",
    name: "Sayujya Oracle Reading",
    tag: "Oracle · 30 Min",
    path: "Kaam",
    subtitle: "Relationships · Oracle Cards · Clarity",
    description:
      "Understand relational dynamics, patterns leading to unresolved emotional loops, conflicts, your unique love language, deep desires, and your soul's chosen way to experience and embody love in close relationships. Oracle card-based reading.",
    price: "Rs. 3,500",
    amountPaise: 100,
    currency: "INR",
  },
  {
    id: "santati",
    name: "Santati Session",
    tag: "For Children · Up to Age 10",
    path: "Kaam",
    subtitle: "Astrology · 1:1 · 60 Minutes · Child Development",
    description:
      "Understand your children - their behavioural patterns, creative potentials, talents, hidden challenges, and aligned games and activities to support them better. An astrology-based consultation dedicated entirely to your child's cosmic blueprint.",
    price: "Rs. 8,500",
    amountPaise: 100,
    currency: "INR",
  },
];

const PATH_ORDER: Array<"Dharma" | "Artha" | "Kaam"> = ["Dharma", "Artha", "Kaam"];

export default function Booking() {
  const [checkoutItem, setCheckoutItem] = useState<CheckoutItem | null>(null);

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
          {PATH_ORDER.map((path) => (
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
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{service.path}</p>
                      {service.pdfOnly && (
                        <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded shrink-0">PDF</span>
                      )}
                    </div>
                    <h3 className="font-serif text-base text-foreground mb-1 group-hover:text-primary transition-colors">{service.name}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-primary/70 mb-3">{service.subtitle}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                    <span className="text-primary font-serif">{service.price}</span>
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
