import { MotionSection } from "@/components/ui/motion-section";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Dharma() {
  return (
    <div className="w-full pt-32 pb-24 relative min-h-screen">
      <div className="star-bg" />

      <div className="container mx-auto px-4 max-w-4xl">
        <MotionSection className="text-center mb-10">
          <span className="text-primary font-serif text-2xl mb-2 block">Path I</span>
          <h1 className="text-4xl md:text-6xl font-serif gold-gradient-text mb-4">Dharma</h1>
          <p className="text-primary/80 font-serif text-lg italic mb-2">The Path Chosen by Your Soul</p>
          <p className="text-muted-foreground uppercase tracking-widest text-sm max-w-2xl mx-auto mt-4">
            Soul Purpose · Karmic Patterns · Inner Calling
          </p>
        </MotionSection>

        {/* Shloka — BG 3.35 */}
        <MotionSection delay={0.1} className="max-w-2xl mx-auto text-center mb-14">
          <div className="relative px-8 py-8 border border-primary/20 rounded bg-card/20 backdrop-blur">
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <p className="font-serif text-lg md:text-xl text-primary leading-relaxed mb-3">
              श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् ।<br />
              स्वधर्मे निधनं श्रेयः परधर्मो भयावहः ॥
            </p>
            <p className="text-muted-foreground text-sm italic leading-relaxed mb-2">
              "It is far better to perform one's own prescribed duty, even though it may be faulty,<br />
              than another's duty perfectly. To follow another's path is dangerous."
            </p>
            <p className="text-[11px] text-primary/60 uppercase tracking-widest">— Bhagavad Gita 3.35</p>
          </div>
        </MotionSection>

        {/* Intro */}
        <MotionSection delay={0.15} className="mb-6 text-center max-w-2xl mx-auto">
          <p className="text-primary/70 font-serif italic text-base mb-4">
            Dhaaryati — dhāran karne yogya jo hai, wo Dharm hai.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg font-light mb-4">
            There is a difference between what you are good at and what you are meant to embody as your purpose. Vedic philosophy upholds Dharm to be the highest of all — because that is what helps a soul fulfil her desires, ambitions, and responsibilities righteously, while maintaining order in the world.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base font-light">
            Yet often, in trying to maintain that order, we forget that each soul has her own Dharma. And no — it is not a job title or a role to perform. It is the quiet, persistent call of your deepest nature.
          </p>
        </MotionSection>

        <MotionSection delay={0.18} className="mb-12 max-w-2xl mx-auto">
          <div className="bg-secondary/40 border border-border rounded p-6">
            <p className="text-muted-foreground text-sm font-light mb-3">In this space, you can explore ways to discover —</p>
            <ul className="space-y-2">
              {[
                "Your natural inclinations and inner conflicts",
                "The deeper narrative your life is unfolding",
                "The karmic patterns shaping your direction",
                "The skills and awareness you are meant to develop to lead an aligned life",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground font-light">
                  <span className="text-primary mt-0.5">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </MotionSection>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-16" />

        <MotionSection delay={0.2} className="text-center mb-12">
          <span className="text-primary uppercase tracking-widest text-xs font-semibold">✨ Offerings under Dharma</span>
        </MotionSection>

        <div className="space-y-12">

          {/* 1 — Soul Calling Guidebook */}
          <MotionSection delay={0.25}>
            <div className="bg-card/30 backdrop-blur border border-border p-8 md:p-12 rounded glow-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
              <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                <h2 className="text-2xl font-serif text-foreground">Soul Calling Guidebook</h2>
                <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-[10px] uppercase tracking-widest rounded shrink-0">PDF · Digital</span>
              </div>
              <p className="text-primary text-xs uppercase tracking-widest mb-4">Astrology + Tarot · Delivered via Email</p>
              <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                Decode the deeper intention behind your birth — your tendencies, gifts brought from past lives, and karmic tasks for this life. Based on Astrology and Tarot, this guidebook is crafted personally for you and delivered as a PDF over email.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">Soul Blueprint</span>
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">Karmic Gifts</span>
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">PDF via Email</span>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-primary font-serif text-lg">Rs. 3,333 &nbsp;·&nbsp; $33 &nbsp;·&nbsp; €33</p>
                <Link href="/booking" className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-serif tracking-wider uppercase text-xs rounded hover:bg-primary/90 transition-colors">
                  Get the Guidebook <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </MotionSection>

          {/* 2 — Swadharm Session */}
          <MotionSection delay={0.35}>
            <div className="bg-card/30 backdrop-blur border border-border p-8 md:p-12 rounded glow-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full" />
              <h2 className="text-2xl font-serif mb-2 text-foreground">Swadharm Session</h2>
              <p className="text-accent text-xs uppercase tracking-widest mb-4">Live Session · Zoom · 1:1</p>
              <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                Understand repeating patterns and unfinished cycles that shape your journey, and uncover the purpose your soul has uniquely chosen for this life. A discussion around your embedded patterns and how they are leading you toward the Dharm your soul has chosen.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-accent/20 text-accent">Pattern Recognition</span>
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-accent/20 text-accent">Soul Purpose</span>
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-accent/20 text-accent">Live via Zoom</span>
              </div>

              {/* Two sub-options */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="border border-primary/20 rounded p-5 bg-secondary/30">
                  <p className="text-primary text-xs uppercase tracking-widest mb-1">Astrology-Based</p>
                  <p className="text-foreground font-serif text-base mb-1">60-Minute Session</p>
                  <p className="text-muted-foreground text-xs font-light mb-3">Deep natal chart consultation on Zoom</p>
                  <p className="text-primary font-serif">Rs. 8,500 &nbsp;·&nbsp; $85 &nbsp;·&nbsp; €85</p>
                </div>
                <div className="border border-accent/20 rounded p-5 bg-secondary/30">
                  <p className="text-accent text-xs uppercase tracking-widest mb-1">Tarot-Based</p>
                  <p className="text-foreground font-serif text-base mb-1">30-Minute Session</p>
                  <p className="text-muted-foreground text-xs font-light mb-3">Intuitive Tarot consultation on Zoom</p>
                  <p className="text-accent font-serif">Rs. 3,500 &nbsp;·&nbsp; $35 &nbsp;·&nbsp; €35</p>
                </div>
              </div>

              <Link href="/booking" className="inline-flex items-center gap-2 px-6 py-2 bg-transparent border border-accent text-accent hover:bg-accent/10 font-serif tracking-wider uppercase text-xs rounded transition-colors">
                Book Swadharm Session <ArrowRight size={12} />
              </Link>
            </div>
          </MotionSection>

          {/* 3 — Let's Tango with Tarot */}
          <MotionSection delay={0.45}>
            <div className="bg-card/30 backdrop-blur border border-border p-8 md:p-12 rounded glow-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
              <h2 className="text-2xl font-serif mb-2 text-foreground">Let's Tango with Tarot</h2>
              <p className="text-primary text-xs uppercase tracking-widest mb-4">Course · 1:1 Coaching · Learn & Serve</p>
              <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                Learn to access your own intuitive intelligence and read Tarot Cards beyond the obvious meanings. Learning this art will not only help you reveal your own purpose — it will also equip you to serve others in finding theirs. Taught as personalised 1:1 coaching. Full course details in the attached brochure.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">Tarot Mastery</span>
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">1:1 Coaching</span>
                <span className="px-3 py-1 bg-secondary text-xs rounded border border-primary/20 text-primary">Intuitive Intelligence</span>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-primary font-serif text-lg">Rs. 25,000 &nbsp;·&nbsp; $250 &nbsp;·&nbsp; €250</p>
                <Link href="/booking" className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-serif tracking-wider uppercase text-xs rounded hover:bg-primary/90 transition-colors">
                  Enquire to Join <ArrowRight size={12} />
                </Link>
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
