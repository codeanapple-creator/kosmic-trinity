import { Link } from "wouter";
import { ArrowLeft, Mail } from "lucide-react";
import { MotionSection, FadeIn } from "@/components/ui/motion-section";

const materials = [
  "Watercolours (preferable) or any colour medium of your choice",
  "A blank sheet of paper",
  "Pencil",
  "A black pen/marker",
  "A journal or a paper to write your reflections",
  "15 minutes of undivided attention for yourself",
];

const reflectionPrompts = [
  "What do you actually see in your artwork? Describe the colours, shapes and patterns without judging them.",
  "If your ART could speak, what would it tell you? What message seems to emerge from the image?",
  "What could you add or change to make the image feel more peaceful? Notice what your intuition chooses.",
];

function VideoEmbed({ label }: { label: string }) {
  return (
    <div className="my-8">
      <p className="text-primary text-xs uppercase tracking-widest mb-3">{label}</p>
      <div className="relative w-full rounded overflow-hidden border border-primary/20" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/Df8GwbSUZ3w"
          title="An Art Ritual for the Lunar Eclipse"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default function EclipseArtRitual() {
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
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">Rituals & Magic</p>
          <h1 className="text-3xl md:text-5xl font-serif gold-gradient-text mb-4 leading-tight">
            An Art Ritual for the Lunar Eclipse
          </h1>
          <div className="w-16 h-px bg-primary/50 mb-8" />
        </MotionSection>

        <div className="space-y-6 text-base text-muted-foreground leading-relaxed font-light">

          <FadeIn delay={0.1}>
            <p>
              There are times when nothing seems particularly wrong, yet something inside us feels unsettled. Eclipse season can feel a little like that - our emotions may become louder, old thoughts may resurface, and there can be a strange sense that something within us is shifting before we can even understand what it is.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h2 className="text-2xl font-serif text-foreground mt-10 mb-4">Eclipse Energy: A Moment to Release, Recalibrate and Listen Within</h2>
            <p>
              The August 28 Lunar Eclipse brings us to a powerful point of culmination. Astrologically, it activates the tension between order and surrender, analysis and intuition, control and trust. You may notice emotions surfacing, old patterns becoming impossible to ignore. The eclipse is less about forcing an answer and more about recognising what has naturally reached its ending.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p>
              There is also an interesting mental tension around this eclipse, potentially bringing a flash of clarity - with unexpected information, sudden shifts in plans, or a perspective that changes everything.
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="my-8 p-6 border border-primary/20 rounded bg-card/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.07),transparent_70%)]" />
              <p className="relative z-10 text-foreground font-light leading-relaxed mb-1">The deeper invitation is simple:</p>
              <p className="relative z-10 text-foreground font-light leading-relaxed italic">
                Stop trying to perfect what is asking to be felt.<br />
                Stop controlling what is asking to unfold.<br />
                And create enough stillness to hear what your inner world has been saying all along.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p>
              This is why an intuitive art practice can be such a beautiful way to move through eclipse season. Watercolour flows beyond complete control, while line art gives that flowing energy a container. Together, they mirror the very lesson of this eclipse: we need both surrender and structure.
            </p>
          </FadeIn>

          <FadeIn delay={0.35}>
            <h2 className="text-2xl font-serif text-foreground mt-10 mb-4">What You Need for the Art Ritual</h2>
            <ul className="space-y-2">
              {materials.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-primary mt-1.5 shrink-0">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.4}>
            <VideoEmbed label="Watch the Full Video for Art Ritual" />
          </FadeIn>

          <FadeIn delay={0.45}>
            <p>
              In this ritual, there is no prescribed picture to create. You might paint a dark sky, a glowing moon, clouds, sun, colours merging into one another, or something absolutely abstract! That is the point. This isn't an art class. It is an invitation to listen to yourself.
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <h2 className="text-2xl font-serif text-foreground mt-10 mb-4">Let Your Artwork Speak</h2>
            <p className="mb-6">
              When your painting is complete, the ritual moves from art into reflection. Take your journal and explore:
            </p>

            <div className="space-y-4">
              {reflectionPrompts.map((prompt, i) => (
                <div key={i} className="p-5 border border-primary/20 rounded bg-card/30 hover:border-primary/40 transition-colors group">
                  <div className="flex items-start gap-4">
                    <span className="text-xl font-serif gold-gradient-text shrink-0 leading-none">{i + 1}</span>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">{prompt}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6">
              These questions can sometimes reveal more than we expect.
            </p>
          </FadeIn>

          <FadeIn delay={0.55}>
            <VideoEmbed label="Watch the Full Eclipse Art Meditation" />
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="mt-8 p-6 border border-primary/30 rounded bg-card/20 backdrop-blur text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.06),transparent_70%)]" />
              <p className="relative z-10 text-muted-foreground text-sm mb-3">
                Once you're done, we'd also love to see what emerged. Email us your artwork along with your three journal responses, and the Kosmic Trinity team will offer you an additional insight into the symbolism, themes and messages emerging from your creation.
              </p>
              <a
                href="mailto:kosmictrinity@gmail.com"
                className="relative z-10 inline-flex items-center gap-2 text-primary hover:underline text-sm font-serif"
              >
                <Mail size={14} /> kosmictrinity@gmail.com
              </a>
              <p className="relative z-10 text-primary font-serif text-sm mt-6">
                For a personal 1:1 Reading, book a Soulfarm Season Reading.
              </p>
              <Link
                href="/booking"
                className="relative z-10 inline-flex items-center gap-2 mt-3 px-6 py-2 bg-primary text-primary-foreground font-serif tracking-wider uppercase text-xs rounded hover:bg-primary/90 transition-colors"
              >
                Book Soulfarm Season Reading
              </Link>
            </div>
          </FadeIn>

        </div>

        <FadeIn delay={0.65}>
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
