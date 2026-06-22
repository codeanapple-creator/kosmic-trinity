import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { MotionSection, FadeIn } from "@/components/ui/motion-section";

const zodiacElements = [
  { sign: "Aries", symbol: "♈", element: "Fire" },
  { sign: "Taurus", symbol: "♉", element: "Earth" },
  { sign: "Gemini", symbol: "♊", element: "Air" },
  { sign: "Cancer", symbol: "♋", element: "Water" },
  { sign: "Leo", symbol: "♌", element: "Fire" },
  { sign: "Virgo", symbol: "♍", element: "Earth" },
  { sign: "Libra", symbol: "♎", element: "Air" },
  { sign: "Scorpio", symbol: "♏", element: "Water" },
  { sign: "Sagittarius", symbol: "♐", element: "Fire" },
  { sign: "Capricorn", symbol: "♑", element: "Earth" },
  { sign: "Aquarius", symbol: "♒", element: "Air" },
  { sign: "Pisces", symbol: "♓", element: "Water" },
];

const elementColors: Record<string, string> = {
  Fire: "text-orange-400 border-orange-500/30 bg-orange-900/10",
  Earth: "text-green-400 border-green-500/30 bg-green-900/10",
  Air: "text-sky-400 border-sky-500/30 bg-sky-900/10",
  Water: "text-blue-400 border-blue-500/30 bg-blue-900/10",
};

const elements = [
  {
    name: "Fire",
    emoji: "🔥",
    essence: "Energy, drive, passion. Action, transformation and bold changes.",
    science: "Thermal Energy & Combustion — Fire rituals create a sense of closure, reducing emotional attachment through visual destruction.",
    manifestation: ["Write a wish on paper and place it near a candle or diya daily.", "Flame gazing — visualize desires manifesting.", "Charge an object in sunlight with focused intention. Keep it as a charm.", "Cooking with intention, stirring clockwise for attraction.", "Burn bay leaves with written desires and let the smoke carry them."],
    release: ["Write fears on paper and burn them safely.", "Burn herbs (like rosemary or sage) to release stagnant energy.", "Stand under sunlight, imagining worries dissolving in its warmth.", "Flame gazing with cleansing intention before bedtime."],
  },
  {
    name: "Water",
    emoji: "💧",
    essence: "Emotion, intuition and healing. Emotional release and spiritual growth.",
    science: "Dr. Masaru Emoto's experiments suggest water molecules change structure based on emotions and intentions. Water is a universal solvent — it dissolves impurities physically and energetic imprints symbolically.",
    manifestation: ["Speak affirmations into a glass of water and drink it.", "Place a written wish under a bowl of water overnight.", "Moon water charging.", "Drink structured water — visualize desires while stirring clockwise."],
    release: ["Take a shower visualizing negativity washing away.", "Write worries on dissolvable paper and place them in water.", "Cry intentionally to release emotional burdens.", "Place saltwater in a bowl to absorb negativity, then discard."],
  },
  {
    name: "Earth",
    emoji: "🌿",
    essence: "Stability, practicality, and grounding. Building, grounding and securing material success.",
    science: "Soil and salt have high cation-exchange capacities, absorbing toxins and neutralising static charge. Earthing (walking barefoot) stabilises electrical imbalances, reducing cortisol and inflammation.",
    manifestation: ["Bury a wish-written paper under a tree or in a pot.", "Plant seeds with a focused intention for growth.", "Carry a small natural stone charged with desires. Work with crystals.", "Walk barefoot on grass, visualizing energy grounding you."],
    release: ["Bury old worries written on paper and let nature absorb them.", "Composting your kitchen waste.", "Use salt to absorb negative energy, then discard it.", "Scatter dried leaves while naming things you're letting go of."],
  },
  {
    name: "Air",
    emoji: "🌬️",
    essence: "Intellect, communication and mental clarity. Ideas and social connections.",
    science: "Deep breathing increases oxygen flow, activating the parasympathetic nervous system. Sound frequencies through chanting, singing or speaking affirmations modulate brainwave states, reinforcing belief systems.",
    manifestation: ["Whisper desires into the wind or a deep breath.", "Chant affirmations or visualize while breathing deeply.", "Burn incense with an intention and let the smoke carry it.", "Write wishes on paper and blow on them before storing."],
    release: ["Write regrets on paper, scatter the ash or torn paper into the wind.", "Take deep breaths, exhaling old energy forcefully.", "Burn dried herbs and waft the smoke around you.", "Stand in a windy place and mentally release burdens."],
  },
];

export default function ElementalMagic() {
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
            Harnessing the Elemental Magic
          </h1>
          <p className="text-muted-foreground text-lg italic mb-6">For Manifestation & Release Rituals</p>
          <div className="w-16 h-px bg-primary/50 mb-8" />
          <p className="text-xs text-primary/60 uppercase tracking-widest">Elemental Magic by Kosmic Trinity</p>
        </MotionSection>

        <div className="space-y-8 mt-10 text-muted-foreground leading-relaxed font-light">

          <FadeIn delay={0.1}>
            <h2 className="text-2xl font-serif text-foreground mb-4">What Are Elements?</h2>
            <p>
              In nature, the elements — Fire, Earth, Air and Water — are fundamental forces that govern the flow of energy in our lives via different mediums. Each element has a unique influence on your personality, emotional state and even your ability to manifest desires or release old patterns.
            </p>
            <p className="mt-4">
              Our five senses are a channel to harness our 6th Sense — our intuition better. A woman's body is a special conduit to use the elemental energy in her daily life for better vitality and cleansing. This is why elements of nature have an important role when we perform rituals to work with the subconscious mind and even higher energy dimensions.
            </p>
            <p className="mt-4">
              In astrology, all 12 Zodiac Signs are classified into these four elements, and our Birth-Charts can help us pinpoint which exclusive elemental energy is unique to us. Awareness about your own dominant element(s) can make the rituals more personal and impactful.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="p-6 border border-primary/20 rounded bg-card/30">
              <h3 className="text-lg font-serif text-foreground mb-4">The General Thumb Rule</h3>
              <div className="grid sm:grid-cols-3 gap-3 text-sm text-center">
                <div className="p-3 rounded border border-primary/20 bg-background/50">
                  <p className="text-primary font-medium">New Moons</p>
                  <p className="text-xs mt-1">For Manifestations & Intention Setting</p>
                </div>
                <div className="p-3 rounded border border-primary/20 bg-background/50">
                  <p className="text-primary font-medium">Full Moons</p>
                  <p className="text-xs mt-1">For Release Work</p>
                </div>
                <div className="p-3 rounded border border-orange-500/30 bg-orange-900/5">
                  <p className="text-orange-400 font-medium">Eclipses</p>
                  <p className="text-xs mt-1">Release Only — NO Manifestations</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-2xl font-serif text-foreground mt-10 mb-4">Zodiac Signs & Their Elements</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {zodiacElements.map((item) => (
                <div key={item.sign} className={`p-3 border rounded text-center ${elementColors[item.element]}`}>
                  <div className="text-xl mb-1">{item.symbol}</div>
                  <div className="text-xs font-medium">{item.sign}</div>
                  <div className="text-[10px] opacity-80 mt-0.5">{item.element}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <h2 className="text-2xl font-serif text-foreground mt-10 mb-2">Which Houses to Look At?</h2>
            <p className="mb-5">Our birth chart is divided into 12 houses which signify different areas of our life. For wishes and release, we look at:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 border border-primary/20 rounded bg-card/30">
                <p className="text-primary font-serif text-sm uppercase tracking-widest mb-2">For Manifestations</p>
                <div className="space-y-2 text-sm">
                  <p><span className="text-foreground font-medium">House 11</span> — Social circles, gains, desires and wishes. Perfect for manifesting new ideas, goals, and lucky connections.</p>
                  <p><span className="text-foreground font-medium">House 9</span> — Higher learning, luck, philosophies, and expansion. Manifest personal growth and rewire new beliefs.</p>
                </div>
              </div>
              <div className="p-4 border border-primary/20 rounded bg-card/30">
                <p className="text-primary font-serif text-sm uppercase tracking-widest mb-2">For Release</p>
                <div className="space-y-2 text-sm">
                  <p><span className="text-foreground font-medium">House 8</span> — Transformation, deep emotional healing, and letting go. Release deeply rooted patterns.</p>
                  <p><span className="text-foreground font-medium">House 12</span> — Endings, the subconscious, and spirituality. Ideal for releasing past emotional baggage.</p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm italic">
              To check your house cusps, visit any free Western Astrology chart calculator like <span className="text-primary">horoscopes.astro-seek.com/birth-chart-horoscope-online</span> and look at the "Houses" panel for your House 8, 9, 11 and 12 signs.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h2 className="text-2xl font-serif text-foreground mt-12 mb-6">The Four Elements — Rituals & Tools</h2>
            <div className="space-y-8">
              {elements.map((el) => (
                <div key={el.name} className={`border rounded-lg overflow-hidden ${elementColors[el.name].split(" ").slice(1).join(" ")}`}>
                  <div className={`px-6 py-4 border-b ${elementColors[el.name].split(" ")[1]}`}>
                    <h3 className={`text-xl font-serif ${elementColors[el.name].split(" ")[0]}`}>{el.emoji} {el.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{el.essence}</p>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-xs italic text-muted-foreground/70 mb-4 border-l-2 border-primary/20 pl-3">{el.science}</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-primary text-xs uppercase tracking-widest mb-2">✦ Manifestation Rituals</p>
                        <ul className="space-y-1.5">
                          {el.manifestation.map((r, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex gap-2">
                              <span className="text-primary/50 shrink-0 mt-0.5">·</span>{r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-primary text-xs uppercase tracking-widest mb-2">✦ Release Rituals</p>
                        <ul className="space-y-1.5">
                          {el.release.map((r, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex gap-2">
                              <span className="text-primary/50 shrink-0 mt-0.5">·</span>{r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.35}>
            <div className="mt-10 p-8 border border-primary/30 rounded bg-card/20 backdrop-blur relative overflow-hidden text-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.06),transparent_70%)]" />
              <div className="relative z-10">
                <p className="text-primary uppercase tracking-widest text-xs mb-4">Remember</p>
                <p className="font-serif text-xl gold-gradient-text mb-4">
                  Real Magic Is In Your Intention
                </p>
                <p className="text-muted-foreground text-sm">
                  Also, emphasize on your personal element but do not fuss over sticking to just one element or tool or method. Flow with your intuition and weave the magic of elements even in your daily life. Consistency reaps greatest results.
                </p>
                <p className="text-primary text-sm mt-4 font-serif">✦ Elemental Magic by Kosmic Trinity ✦</p>
              </div>
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
