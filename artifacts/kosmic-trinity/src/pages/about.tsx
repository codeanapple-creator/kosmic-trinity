import { MotionSection, FadeIn } from "@/components/ui/motion-section";
import triveniSangam from "@assets/about_us_1782111118235.jpeg";

const pillars = [
  {
    name: "Dharma",
    sanskrit: "धर्म",
    color: "from-primary/10 to-primary/5",
    border: "border-primary/40",
    description:
      "Soul direction, patterns, and purpose. Dharma is the thread that runs through your choices, your wounds, your gifts, and your becoming. Through astrology, tarot, and karmic mapping we help you see the shape of your soul's chosen lesson — and walk it consciously.",
  },
  {
    name: "Artha",
    sanskrit: "अर्थ",
    color: "from-amber-900/20 to-amber-900/5",
    border: "border-amber-500/40",
    description:
      "Money, work, and building wealth. Artha is not greed — it is the sacred right of every soul to thrive. We decode your relationship with abundance through your chart, your blocks, and your unique money blueprint, so prosperity becomes a spiritual practice, not a chase.",
  },
  {
    name: "Kaam",
    sanskrit: "काम",
    color: "from-rose-900/20 to-rose-900/5",
    border: "border-rose-700/40",
    description:
      "Emotional world, connections, desires, and expressions. Kaam is the full spectrum of your feeling life — love, longing, creativity, and self-expression. We explore your relational patterns, Venus story, and emotional inheritance so you can love freely, create boldly, and desire without shame.",
  },
];

export default function About() {
  return (
    <div className="w-full pt-32 pb-24 relative min-h-screen">
      <div className="star-bg" />

      <div className="container mx-auto px-4">

        {/* Hero */}
        <MotionSection className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-4">Where Three Vibrations Meet</p>
          <h1 className="text-4xl md:text-6xl font-serif gold-gradient-text mb-5">About Us</h1>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            Three Souls. One Confluence. A sacred interconnection of Esoterics, Psychology, Financial literacy and Creative Arts.
          </p>
        </MotionSection>

        {/* Origin Story */}
        <MotionSection delay={0.1} className="max-w-4xl mx-auto mb-20">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Image */}
            <div className="lg:col-span-5 relative">
              <div className="sacred-border p-2 bg-card/30 backdrop-blur rounded">
                <img
                  src={triveniSangam}
                  alt="Triveni Sangam, Prayagraj"
                  className="w-full aspect-[4/5] object-cover rounded"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent rounded" />
              </div>
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/10 rounded-full blur-[30px]" />
            </div>

            {/* Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-muted-foreground leading-relaxed text-base font-light">
                We are three sisters from <span className="text-foreground font-medium">Prayagraj</span> — the city where the Ganga, Yamuna, and the invisible Saraswati converge. We grew up at the Triveni Sangam, watching three rivers become one sacred body of water. That image never left us.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base font-light">
                Each of us followed a different current. One moved toward the <span className="text-primary font-medium">psyche and spirit</span> — drawn to the invisible architectures of the soul, astrology, and the language of symbols. Another was pulled toward <span className="text-primary font-medium">wealth and money energy</span> — fascinated by how abundance flows, blocks, and transforms. The third fell into <span className="text-primary font-medium">art and aesthetics</span> — poetry, craft, beauty, and the emotional worlds people carry inside them.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base font-light">
                We were different rivers. And then — like the Sangam — we met again.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base font-light">
                <span className="text-foreground font-medium">Kosmic Trinity</span> is what happens when three distinct streams of wisdom — soul-reading, abundance-mapping, and emotional-creative intelligence — flow together. We are not one voice. We are a confluence.
              </p>
            </div>
          </div>
        </MotionSection>

        {/* Three Pillars — What We Do */}
        <MotionSection delay={0.2} className="mb-20">
          <div className="text-center mb-10">
            <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">What We Do</p>
            <h2 className="font-serif text-3xl md:text-4xl gold-gradient-text">The Three Pillars of Kosmic Trinity</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pillars.map((pillar, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div className={`border ${pillar.border} rounded bg-gradient-to-b ${pillar.color} backdrop-blur p-7 h-full flex flex-col relative overflow-hidden group hover:shadow-[0_0_30px_rgba(201,168,76,0.15)] transition-shadow duration-500`}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.06),transparent_70%)]" />
                  <div className="relative z-10">
                    <p className="font-serif text-4xl gold-gradient-text mb-1">{pillar.sanskrit}</p>
                    <h3 className="font-serif text-2xl text-foreground mb-4">{pillar.name}</h3>
                    <div className="w-8 h-px bg-primary/50 mb-5" />
                    <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </MotionSection>

        {/* Closing Sangam Statement */}
        <FadeIn delay={0.1}>
          <div className="max-w-3xl mx-auto text-center relative">
            <div className="relative px-8 py-14 border border-primary/30 rounded bg-card/20 backdrop-blur overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.08),transparent_70%)]" />
              <div className="absolute -top-px left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

              <p className="relative z-10 text-primary uppercase tracking-[0.35em] text-xs mb-6">The Sangam</p>
              <h2 className="relative z-10 font-serif text-3xl md:text-5xl gold-gradient-text mb-6 leading-tight">
                YOU are the confluence.
              </h2>
              <p className="relative z-10 text-muted-foreground leading-relaxed text-base mb-4 font-light">
                Every soul who comes to Kosmic Trinity carries their own Triveni within them — the river of purpose, the river of abundance, and the river of feeling. Our work is simply to stand at that inner Sangam with you, and help you see where your three rivers flow.
              </p>
              <p className="relative z-10 text-foreground font-serif text-lg mt-6 leading-relaxed">
                Welcome Seeker. Ready to take a holy dip?
              </p>
              <p className="relative z-10 font-serif text-primary text-lg mt-8 tracking-widest">✦ thekosmictrinity ✦</p>
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
