import { MotionSection } from "@/components/ui/motion-section";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const explores = [
  "Why do you attract certain relational dynamics? Patterns of conflict, distance, or longing, and ways to rewire them.",
  "Your creative potential — your soul's chosen methods of experiencing joy and creativity.",
  "Exploring the immense potential of your most beautiful creation — your children.",
  "Soulful creations as artwork, poetry, and décor items to express your love to your loved ones.",
  "Reflective journals, digital workbooks, and esoteric tools to aid your manifestations.",
];

export default function Kaam() {
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

        {/* Shloka — Nasadiya Sukta, Rig Veda */}
        <MotionSection delay={0.1} className="max-w-2xl mx-auto text-center mb-14">
          <div className="relative px-8 py-8 border border-accent/20 rounded bg-card/20 backdrop-blur">
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            <p className="font-serif text-lg md:text-xl text-accent leading-relaxed mb-3">
              कामस्तदग्रे समवर्तताधि मनसो रेतः प्रथमं यदासीत्।<br />
              सतो बन्धुमसति निरविन्दन् हृदि प्रतीष्या कवयो मनीषा।।
            </p>
            <p className="text-muted-foreground text-sm italic leading-relaxed mb-2">
              "In the beginning, Kama arose — the primal seed, the first impulse of the cosmic mind.<br />
              Sages, seeking within their hearts with wisdom, discovered the bond between existence and non-existence."
            </p>
            <p className="text-[11px] text-accent/60 uppercase tracking-widest">— Nasadiya Sukta, Rig Veda</p>
          </div>
        </MotionSection>

        {/* Philosophy */}
        <MotionSection delay={0.15} className="mb-10 max-w-3xl mx-auto">
          <p className="text-muted-foreground leading-relaxed text-lg font-light mb-5">
            This verse from the Rig Veda's Nasadiya Sukta (Hymn of Creation) reveals that in the beginning, <span className="text-foreground italic">Kama</span> — the primal desire, the cosmic will — arose as the very first seed of creation. The entire material world was born out of a profound, spiritual urge to create.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base font-light mb-5">
            Kaam has been sadly reduced to romance and sensory pleasures. But its very essence is the sacred, primal spark of desire that serves as the ultimate catalyst for both human connection and artistic expression. It is a powerful energy — the vital heartbeat of relationships, transforming simple companionship into deep, soulful intimacy. Simultaneously, it functions as the ultimate muse for creative potential, channelling raw passion to turn abstract thoughts into tangible reality.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base font-light">
            By recognising Kaam as a spiritual drive rather than a purely physical impulse, we unlock a balanced force that fuels resilient bonds and inspires boundless creation.
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

          {/* 1 — Sayujya Session */}
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
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-accent/20 text-accent">Astrology-Based</span>
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-accent/20 text-accent">Tarot &amp; Oracle</span>
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-accent/20 text-accent">Couples Available</span>
              </div>

              {/* Pricing table */}
              <div className="border border-accent/15 rounded divide-y divide-accent/10 mb-8">
                <div className="px-5 py-4">
                  <p className="text-xs text-accent uppercase tracking-widest mb-2">Astrology-Based · 60-Minute Zoom</p>
                  <div className="flex flex-wrap gap-x-8 gap-y-1">
                    <p className="text-muted-foreground text-sm">Couples (2 birth charts) —
                      <span className="text-foreground font-serif ml-2">Rs. 16,000 / $160 / €160</span>
                    </p>
                    <p className="text-muted-foreground text-sm">Individual (1 birth chart) —
                      <span className="text-foreground font-serif ml-2">Rs. 8,500 / $85 / €85</span>
                    </p>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <p className="text-xs text-accent uppercase tracking-widest mb-2">Tarot &amp; Oracle · 30-Minute Zoom</p>
                  <p className="text-muted-foreground text-sm">
                    <span className="text-foreground font-serif">Rs. 3,500 / $35 / €35</span>
                  </p>
                </div>
              </div>

              <a href="https://wa.me/message/kosmictrinity" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2 bg-accent text-accent-foreground font-serif tracking-wider uppercase text-xs rounded hover:bg-accent/90 transition-colors">
                Book Sayujya <ArrowRight size={12} />
              </a>
            </div>
          </MotionSection>

          {/* 2 — Santati Session */}
          <MotionSection delay={0.4}>
            <div className="bg-card/30 backdrop-blur border border-border p-8 md:p-12 rounded glow-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
              <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                <h2 className="text-2xl font-serif text-foreground">Santati Session</h2>
                <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-[10px] uppercase tracking-widest rounded shrink-0">For Children · Up to Age 10</span>
              </div>
              <p className="text-primary text-xs uppercase tracking-widest mb-4">Astrology · 1:1 · 60 Minutes · Child Development</p>
              <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                Understand your children — their behavioural patterns, creative potentials, talents, hidden challenges, and aligned games and activities to support them better. An astrology-based consultation dedicated entirely to your child's cosmic blueprint.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">Birth Chart</span>
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">Child Development</span>
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">Creative Potential</span>
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">60-Minute Zoom</span>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-foreground font-serif text-lg">Rs. 8,500 &nbsp;<span className="text-muted-foreground text-sm font-light">/ $85 / €85</span></p>
                <a href="https://wa.me/message/kosmictrinity" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-transparent border border-primary text-primary hover:bg-primary/10 font-serif tracking-wider uppercase text-xs rounded transition-colors">
                  Book Santati <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </MotionSection>

          {/* 3 — Storefront */}
          <MotionSection delay={0.5}>
            <div className="bg-card/30 backdrop-blur border border-accent/30 p-8 md:p-12 rounded glow-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full" />
              <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                <h2 className="text-2xl font-serif text-foreground">The Soul Store</h2>
                <span className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 text-[10px] uppercase tracking-widest rounded shrink-0">Storefront</span>
              </div>
              <p className="text-accent text-xs uppercase tracking-widest mb-4">Gifts · Artworks · Journals · Manifestation Tools</p>
              <p className="text-muted-foreground leading-relaxed mb-8 font-light">
                Personalised poetry gifts, soulful artworks, quote calendars, reflective journals, digital workbooks, and esoteric tools — crafted to express love, inspire creativity, and support your manifestation practice.
              </p>
              <Link href="/storefront"
                className="inline-flex items-center gap-2 px-6 py-2 bg-accent text-accent-foreground font-serif tracking-wider uppercase text-xs rounded hover:bg-accent/90 transition-colors">
                Visit the Soul Store <ArrowRight size={12} />
              </Link>
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
    </div>
  );
}
