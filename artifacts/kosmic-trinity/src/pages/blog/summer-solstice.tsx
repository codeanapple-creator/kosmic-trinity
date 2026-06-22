import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { MotionSection, FadeIn } from "@/components/ui/motion-section";

const tarotSpread = [
  { num: 1, question: "What new chapter is beginning to unfold in my life?" },
  { num: 2, question: "What needs my attention to reach the finish line?" },
  { num: 3, question: "Where am I receiving growth and positive change?" },
  { num: 4, question: "What can I be grateful for right now?" },
  { num: 5, question: "What makes me feel most alive and fulfilled?" },
  { num: 6, question: "How can I show up more authentically and make a positive impact on the world around me?" },
];

export default function SummerSolstice() {
  return (
    <div className="w-full pt-32 pb-24 relative min-h-screen">
      <div className="star-bg" />
      <div className="container mx-auto px-4 max-w-3xl">

        <FadeIn>
          <Link href="/journal" className="inline-flex items-center gap-2 text-primary/70 hover:text-primary text-sm mb-10 transition-colors">
            <ArrowLeft size={14} /> Back to Swadhyay
          </Link>
        </FadeIn>

        <MotionSection>
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">Cosmic Events · Tarot</p>
          <h1 className="text-3xl md:text-5xl font-serif gold-gradient-text mb-4 leading-tight">
            Summer Solstice: When the Sun Stands Still and the Soul Steps Forward
          </h1>
          <div className="w-16 h-px bg-primary/50 mb-8" />
        </MotionSection>

        <div className="space-y-6 text-muted-foreground leading-relaxed font-light">

          <FadeIn delay={0.1}>
            <p>
              You must have studied about Solstices in your Geography classes. The Summer Solstice is one of the most significant turning points in Earth's annual journey around the Sun. Occurring around <span className="text-foreground font-medium">June 20–21</span> in the Northern Hemisphere, it marks the longest day and shortest night of the year. On this day, the Earth's North Pole is tilted closest to the Sun, allowing sunlight to reach its maximum duration. Yes, yes, yes… remember?
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p>
              And our cultures reveal that ancient civilizations worldwide recognized this celestial event as sacred. From the stone alignments of Stonehenge to seasonal festivals celebrating abundance, fertility, and harvest, the Summer Solstice has long symbolized the peak expression of life force energy.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="my-8 p-6 border border-primary/20 rounded bg-card/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.07),transparent_70%)]" />
              <p className="relative z-10 text-foreground font-light leading-relaxed">
                In the physical world, the Solstice represents <span className="text-primary">fullness</span>. Nature is vibrant, crops are growing, flowers are blooming, and daylight stretches generously across the horizon. It is a reminder that every seed planted in the darkness of winter eventually reaches a moment of visible growth.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p>
              Energetically, the Solstice acts like a spotlight from Cosmos. Whatever has been growing within us — our intentions, ambitions, habits, and desires — becomes easier to see. The heightened solar energy encourages vitality, confidence, creativity, and conscious action.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h2 className="text-2xl font-serif text-foreground mt-10 mb-4">A Tarot Spread for the Solstice</h2>
            <p className="mb-8">
              If you like to use Tarot and Oracle cards to check your inner alignment and connect with your purpose, your power, and your path — try this spread. Pull one card for each position and sit with what comes up.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {tarotSpread.map((card) => (
                <div key={card.num} className="p-5 border border-primary/20 rounded bg-card/30 hover:border-primary/40 transition-colors group">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-serif gold-gradient-text shrink-0 leading-none">{card.num}</span>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">{card.question}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 border border-primary/30 rounded bg-card/20 backdrop-blur text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.06),transparent_70%)]" />
              <p className="relative z-10 text-muted-foreground text-sm">
                Do try the spread and let us know your insights. In case you wish to book a Summer Solstice Tarot Reading with Kriti, send a message on{" "}
                <a href="https://www.instagram.com/kosmictrinity" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@kosmictrinity</a>
              </p>
              <p className="relative z-10 text-primary font-serif text-sm mt-4">✦ thekosmictrinity ✦</p>
            </div>
          </FadeIn>

        </div>

        <FadeIn delay={0.4}>
          <div className="mt-16 pt-8 border-t border-primary/20">
            <Link href="/journal" className="inline-flex items-center gap-2 text-primary/70 hover:text-primary text-sm transition-colors">
              <ArrowLeft size={14} /> Back to Swadhyay
            </Link>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
