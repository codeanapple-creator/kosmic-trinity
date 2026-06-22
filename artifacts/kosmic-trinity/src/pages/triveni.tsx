import { MotionSection } from "@/components/ui/motion-section";
import { Link } from "wouter";
import { ArrowRight, Star } from "lucide-react";

const pillars = [
  {
    roman: "I",
    name: "Dharma",
    color: "primary",
    description: "Uncover your soul's unique calling. Map the karmic blueprint that reveals why you are here and what you incarnated to master.",
  },
  {
    roman: "II",
    name: "Artha",
    color: "primary",
    description: "Align your livelihood with your cosmic signature. Move from scarcity consciousness to an abundance that feels sacred, not strained.",
  },
  {
    roman: "III",
    name: "Kaam",
    color: "accent",
    description: "Illuminate your desires, relationships, and creative expression. Understand the soul contracts that shape your deepest connections.",
  },
];

const timeline = [
  {
    month: "Month 1",
    title: "Decoding",
    description: "Deep-dive natal chart analysis across all three pillars. Identify your gifts, your blocks, and the karmic patterns at play.",
  },
  {
    month: "Month 2",
    title: "Integration",
    description: "1:1 guided sessions weaving astrology, Tarot, and reflective practices to integrate the insights across Dharma, Artha, and Kaam.",
  },
  {
    month: "Month 3",
    title: "Embodiment",
    description: "Designing your unique life architecture — how to use your gifts in service, align your work with your soul, and step fully into your purpose.",
  },
];

export default function Triveni() {
  return (
    <div className="w-full pt-32 pb-24 relative min-h-screen overflow-hidden">
      <div className="star-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.06)_0%,transparent_60%)]" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">

        {/* Header */}
        <MotionSection className="text-center mb-10">
          <span className="text-primary font-serif text-2xl mb-2 block">Flagship Program</span>
          <h1 className="text-4xl md:text-6xl font-serif gold-gradient-text mb-6">Triveni</h1>
          <p className="text-muted-foreground uppercase tracking-widest text-sm max-w-2xl mx-auto">
            Three Months · Three Pillars · One Sacred Journey
          </p>
        </MotionSection>

        {/* Shloka */}
        <MotionSection delay={0.1} className="max-w-2xl mx-auto text-center mb-14">
          <div className="relative px-8 py-8 border border-primary/20 rounded bg-card/20 backdrop-blur">
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <p className="font-serif text-lg md:text-xl text-primary leading-relaxed mb-3">
              त्रिवेणी संगमे स्नानं मोक्षदायकमुत्तमम्।
            </p>
            <p className="text-muted-foreground text-sm italic leading-relaxed mb-2">
              "Bathing at the Triveni confluence is the highest path to liberation."
            </p>
            <p className="text-[11px] text-primary/60 uppercase tracking-widest">— Ancient Wisdom</p>
          </div>
        </MotionSection>

        {/* Intro */}
        <MotionSection delay={0.15} className="mb-12 text-center max-w-2xl mx-auto">
          <p className="text-muted-foreground leading-relaxed text-lg font-light">
            Just as three sacred rivers converge at Prayagraj to create something greater than each alone, Triveni weaves together Dharma, Artha, and Kaam — guided by the thread of astrology — into a single, integrated 3-month container. Discover your gifts. Use them. Serve others through them.
          </p>
        </MotionSection>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-16" />

        {/* Three Pillars */}
        <MotionSection delay={0.2} className="mb-16">
          <h2 className="text-2xl font-serif text-center mb-10">The Three Pillars</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <div
                key={p.name}
                className="bg-card/30 backdrop-blur border border-border p-6 rounded text-center glow-hover relative overflow-hidden"
              >
                <div className={`w-12 h-12 rounded-full bg-${p.color}/10 border border-${p.color}/30 flex items-center justify-center mx-auto mb-4`}>
                  <span className={`font-serif text-lg text-${p.color}`}>{p.roman}</span>
                </div>
                <h3 className="text-xl font-serif mb-3">{p.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{p.description}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-primary text-sm mt-6 tracking-widest uppercase">Astrology connects all three</p>
        </MotionSection>

        {/* What this is */}
        <MotionSection delay={0.25}>
          <div className="bg-card/30 backdrop-blur border border-border p-8 md:p-12 rounded relative overflow-hidden mb-12">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-full" />
            <h2 className="text-2xl font-serif mb-6 text-foreground">What Triveni Offers</h2>
            <div className="space-y-4">
              {[
                "A full natal chart reading across Dharma, Artha & Kaam — decoded in one integrated lens",
                "1:1 personal guidance from Kriti across the 3-month container",
                "Practical tools to integrate all three pillars into your daily life",
                "Astrology-backed timing — know when to move, when to wait, when to serve",
                "Support to discover your unique gifts and channel them in service of others",
              ].map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <Star size={14} className="text-primary mt-1 shrink-0" />
                  <p className="text-muted-foreground font-light leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </MotionSection>

        {/* 3-Month Timeline */}
        <MotionSection delay={0.3} className="mb-16">
          <h2 className="text-2xl font-serif text-center mb-10">The 3-Month Journey</h2>
          <div className="space-y-6 relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden md:block" />
            {timeline.map((t, i) => (
              <MotionSection key={t.month} delay={0.3 + i * 0.1}>
                <div className="flex gap-6 items-start">
                  <div className="hidden md:flex w-12 h-12 rounded-full bg-secondary border border-primary/40 items-center justify-center shrink-0 relative z-10">
                    <span className="font-serif text-primary text-xs">{i + 1}</span>
                  </div>
                  <div className="bg-card/20 backdrop-blur border border-border p-6 rounded flex-grow">
                    <p className="text-primary text-xs uppercase tracking-widest mb-1">{t.month}</p>
                    <h3 className="text-xl font-serif mb-2">{t.title}</h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">{t.description}</p>
                  </div>
                </div>
              </MotionSection>
            ))}
          </div>
        </MotionSection>

        {/* CTA */}
        <MotionSection delay={0.5}>
          <div className="bg-card/40 backdrop-blur border border-primary/30 p-10 md:p-14 rounded text-center shadow-[0_0_40px_rgba(201,168,76,0.08)]">
            <h2 className="text-2xl md:text-3xl font-serif mb-4">Ready to Begin?</h2>
            <p className="text-muted-foreground font-light mb-8 max-w-xl mx-auto">
              Triveni is a limited-seat, deeply personal container. Reach out through Abhivyakti to explore if this journey is aligned for you right now.
            </p>
            <Link
              href="/abhivyakti"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-serif tracking-wider uppercase text-sm rounded hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(201,168,76,0.2)]"
            >
              Apply for Triveni <ArrowRight size={14} />
            </Link>
          </div>
        </MotionSection>

      </div>
    </div>
  );
}
