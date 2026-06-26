import { MotionSection, FadeIn } from "@/components/ui/motion-section";
import { Link } from "wouter";
import { BookOpen, FileText, PenTool, ArrowRight } from "lucide-react";

const blogs = [
  {
    href: "/journal/rising-sign",
    category: "Astrology",
    title: "Stop Fixating at Your Sun Sign, Unlock Your Rising Sign First",
    excerpt: "Beyond horoscopes and mercury retrograde memes — your Rising Sign (Ascendant) is the first lens astrologers read. Discover what it is, how to find it, and why it explains more about you than your Sun Sign ever could.",
  },
  {
    href: "/journal/elemental-magic",
    category: "Rituals & Magic",
    title: "Harnessing the Elemental Magic for Manifestation & Release",
    excerpt: "Fire, Earth, Air, Water — the four elements are fundamental forces that govern the flow of energy in your life. Learn how to use them intentionally in your rituals to manifest desires and release what no longer serves you.",
  },
  {
    href: "/journal/summer-solstice",
    category: "Cosmic Events · Tarot",
    title: "Summer Solstice: When the Sun Stands Still and the Soul Steps Forward",
    excerpt: "The longest day of the year is not just a geographical event — it is a cosmic spotlight on everything growing within you. Includes a 6-card Tarot spread to align with the Solstice energy.",
  },
  {
    href: "/journal/tarot-yearbook",
    category: "Kosmic Journal",
    title: "The Tarot Year Book for 2026 — Themes, Timing & Inner Alignment",
    excerpt: "Calculate your Personal Year Tarot Card and discover the overarching theme life is inviting you into this year. All 21 Major Arcana themes for 2026, written by Kriti. An anchor for the year ahead.",
    featured: true,
  },
];

export default function Journal() {
  return (
    <div className="w-full pt-32 pb-24 relative min-h-screen">
      <div className="star-bg" />
      
      <div className="container mx-auto px-4 max-w-5xl">
        <MotionSection className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif gold-gradient-text mb-4">Swadhyay</h1>
          <p className="text-muted-foreground uppercase tracking-widest text-sm">Musings, Poetry, Courses & Free Resources</p>
        </MotionSection>

        {/* Let's Tango with Tarot — Course */}
        <MotionSection delay={0.05} className="mb-12">
          <div className="bg-card/30 backdrop-blur border border-border p-8 md:p-12 rounded glow-hover relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
            <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
              <h2 className="text-2xl font-serif text-foreground">Let's Tango with Tarot</h2>
              <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-[10px] uppercase tracking-widest rounded shrink-0">Course · 1:1 Coaching</span>
            </div>
            <p className="text-primary text-xs uppercase tracking-widest mb-4">Learn & Serve · Personalised Coaching</p>
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

        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-12" />

        <div className="grid md:grid-cols-12 gap-8">
          
          {/* Main Content */}
          <div className="md:col-span-8 space-y-8">

            {/* Blog Articles */}
            <MotionSection delay={0.1}>
              <div className="border border-border bg-card/40 p-8 rounded glow-hover">
                <div className="flex items-center gap-3 mb-8">
                  <BookOpen className="text-primary" size={24} />
                  <h2 className="text-2xl font-serif">Recent Transmissions</h2>
                </div>
                
                <div className="space-y-8">
                  {blogs.map((post, i) => (
                    <article key={i} className={`pb-8 ${i < blogs.length - 1 ? "border-b border-border/50" : ""}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] text-primary uppercase tracking-widest">{post.category}</span>
                        {post.featured && (
                          <span className="text-[9px] px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded uppercase tracking-widest">Featured</span>
                        )}
                      </div>
                      <Link href={post.href}>
                        <h3 className="text-xl font-serif text-foreground mt-1 mb-3 hover:text-primary transition-colors cursor-pointer leading-snug">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                      <Link href={post.href} className="inline-flex items-center gap-2 text-xs tracking-widest uppercase border-b border-foreground/30 pb-1 hover:border-primary hover:text-primary transition-colors">
                        Read Full Article <ArrowRight size={10} />
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </MotionSection>

            {/* Poetry Section */}
            <MotionSection delay={0.2}>
              <div className="border border-border bg-card/40 p-8 rounded glow-hover relative overflow-hidden">
                <PenTool className="absolute top-8 right-8 text-primary/20 w-24 h-24 rotate-12" />
                <h2 className="text-2xl font-serif text-primary mb-6">Published Poetry</h2>
                <p className="text-muted-foreground mb-6 font-light">
                  thekosmictrinity is the author of 4 Hindi Poetry books exploring the depths of the human experience, love, loss, and spiritual awakening.
                </p>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((book) => (
                    <div key={book} className="flex items-center justify-between p-4 border border-border/50 rounded bg-background/50 hover:border-primary/30 transition-colors">
                      <div>
                        <h4 className="font-serif text-foreground">Hindi Poetry Book Volume {book}</h4>
                        <p className="text-xs text-muted-foreground mt-1">Available on Amazon</p>
                      </div>
                      <button className="text-xs tracking-widest uppercase text-primary border-b border-primary/30 pb-1">Buy</button>
                    </div>
                  ))}
                </div>
              </div>
            </MotionSection>

          </div>

          {/* Resources Sidebar */}
          <MotionSection delay={0.3} className="md:col-span-4 space-y-8">
            <div className="bg-secondary border border-primary/20 p-6 rounded sticky top-28">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="text-primary" size={20} />
                <h3 className="text-lg font-serif">Free Resources</h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <Link href="/journal/rising-sign" className="block p-3 border border-border bg-card/50 rounded hover:border-primary/50 transition-colors group">
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Unlock Your Rising Sign</h4>
                    <p className="text-xs text-muted-foreground mt-1">Free Article · Astrology</p>
                  </Link>
                </li>
                <li>
                  <Link href="/journal/elemental-magic" className="block p-3 border border-border bg-card/50 rounded hover:border-primary/50 transition-colors group">
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Elemental Magic Ritual Guide</h4>
                    <p className="text-xs text-muted-foreground mt-1">Free Guide · Rituals</p>
                  </Link>
                </li>
                <li>
                  <Link href="/journal/tarot-yearbook" className="block p-3 border border-border bg-card/50 rounded hover:border-primary/50 transition-colors group">
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Tarot Year Book 2026</h4>
                    <p className="text-xs text-muted-foreground mt-1">Free Guidebook · Kosmic Journal</p>
                  </Link>
                </li>
                <li>
                  <Link href="/journal/summer-solstice" className="block p-3 border border-border bg-card/50 rounded hover:border-primary/50 transition-colors group">
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Summer Solstice Tarot Spread</h4>
                    <p className="text-xs text-muted-foreground mt-1">Free Article · Cosmic Events</p>
                  </Link>
                </li>
              </ul>

              <div className="mt-8 pt-8 border-t border-border/50 text-center">
                <h4 className="font-serif text-sm mb-3">Join the Newsletter</h4>
                <p className="text-xs text-muted-foreground mb-4">Receive cosmic updates and poetic musings directly in your inbox.</p>
                <div className="flex flex-col gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full bg-background border border-border p-2 rounded text-sm focus:outline-none focus:border-primary"
                  />
                  <button className="w-full bg-primary/10 text-primary border border-primary p-2 rounded text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </MotionSection>

        </div>
      </div>
    </div>
  );
}
