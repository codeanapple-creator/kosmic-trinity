import { MotionSection } from "@/components/ui/motion-section";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const explores = [
  "Your relationship with receiving and holding wealth",
  "Patterns of scarcity, over-effort, or instability",
  "Career alignment and decision-making blocks",
  "Hidden talents that influence your earning and holding capacity",
  "Practical steps to organise and strengthen your finances",
];

export default function Artha() {
  return (
    <div className="w-full pt-32 pb-24 relative min-h-screen">
      <div className="star-bg" />

      <div className="container mx-auto px-4 max-w-4xl">
        <MotionSection className="text-center mb-10">
          <span className="text-primary font-serif text-2xl mb-2 block">Path II</span>
          <h1 className="text-4xl md:text-6xl font-serif gold-gradient-text mb-6">Artha</h1>
          <p className="text-muted-foreground uppercase tracking-widest text-sm max-w-2xl mx-auto">
            The Way You Create and Hold Value
          </p>
        </MotionSection>

        {/* Shloka */}
        <MotionSection delay={0.1} className="max-w-2xl mx-auto text-center mb-14">
          <div className="relative px-8 py-8 border border-primary/20 rounded bg-card/20 backdrop-blur">
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <p className="font-serif text-lg md:text-xl text-primary leading-relaxed mb-3">
              उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः।<br />
              न हि सुप्तस्य सिंहस्य प्रविशन्ति मुखे मृगाः।।
            </p>
            <p className="text-primary/80 text-sm italic leading-relaxed mb-2">
              "Goals are accomplished through effort, not mere wishes.<br />
              Deer do not enter the mouth of a sleeping lion."
            </p>
            <p className="text-[11px] text-primary/60 uppercase tracking-widest">— Hitopadesha</p>
          </div>
        </MotionSection>

        {/* Philosophy */}
        <MotionSection delay={0.15} className="mb-10 max-w-3xl mx-auto">
          <p className="text-muted-foreground leading-relaxed text-lg font-light mb-5">
            In the Hindu spiritual framework, Artha is one of the four essential pillars of human life — representing wealth, resources, structure, security, and material balance. Artha in Sanskrit means <span className="text-foreground italic">"meaning / value"</span>. It is not just money or gold but the value you derive from it.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base font-light mb-5">
            By definition, Artha encompasses economic prosperity, career, skills, and resources needed for livelihood — but its deeper purpose is to provide the material security needed to sustain oneself and family, and to perform duties (Dharma).
          </p>
          <p className="text-muted-foreground leading-relaxed text-base font-light">
            Esoteric tools like Astrology and Tarot Cards assist by identifying your optimal career fields, your unique way of accumulating and enjoying wealth, discovering time windows of financial abundance or risk, and showing how to safely and righteously acquire resources. It ensures that you do not waste energy on the wrong professions, helping you build the security needed to fulfil your Kaam (desires) in a Dharmic, righteous way.
          </p>
        </MotionSection>

        {/* In this space */}
        <MotionSection delay={0.2} className="mb-14 max-w-3xl mx-auto">
          <div className="bg-card/20 border border-primary/15 rounded p-8 backdrop-blur">
            <p className="text-primary font-serif text-lg mb-5">In this space, we explore:</p>
            <ul className="space-y-3">
              {explores.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">✦</span>
                  <span className="text-muted-foreground font-light leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </MotionSection>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-14" />

        <MotionSection delay={0.25} className="text-center mb-12">
          <p className="text-primary font-serif text-xl tracking-wide">✨ Offerings under Artha</p>
        </MotionSection>

        <div className="space-y-12">

          {/* 1 — Samriddhi Session */}
          <MotionSection delay={0.3}>
            <div className="bg-card/30 backdrop-blur border border-border p-8 md:p-12 rounded glow-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
              <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                <h2 className="text-2xl font-serif text-foreground">Samriddhi Session</h2>
                <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-[10px] uppercase tracking-widest rounded shrink-0">1:1 · Live Zoom</span>
              </div>
              <p className="text-primary text-xs uppercase tracking-widest mb-4">60 Minutes · Astrology · Wealth &amp; Career</p>
              <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                Identify what wealth means for your soul, the subconscious patterns influencing your financial flow, clarity on direction, decisions, and professional shifts — and work through energetic, psychological, and ancestral blocks around money.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">Zoom Session</span>
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">60 Minutes</span>
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">Wealth Patterns</span>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-primary font-serif text-lg">Rs. 8,500 &nbsp;<span className="text-primary/70 text-sm font-light">/ $85 / €85</span></p>
                <a href="https://wa.me/message/kosmictrinity" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-serif tracking-wider uppercase text-xs rounded hover:bg-primary/90 transition-colors">
                  Book Now <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </MotionSection>

          {/* 2 — SARTHAK */}
          <MotionSection delay={0.35}>
            <div className="bg-card/30 backdrop-blur border border-border p-8 md:p-12 rounded glow-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
              <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                <h2 className="text-2xl font-serif text-foreground">SARTHAK — A Book of Money Magic</h2>
                <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-[10px] uppercase tracking-widest rounded shrink-0">PDF · Birth Chart</span>
              </div>
              <p className="text-primary text-xs uppercase tracking-widest mb-4">Digital Reading · Self-Paced · Personalised</p>
              <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                Discover strengths you may not be fully utilising yet — your tangible talents, your money element, and ways to use them for monetary benefits. A PDF reading based on your birth chart, designed to reveal the unique cosmic blueprint behind your earning and holding capacity.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">PDF Download</span>
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">Birth Chart</span>
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">Money Element</span>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-primary font-serif text-lg">Rs. 2,500 &nbsp;<span className="text-primary/70 text-sm font-light">/ $25 / €25</span></p>
                <a href="https://wa.me/message/kosmictrinity" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-transparent border border-primary text-primary hover:bg-primary/10 font-serif tracking-wider uppercase text-xs rounded transition-colors">
                  Get SARTHAK <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </MotionSection>

          {/* 3 — Power of Pentacles */}
          <MotionSection delay={0.4}>
            <div className="bg-card/30 backdrop-blur border border-border p-8 md:p-12 rounded glow-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
              <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                <h2 className="text-2xl font-serif text-foreground">Power of Pentacles</h2>
                <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-[10px] uppercase tracking-widest rounded shrink-0">Live · Tarot + Oracle</span>
              </div>
              <p className="text-primary text-xs uppercase tracking-widest mb-4">30 Minutes · No Question Limit · Financial Clarity</p>
              <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                Tarot and Oracle Cards-based reading to uncover solutions for financial issues, fields to monetise, and to resolve blockages and patterns around money concerns. 30-minute live session — no limit on questions within the stipulated timeframe.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">Tarot Reading</span>
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">Oracle Cards</span>
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">30 Minutes Live</span>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-primary font-serif text-lg">Rs. 3,500 &nbsp;<span className="text-primary/70 text-sm font-light">/ $35 / €35</span></p>
                <a href="https://wa.me/message/kosmictrinity" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-serif tracking-wider uppercase text-xs rounded hover:bg-primary/90 transition-colors">
                  Book Now <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </MotionSection>

          {/* 4 — SHREE by Shruti */}
          <MotionSection delay={0.45}>
            <div className="bg-card/30 backdrop-blur border border-primary/20 p-8 md:p-12 rounded glow-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
              <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                <h2 className="text-2xl font-serif text-foreground">SHREE by Shruti</h2>
                <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-[10px] uppercase tracking-widest rounded shrink-0">With CA Shruti Gupta</span>
              </div>
              <p className="text-primary text-xs uppercase tracking-widest mb-4">Financial Structure · Money as Energy · 30-Min Call</p>
              <p className="text-muted-foreground leading-relaxed mb-4 font-light">
                Our seasoned CA Shruti Gupta offers her expertise to individuals, families, and women-led businesses — bringing clarity and structure to their financial world. This session goes beyond accounting and works with money as <span className="text-foreground italic">energy</span>, helping you build systems that create ease, confidence, and sustainable growth.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                Under her mentorship, you get to organise your finances, identify gaps, simplify financial understanding, and design smoother workflows for both your personal and business use. This work is especially for homemakers, women entrepreneurs, small business owners, and anyone seeking better financial organisation and awareness — because material stability and spiritual growth are not separate paths. They are meant to strengthen each other.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">CA Expertise</span>
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">Women Entrepreneurs</span>
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">Financial Systems</span>
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">30-Min Discovery Call</span>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-primary font-serif text-lg">Rs. 2,500 &nbsp;<span className="text-primary/70 text-sm font-light">discovery call</span></p>
                <a href="https://wa.me/message/kosmictrinity" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-transparent border border-primary text-primary hover:bg-primary/10 font-serif tracking-wider uppercase text-xs rounded transition-colors">
                  Unlock your SHREE <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </MotionSection>

        </div>

        <MotionSection delay={0.55} className="mt-20 text-center">
          <p className="text-muted-foreground italic mb-6">Want all three pillars woven together?</p>
          <Link href="/triveni" className="text-primary border-b border-primary/30 pb-1 hover:border-primary transition-colors">
            Explore the Triveni Flagship Program →
          </Link>
        </MotionSection>
      </div>
    </div>
  );
}
