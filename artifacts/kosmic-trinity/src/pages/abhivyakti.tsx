import { MotionSection } from "@/components/ui/motion-section";
import { MessageCircle, Phone, Heart } from "lucide-react";

export default function Abhivyakti() {
  return (
    <div className="w-full pt-32 pb-24 relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(196,126,142,0.1)_0%,transparent_60%)]" />
      <div className="star-bg" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">

        <MotionSection className="text-center mb-16">
          <h1 className="text-4xl md:text-7xl font-serif text-accent mb-4">Abhivyakti</h1>
          <p className="text-muted-foreground uppercase tracking-widest text-sm md:text-base">Just Talk · Share · Be Heard</p>
        </MotionSection>

        <MotionSection delay={0.2} className="bg-card/40 backdrop-blur-md border border-accent/30 p-8 md:p-12 rounded-lg text-center mb-16 shadow-[0_0_40px_rgba(196,126,142,0.1)]">
          <p className="text-lg md:text-xl text-foreground font-light leading-relaxed italic mb-8">
            "Sometimes you don't need a reading. You just need a space where someone truly listens — without judgment, without agenda, with full presence."
          </p>
          <div className="w-16 h-[1px] bg-accent/50 mx-auto" />
        </MotionSection>

        {/* What this is */}
        <MotionSection delay={0.25} className="mb-16">
          <div className="bg-card/30 backdrop-blur border border-border p-8 md:p-10 rounded">
            <h2 className="text-xl font-serif mb-4 text-center">What is Abhivyakti?</h2>
            <p className="text-muted-foreground leading-relaxed font-light text-center max-w-2xl mx-auto">
              Abhivyakti (अभिव्यक्ति) means expression — the sacred act of giving voice to what lives within you. This is a space where you can simply talk. Discuss what's on your mind. Explore your questions. Get a perspective. Or just be heard in a no-judgment, no-pressure container. You don't need a "problem" to bring. You just need to want to express.
            </p>
          </div>
        </MotionSection>

        {/* Two options */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <MotionSection delay={0.3}>
            <div className="h-full p-8 border border-border bg-secondary/50 rounded flex flex-col items-center text-center group hover:border-accent/50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <MessageCircle className="text-accent" size={28} />
              </div>
              <h3 className="text-2xl font-serif mb-4 text-foreground">Talk to Kriti</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-grow">
                Want to discuss your issues, get a POV on your situation, or simply need a non-judgmental space to think out loud? Kriti holds space for you — with warmth, clarity, and the depth of someone who has walked this path.
              </p>
              <p className="text-xs text-accent/70 mb-8">Astrology · Tarot · Intuitive Guidance</p>
              <a
                href="https://wa.me/message/kosmictrinity"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 border border-accent text-accent rounded hover:bg-accent hover:text-accent-foreground transition-colors font-serif uppercase tracking-widest text-xs"
              >
                Book via WhatsApp
              </a>
            </div>
          </MotionSection>

          <MotionSection delay={0.4}>
            <div className="h-full p-8 border border-border bg-secondary/50 rounded flex flex-col items-center text-center group hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Phone className="text-primary" size={28} />
              </div>
              <h3 className="text-2xl font-serif mb-4 text-foreground">Talk to Dr Bhawna</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-grow">
                Need a grounded, practical perspective alongside the cosmic lens? Dr Bhawna brings a unique blend of analytical thinking and soulful presence to your conversation — helping you bridge the gap between where you are and where you want to be.
              </p>
              <p className="text-xs text-primary/70 mb-8">Analytical · Grounded · Practical Wisdom</p>
              <a
                href="https://wa.me/message/kosmictrinity"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-primary-foreground transition-colors font-serif uppercase tracking-widest text-xs"
              >
                Book via WhatsApp
              </a>
            </div>
          </MotionSection>
        </div>

        {/* How it works */}
        <MotionSection delay={0.45} className="mb-16">
          <div className="bg-card/30 backdrop-blur border border-border p-8 rounded">
            <h2 className="text-xl font-serif mb-8 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                { step: "01", title: "Reach Out", desc: "Message us on WhatsApp. Share a little about what you'd like to talk about." },
                { step: "02", title: "Pick a Slot", desc: "We'll share available calendar slots and you choose a time that works for you." },
                { step: "03", title: "Just Talk", desc: "We meet on a call — no agenda, no pressure. Just an honest, sacred conversation." },
              ].map((s) => (
                <div key={s.step}>
                  <p className="text-primary font-serif text-3xl mb-3 opacity-40">{s.step}</p>
                  <h3 className="text-lg font-serif mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </MotionSection>

        {/* Footer note */}
        <MotionSection delay={0.5} className="max-w-2xl mx-auto text-center border-t border-border/50 pt-16">
          <Heart className="mx-auto text-accent mb-6" size={28} />
          <h2 className="text-2xl font-serif mb-4">Booking is Calendar-Based</h2>
          <p className="text-muted-foreground mb-8 font-light leading-relaxed">
            All Abhivyakti sessions are booked via WhatsApp and scheduled through a shared calendar link. Reach out and we will guide you from there.
          </p>
          <a
            href="https://wa.me/message/kosmictrinity"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-foreground text-background font-serif uppercase tracking-widest text-sm rounded hover:bg-foreground/90 transition-colors"
          >
            Message thekosmictrinity
          </a>
        </MotionSection>

      </div>
    </div>
  );
}
