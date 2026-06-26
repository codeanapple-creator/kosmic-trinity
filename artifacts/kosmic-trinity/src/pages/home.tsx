import { MotionSection, FadeIn } from "@/components/ui/motion-section";
import { Link } from "wouter";
import { Star, Moon, Sun, Sparkles } from "lucide-react";
import colortexture from "@assets/colortexture_1777355912930.jpeg";
import sacredGeometry from "@/assets/sacred_geometry.png";

export default function Home() {
  return (
    <div className="w-full relative">
      <div className="star-bg" />

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={sacredGeometry} 
            alt="Sacred Geometry Background" 
            className="w-full h-full object-cover opacity-30 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <FadeIn delay={0.2} className="mb-6 relative flex items-center justify-center">
            {/* ── Cosmic Orb ── */}
            <div className="relative w-56 h-56 md:w-72 md:h-72 flex items-center justify-center">

              {/* Outermost wide bloom */}
              <div className="absolute inset-[-60%] rounded-full bg-primary/20 blur-[80px] animate-[halo-pulse_4s_ease-in-out_infinite]" />
              <div className="absolute inset-[-45%] rounded-full bg-primary/25 blur-[60px] animate-[halo-pulse_5s_ease-in-out_infinite_0.8s]" />

              {/* Mid rose bloom */}
              <div className="absolute inset-[-30%] rounded-full bg-accent/15 blur-[50px] animate-[halo-pulse_6s_ease-in-out_infinite_1.2s]" />

              {/* Tight bright core glow */}
              <div className="absolute inset-[-10%] rounded-full bg-primary/40 blur-[30px] animate-[halo-pulse_3s_ease-in-out_infinite]" />

              {/* Halo rings — now brighter */}
              <div className="absolute inset-[-8%] rounded-full border border-primary/50 shadow-[0_0_12px_4px_rgba(201,168,76,0.4)] animate-[halo-pulse_5s_ease-in-out_infinite_0.5s]" />
              <div className="absolute inset-[-18%] rounded-full border border-primary/25 shadow-[0_0_8px_2px_rgba(201,168,76,0.2)] animate-[halo-pulse_7s_ease-in-out_infinite_1.5s]" />
              <div className="absolute inset-[-28%] rounded-full border border-primary/10 animate-[halo-pulse_9s_ease-in-out_infinite_2s]" />

              {/* Orbital ring 1 — tilted 20° */}
              <div
                className="absolute inset-0 rounded-full border border-primary/30"
                style={{ transform: "rotateX(70deg) rotateZ(20deg)", animation: "cosmic-spin 18s linear infinite" }}
              >
                {/* Orbiting dot on ring 1 */}
                <div
                  className="absolute w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_3px_rgba(201,168,76,0.8)]"
                  style={{ top: "-5px", left: "50%", marginLeft: "-5px" }}
                />
              </div>

              {/* Orbital ring 2 — tilted 60° opposite */}
              <div
                className="absolute inset-0 rounded-full border border-accent/30"
                style={{ transform: "rotateX(70deg) rotateZ(-50deg)", animation: "cosmic-spin-reverse 24s linear infinite" }}
              >
                <div
                  className="absolute w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_3px_rgba(196,126,142,0.8)]"
                  style={{ top: "-4px", left: "50%", marginLeft: "-4px" }}
                />
              </div>

              {/* Orbital ring 3 — equatorial */}
              <div
                className="absolute inset-[8%] rounded-full border border-primary/20"
                style={{ transform: "rotateX(70deg) rotateZ(90deg)", animation: "cosmic-spin 30s linear infinite" }}
              >
                <div
                  className="absolute w-1.5 h-1.5 rounded-full bg-primary/80 shadow-[0_0_6px_2px_rgba(201,168,76,0.6)]"
                  style={{ top: "-3px", left: "50%", marginLeft: "-3px" }}
                />
              </div>

              {/* Twinkling star dots scattered around */}
              {[
                { top: "2%",  left: "20%", delay: "0s",    size: "w-1 h-1" },
                { top: "10%", left: "78%", delay: "0.8s",  size: "w-1.5 h-1.5" },
                { top: "80%", left: "12%", delay: "1.4s",  size: "w-1 h-1" },
                { top: "88%", left: "72%", delay: "0.4s",  size: "w-1 h-1" },
                { top: "45%", left: "2%",  delay: "1.8s",  size: "w-1 h-1" },
                { top: "50%", left: "96%", delay: "0.2s",  size: "w-1.5 h-1.5" },
              ].map((s, i) => (
                <div
                  key={i}
                  className={`absolute ${s.size} rounded-full bg-primary`}
                  style={{ top: s.top, left: s.left, animation: `twinkle 2.5s ease-in-out infinite ${s.delay}` }}
                />
              ))}

              {/* Inner glow ring */}
              <div className="absolute inset-[4%] rounded-full border border-primary/40 shadow-[0_0_20px_rgba(201,168,76,0.3)] animate-[pulse-glow_3s_ease-in-out_infinite]" />

              {/* The image */}
              <div className="relative z-10 w-[75%] h-[75%] animate-float">
                <img
                  src={colortexture}
                  alt="Glowing Lotus"
                  className="w-full h-full object-cover rounded-full border-2 border-primary/80 shadow-[0_0_20px_6px_rgba(201,168,76,0.6),0_0_60px_20px_rgba(201,168,76,0.35),0_0_100px_40px_rgba(201,168,76,0.15)] animate-[pulse-glow_3s_ease-in-out_infinite]"
                />
                {/* Overlay to kill the white areas — multiply darkens whites to background */}
                <div className="absolute inset-0 rounded-full bg-background/60 mix-blend-multiply pointer-events-none" />
                {/* Vignette that fades edges into the dark background */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, transparent 45%, hsl(343,65%,8%) 85%)" }}
                />
              </div>
            </div>
          </FadeIn>

          <MotionSection delay={0.4} className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-sm md:text-base text-primary tracking-[0.3em] uppercase mb-4">Dharma &nbsp;·&nbsp; Artha &nbsp;·&nbsp; Kaam</h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-[1.1]">
              From Insights to <br />
              <span className="gold-gradient-text">Inner Alignment</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-6 font-light">
              Align your Dharma, Artha & Kaam by understanding your patterns, honouring your desires, and building a life that feels aligned.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 pt-8">
              <Link 
                href="/about"
                className="px-8 py-4 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_30px_rgba(201,168,76,0.5)] font-serif tracking-wider uppercase text-sm w-full sm:w-auto text-center font-bold"
                data-testid="link-hero-about"
              >
                Meet Us
              </Link>
            </div>
          </MotionSection>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-[10px] tracking-[0.2em] uppercase text-primary">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Philosophy Section */}
      <section className="py-24 relative bg-secondary/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <MotionSection>
              <div className="relative p-1">
                <div className="absolute inset-0 border border-primary/30 rounded -rotate-3 transition-transform hover:rotate-0 duration-500" />
                <div className="absolute inset-0 border border-accent/30 rounded rotate-3 transition-transform hover:rotate-0 duration-500" />
                <div className="bg-card p-10 rounded relative z-10 border border-border shadow-2xl">
                  <Sparkles className="text-primary mb-6" size={32} />
                  <h3 className="text-2xl font-serif gold-gradient-text mb-4">Ancient Wisdom, Present Clarity</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    thekosmictrinity is built on the belief that the ancient philosophy of Dharma, Artha, and Kaam holds the most profound map of a human life. We use ancient knowledge not for prediction, but for understanding the soul map and gaining clarity.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Guided by three sisters, every offering is an invitation to understand your unique blueprint — the purpose you chose, the patterns you carry, and the life you are meant to build.
                  </p>
                </div>
              </div>
            </MotionSection>
            
            <MotionSection delay={0.2} className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-serif mb-6">A Sanctuary for <br/><span className="gold-gradient-text">Seekers</span></h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30 shrink-0">
                    <Sun size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-foreground mb-2">Illumination</h4>
                    <p className="text-sm text-muted-foreground">Shedding light on subconscious patterns and karmic loops that hold you back.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30 shrink-0">
                    <Moon size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-foreground mb-2">Integration</h4>
                    <p className="text-sm text-muted-foreground">Honoring the shadow self and designing lunar rituals for emotional alchemy.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30 shrink-0">
                    <Star size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-foreground mb-2">Evolution</h4>
                    <p className="text-sm text-muted-foreground">Aligning your daily choices with your highest cosmic potential.</p>
                  </div>
                </div>
              </div>
            </MotionSection>
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Services Grid */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <MotionSection className="text-center mb-16">
            <span className="text-primary uppercase tracking-widest text-sm font-semibold">The Trinity Paths</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-6">Sacred Offerings</h2>
            <div className="w-24 h-[1px] bg-primary mx-auto" />
          </MotionSection>

          <div className="grid md:grid-cols-3 gap-8">
            <MotionSection delay={0.1}>
              <Link href="/dharma" className="block group">
                <div className="bg-card/50 backdrop-blur border border-border p-8 rounded h-full glow-hover flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary border border-primary/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="font-serif text-2xl text-primary">I</span>
                  </div>
                  <h3 className="text-xl font-serif mb-4 group-hover:text-primary transition-colors">Dharma</h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-grow">
                    Spiritual path, karmic tasks, and soul print readings. Discover what you incarnated to master.
                  </p>
                  <span className="text-xs uppercase tracking-widest text-primary flex items-center gap-2 group-hover:gap-4 transition-all">
                    Explore
                  </span>
                </div>
              </Link>
            </MotionSection>

            <MotionSection delay={0.2}>
              <Link href="/artha" className="block group">
                <div className="bg-card/50 backdrop-blur border border-border p-8 rounded h-full glow-hover flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary border border-primary/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="font-serif text-2xl text-primary">II</span>
                  </div>
                  <h3 className="text-xl font-serif mb-4 group-hover:text-primary transition-colors">Artha</h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-grow">
                    Cultivate an abundance mindset and material stability.
                  </p>
                  <span className="text-xs uppercase tracking-widest text-primary flex items-center gap-2 group-hover:gap-4 transition-all">
                    Explore
                  </span>
                </div>
              </Link>
            </MotionSection>

            <MotionSection delay={0.3}>
              <Link href="/kaam" className="block group">
                <div className="bg-card/50 backdrop-blur border border-border p-8 rounded h-full glow-hover flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary border border-primary/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="font-serif text-2xl text-primary">III</span>
                  </div>
                  <h3 className="text-xl font-serif mb-4 group-hover:text-primary transition-colors">Kaam</h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-grow">
                    Understand your relational dynamics, how your soul seeks and expresses love.
                  </p>
                  <span className="text-xs uppercase tracking-widest text-primary flex items-center gap-2 group-hover:gap-4 transition-all">
                    Explore
                  </span>
                </div>
              </Link>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* CTA / Poetic Section */}
      <section className="py-32 relative bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(196,126,142,0.1)_0%,transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <MotionSection className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-8">
              "The stars do not dictate your fate; they illuminate your choices."
            </h2>
            <div className="w-12 h-12 mx-auto border border-primary/30 rounded-full flex items-center justify-center mb-12">
              <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
            <Link 
              href="/abhivyakti"
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all rounded uppercase tracking-widest text-sm font-semibold"
            >
              Join Soul Talks Mentorship
            </Link>
          </MotionSection>
        </div>
      </section>
    </div>
  );
}
