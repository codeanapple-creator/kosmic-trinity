import { useState } from "react";
import { MotionSection } from "@/components/ui/motion-section";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import CheckoutModal, { type CheckoutItem } from "@/components/ui/checkout-modal";

const explores = [
  "Why do you attract certain relational dynamics? Patterns of conflict, distance, or longing, and ways to rewire them.",
  "Your creative potential, soul's chosen methods of experiencing joy and creativity.",
  "Exploring the immense potential of your most beautiful creation – your children.",
  "Get soulful creations as artwork, poetry, and decor items to express your love to your loved ones.",
  "Get reflective journals, digital workbooks, and esoteric tools to aid your manifestations.",
];

export default function Kaam() {
  const [checkoutItem, setCheckoutItem] = useState<CheckoutItem | null>(null);

  function book(name: string, amountPaise: number) {
    setCheckoutItem({ name, type: "service", amountPaise, currency: "INR" });
  }

  return (
    <div className="w-full pt-32 pb-24 relative min-h-screen">
      <div className="star-bg" />

      <div className="container mx-auto px-4 max-w-4xl">
        <MotionSection className="text-center mb-10">
          <span className="text-accent font-serif text-2xl mb-2 block">Path III</span>
          <h1 className="text-4xl md:text-6xl font-serif text-accent mb-6">Kaam</h1>
          <p className="text-muted-foreground uppercase tracking-widest text-sm max-w-2xl mx-auto">
            The World of Creation and Connection
          </p>
        </MotionSection>

        {/* Shloka - Nasadiya Sukta, Rig Veda */}
        <MotionSection delay={0.1} className="max-w-2xl mx-auto text-center mb-14">
          <div className="relative px-8 py-8 border border-accent/20 rounded bg-card/20 backdrop-blur">
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            <p className="font-serif text-lg md:text-xl text-accent leading-relaxed mb-3">
              कामस्तदग्रे समवर्तताधि मनसो रेतः परथमं यदासीत।<br />
              सतो बन्धुमसति निरविन्दन हर्दि परतीष्याकवयो मनीषा॥
            </p>
            <p className="text-primary/90 text-sm italic leading-relaxed mb-2">
              "In the beginning, Kama arose - the primal seed, the first impulse of the cosmic mind.<br />
              Sages, seeking within their hearts with wisdom, discovered the bond between existence and non-existence."
            </p>
            <p className="text-[11px] text-accent/60 uppercase tracking-widest">- Nasadiya Sukta, Rig Veda</p>
          </div>
        </MotionSection>

        {/* Philosophy */}
        <MotionSection delay={0.15} className="mb-10 max-w-3xl mx-auto">
          <p className="text-muted-foreground leading-relaxed text-lg font-light mb-5">
            This verse from the Rig Veda's famous Nasadiya Sukta (Hymn of Creation) explains the origin of the universe as a manifestation of divine desire. It states that in the beginning, "Kama" (the primal desire or cosmic will) arose, serving as the very first seed and impetus of the cosmic mind. By looking deep within their hearts with intellect and wisdom, ancient sages discovered this subtle link connecting existence (Sat) to non-existence (Asat). Ultimately, the hymn suggests that the entire material world was born out of a profound, spiritual urge to create.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base font-light mb-5">
            Kaam has been sadly reduced to romance and sensory pleasures, but the very essence of it is the sacred, primal spark of desire that serves as the ultimate catalyst for both human connection and artistic expression. It is a powerful energy that acts as the vital heartbeat of relationships, transforming simple companionship into a deep, soulful intimacy and simultaneously, it functions as the ultimate muse for creative potential, channeling raw passion to turn abstract thoughts into tangible reality.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base font-light">
            By recognizing Kaam as a spiritual drive rather than a purely physical impulse, we unlock a balanced force that fuels resilient bonds and inspires boundless creation.
          </p>
        </MotionSection>

        {/* In this space */}
        <MotionSection delay={0.2} className="mb-14 max-w-3xl mx-auto">
          <div className="bg-card/20 border border-accent/15 rounded p-8 backdrop-blur">
            <p className="text-accent font-serif text-lg mb-5">In this space, we look at:</p>
            <ul className="space-y-3">
              {explores.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-accent mt-1 shrink-0">✦</span>
                  <span className="text-muted-foreground font-light leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </MotionSection>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-14" />

        <MotionSection delay={0.25} className="text-center mb-12">
          <p className="text-accent font-serif text-xl tracking-wide">✨ Offerings under Kaam</p>
        </MotionSection>

        <div className="space-y-12">

          {/* 1 - Sayujya Session */}
          <MotionSection delay={0.3}>
            <div className="bg-card/30 backdrop-blur border border-border p-8 md:p-12 rounded glow-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full" />
              <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                <h2 className="text-2xl font-serif text-foreground">Sayujya Session</h2>
                <span className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 text-[10px] uppercase tracking-widest rounded shrink-0">1:1 · Live Zoom</span>
              </div>
              <p className="text-accent text-xs uppercase tracking-widest mb-4">Relationships · Love Language · Soul Connection</p>
              <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                Understand relational dynamics, patterns leading to unresolved emotional loops, conflicts, your unique love language, deep desires, and your soul's chosen way to experience and embody love in close relationships.
              </p>

              {/* Pricing table */}
              <div className="border border-accent/15 rounded divide-y divide-accent/10 mb-6">
                <div className="px-5 py-4">
                  <p className="text-xs text-accent uppercase tracking-widest mb-3">Astrology-Based · 60-Minute Zoom</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Couples (2 birth charts)</p>
                      <p className="text-foreground font-serif mb-3">Rs. 16,000 / $160 / €160</p>
                      <button
                        onClick={() => book("Sayujya Session – Couples (Astrology, 60 min)", 100)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground font-serif tracking-wider uppercase text-xs rounded hover:bg-accent/90 transition-colors"
                      >
                        Book Now <ArrowRight size={12} />
                      </button>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Individual (1 birth chart)</p>
                      <p className="text-foreground font-serif mb-3">Rs. 8,500 / $85 / €85</p>
                      <button
                        onClick={() => book("Sayujya Session – Individual (Astrology, 60 min)", 100)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground font-serif tracking-wider uppercase text-xs rounded hover:bg-accent/90 transition-colors"
                      >
                        Book Now <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <p className="text-xs text-accent uppercase tracking-widest mb-3">Oracle · 30-Minute Zoom</p>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <p className="text-foreground font-serif">Rs. 3,500 / $35 / €35</p>
                    <button
                      onClick={() => book("Sayujya Oracle Reading (30 min)", 100)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-transparent border border-accent text-accent hover:bg-accent/10 font-serif tracking-wider uppercase text-xs rounded transition-colors"
                    >
                      Book Now <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </MotionSection>

          {/* 2 - Santati Session */}
          <MotionSection delay={0.4}>
            <div className="bg-card/30 backdrop-blur border border-border p-8 md:p-12 rounded glow-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
              <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                <h2 className="text-2xl font-serif text-foreground">Santati Session</h2>
                <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-[10px] uppercase tracking-widest rounded shrink-0">For Children · Up to Age 10</span>
              </div>
              <p className="text-primary text-xs uppercase tracking-widest mb-4">Astrology · 1:1 · 60 Minutes · Child Development</p>
              <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                Understand your children - their behavioural patterns, creative potentials, talents, hidden challenges, and aligned games and activities to support them better. An astrology-based consultation dedicated entirely to your child's cosmic blueprint.
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-foreground font-serif text-lg">Rs. 8,500 &nbsp;<span className="text-muted-foreground text-sm font-light">/ $85 / €85</span></p>
                <button
                  onClick={() => book("Santati Session", 100)}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-transparent border border-primary text-primary hover:bg-primary/10 font-serif tracking-wider uppercase text-xs rounded transition-colors"
                >
                  Book Santati <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </MotionSection>

          {/* 3 - Srijan by Smriti */}
          <MotionSection delay={0.5}>
            <div className="bg-card/30 backdrop-blur border border-accent/30 p-8 md:p-12 rounded glow-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full" />
              <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                <h2 className="text-2xl font-serif text-foreground">Srijan by Smriti</h2>
                <span className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 text-[10px] uppercase tracking-widest rounded shrink-0">Zen Art Session</span>
              </div>
              <p className="text-accent text-xs uppercase tracking-widest mb-4">A Zen Art Session by Smriti · 40 Minutes · Zoom</p>
              <p className="text-muted-foreground leading-relaxed mb-3 font-light">
                What if art could become a sacred pause in the middle of a busy life?
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3 font-light">
                This Session is a soft space to slow down, breathe, create, and reconnect with yourself.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3 font-light">
                It is a personalized online art session where every element — the colors, art materials, and creative inspiration — is thoughtfully chosen based on your birth chart, making the experience uniquely yours.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8 font-light">
                No artistic experience needed. Just be present, and allow your inner creator to reveal.
              </p>
              <a
                href="https://wa.me/4915213716432"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2 bg-accent text-accent-foreground font-serif tracking-wider uppercase text-xs rounded hover:bg-accent/90 transition-colors"
              >
                Book Srijan <ArrowRight size={12} />
              </a>
            </div>
          </MotionSection>

        </div>

        <MotionSection delay={0.6} className="mt-20 text-center">
          <p className="text-muted-foreground italic mb-6">Want all three pillars woven together?</p>
          <Link href="/triveni" className="text-primary border-b border-primary/30 pb-1 hover:border-primary transition-colors">
            Explore the Triveni Flagship Program →
          </Link>
        </MotionSection>
      </div>

      {checkoutItem && (
        <CheckoutModal item={checkoutItem} onClose={() => setCheckoutItem(null)} />
      )}
    </div>
  );
}
