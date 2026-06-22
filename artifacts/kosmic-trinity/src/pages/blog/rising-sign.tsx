import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { MotionSection, FadeIn } from "@/components/ui/motion-section";

const risingSigns = [
  { sign: "Aries Rising", desc: "Social, Leader, survival intelligence, blunt, often quick to speak or act." },
  { sign: "Taurus Rising", desc: "Practical, consistent, steady, drawn to comfort and beauty." },
  { sign: "Gemini Rising", desc: "Communicative, curious, quick-witted, enjoys conversation." },
  { sign: "Cancer Rising", desc: "Kind, nurturing, protective, often cautious at first." },
  { sign: "Leo Rising", desc: "Charismatic, expressive, warm, and naturally noticeable." },
  { sign: "Virgo Rising", desc: "Practical, analytical, humble, sometimes reserved." },
  { sign: "Libra Rising", desc: "Charming, polite, friendly, and harmony-seeking." },
  { sign: "Scorpio Rising", desc: "Deep, magnetic, mysterious, often intense in presence." },
  { sign: "Sagittarius Rising", desc: "Adventurous, enthusiastic, energetic, loves exploration." },
  { sign: "Capricorn Rising", desc: "Mature, disciplined, responsible, often perceived as reserved." },
  { sign: "Aquarius Rising", desc: "Independent, unconventional, creative, values individuality." },
  { sign: "Pisces Rising", desc: "Sensitive, dreamy, perceptive, artistic, and gentle." },
];

export default function RisingSign() {
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
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">Astrology</p>
          <h1 className="text-3xl md:text-5xl font-serif gold-gradient-text mb-6 leading-tight">
            Stop Fixating at Your Sun Sign, Unlock Your Rising Sign First
          </h1>
          <div className="w-16 h-px bg-primary/50 mb-8" />
        </MotionSection>

        <div className="prose-kosmic space-y-6 text-muted-foreground leading-relaxed font-light">

          <FadeIn delay={0.1}>
            <p>
              Astrology is having its moment. Beyond horoscopes in the daily paper and trendy memes about Mercury retrograde, more and more people are discovering the nuance and insight their birth charts can offer.
            </p>
            <p className="mt-4">
              You may already know your sun sign — what most people mean when they talk about their "zodiac sign." But the other two pillars of your chart, the Moon sign and the Rising sign, are equally fascinating and crucial to explore. Together, they make the <span className="text-foreground font-medium">BIG THREE</span> of your chart and say a lot about your personality. So, what exactly is a rising sign? How do you find yours? Let's take a closer look at why your ascendant holds such an important place in your astrological portrait.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h2 className="text-2xl font-serif text-foreground mt-10 mb-4">What Is a Rising Sign?</h2>
            <p>
              Your rising sign, also called your "ascendant," is the zodiac sign that was rising on the eastern horizon at the exact moment of your birth. Imagine standing outside at dawn during that precise moment — whichever constellation was appearing over the skyline becomes your ascendant.
            </p>
            <p className="mt-4">
              Your sun sign, moon sign, and rising sign each contribute something unique to your astrological identity. Here's how they differ:
            </p>
            <ul className="mt-4 space-y-3 border-l-2 border-primary/30 pl-6">
              <li><span className="text-foreground font-medium">Your sun sign</span> reflects your essential nature. The "real you", The "Aatma."</li>
              <li><span className="text-foreground font-medium">Your moon sign</span> speaks to your inner emotional world and unconscious desires.</li>
              <li><span className="text-foreground font-medium">Your rising sign</span> shapes the external layer — how you approach new situations, interact socially, and the energy you project to strangers and acquaintances.</li>
            </ul>
            <p className="mt-4">
              In many ways, the ascendant acts like a filter between you and the outside world, influencing both how you perceive life and how others perceive you.
            </p>
            <p className="mt-4">
              Astrologers consider the rising sign especially significant because it not only describes your outward personality, but also determines the arrangement of the twelve houses in your birth chart. These houses influence every area of life, including relationships, career, health, and more. The ascendant serves as the "starting point," giving your chart its unique structure.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-2xl font-serif text-foreground mt-10 mb-4">How Your Rising Sign Affects You</h2>
            <p>The influence of the rising sign can feel subtle or very noticeable, depending on the rest of your chart. Its impact is often seen in several important areas of life.</p>

            <h3 className="text-lg font-serif text-primary mt-6 mb-2">First Impressions & Social Interactions</h3>
            <p>
              Your ascendant shapes the aura people sense when they first meet you. Some astrologers refer to it as a kind of "mask." For example, someone with Capricorn rising may come across as serious and professional, even if their Sun sign is Sagittarius — a sign often associated with wisdom, exploration and zest for life. Together, these combinations create a much more layered and nuanced personality.
            </p>

            <h3 className="text-lg font-serif text-primary mt-6 mb-2">Physical Appearance</h3>
            <p>
              The ascendant also gives a hint about physical appearance and body language. Aries risings, for example, are often described as having bold or sharp facial features and an energetic walk. Taurus risings may carry themselves with steadiness and possess features often considered classically beautiful. While these observations are not absolute rules, many people find them surprisingly accurate.
            </p>
            <p className="mt-4">
              On a subtler level, your rising sign can influence how you navigate daily life. It shapes instinctive reactions, the way you approach challenges, and your overall perspective on the world. It often shows up in personal style, priorities, habits, and even preferences in fashion or interior design. In many ways, it reflects your relationship with life itself.
            </p>

            <h3 className="text-lg font-serif text-primary mt-6 mb-2">Relationships</h3>
            <p>
              Your rising sign can also play a role in romantic compatibility. Sometimes, the people you immediately click with may have placements that naturally harmonize with your ascendant. This often creates an easy, effortless chemistry right from the beginning.
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <h2 className="text-2xl font-serif text-foreground mt-10 mb-4">What You Need to Find Your Rising Sign</h2>
            <p>
              Finding your rising sign requires more precise information than determining your sun sign. While a lot of people born during the same month may share the same sun sign, the Rising sign changes roughly every two hours. So, two people born on same month, same day but few hours apart may have different rising signs and hence, feel completely different. This is why you may not resonate with generic horoscopes like "Scorpios are blood thirsty for vengeance!!"
            </p>
            <p className="mt-4">To find your rising sign, you will need:</p>

            <div className="mt-4 space-y-4">
              <div className="p-4 border border-primary/20 rounded bg-card/30">
                <h4 className="text-foreground font-medium mb-1">Exact Time of Birth</h4>
                <p className="text-sm">As the ascendant changes roughly every two hours, even a difference of 15–30 minutes can result in a different rising sign. If your birth time is unknown, an astrologer may use a process called chart rectification based on important life events to arrive at the most accurate time of your birth.</p>
              </div>
              <div className="p-4 border border-primary/20 rounded bg-card/30">
                <h4 className="text-foreground font-medium mb-1">Place of Birth</h4>
                <p className="text-sm">Your geographical location affects which sign was rising on the eastern horizon at the moment you were born. Even people born at the same hour in different places can have different ascendants.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h2 className="text-2xl font-serif text-foreground mt-10 mb-6">A Bird's Eye View of All 12 Rising Signs</h2>
            <p className="mb-6">Every rising sign carries its own distinct energy and style. This is a general overview of what the world sees in you and your projections —</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {risingSigns.map((item) => (
                <div key={item.sign} className="p-4 border border-primary/20 rounded bg-card/30 hover:border-primary/40 transition-colors">
                  <h4 className="text-primary font-serif text-sm mb-1">{item.sign}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm italic">
              This gives a rough idea, and as soon as you see these Rising Signs in the light of their Ruler, Dispositor, planets sitting in 1st house, layers start revealing.
            </p>
          </FadeIn>

          <FadeIn delay={0.35}>
            <div className="mt-10 p-8 border border-primary/30 rounded bg-card/20 backdrop-blur relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.06),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="text-2xl font-serif gold-gradient-text mb-4">Did you learn something new?</h2>
                <p className="mb-4">
                  Your ascendant is one of the foundational pieces of your astrological identity. It shapes how others perceive you and influences the way you step into new experiences. Most of the generic horoscopes you read on the Internet actually take the rising sign as a base.
                </p>
                <p>
                  Exploring your rising sign opens the door to a deeper layer of self-understanding beyond just your sun sign. When you calculate your full natal chart, you may begin to see yourself through an entirely new lens — one that feels richer, more nuanced, and uniquely your own.
                </p>
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
