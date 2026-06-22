import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { MotionSection, FadeIn } from "@/components/ui/motion-section";

const cards = [
  {
    num: 1, name: "The Magician", theme: "Conscious Creation & Aligned Will",
    affirmation: "My Life Is Everything I Make It.",
    content: `A Magician year arrives like a quiet magic. You begin to notice how often you shape outcomes without realising it — through your words that become spells, through habits repeated unconsciously or choices made on autopilot. This year results show faster as per your intention.\n\nYou are no longer meant to drift or dabble. This is a year that asks for precision. Your energy wants direction. Your skills want respect. You may feel an urge to finally claim an ability you once downplayed, or to take yourself more seriously in an area you treated as "just a hobby" or "not that important." Forget perfection, be Present.\n\nWhat makes this year powerful is awareness. This is not about controlling everything but more about choosing consciously where your attention goes, because attention is the raw material of creation.\n\nLearning, refining, practising — all of these are favored. So is honesty. Empty promises, performative confidence, or scattered effort drain you faster this year.\n\nUsed wisely, this year teaches you that power comes from focus and magic is not in some divine blessing but in little, consistent rituals that you focus on daily.`,
  },
  {
    num: 2, name: "The High Priestess", theme: "Inner Authority & Subtle Knowing",
    affirmation: "My Intuition is My Trustworthy Friend.",
    content: `A High Priestess year arrives very softly, asking you to listen rather than act. While the world may be cheering loudly to welcome 2026, for you 2026 whispers magical things in your ears. On the surface, life may seem quieter or slower, but beneath that stillness, deep internal rearrangements are taking place.\n\nThis is a year where answers come in unexpected ways — through dreams, emotional responses, bodily sensations, sudden knowing that doesn't need proof. You may find yourself less interested in sharing everything, less inclined to justify your choices, and more protective of your inner world. You will move towards discernment.\n\nThe challenge of this year lies in impatience. The mind wants clarity immediately, but the Priestess works on her own timeline. When you push for answers, confusion will grow. This is a powerful year for inner work — journaling, therapy, spiritual study, meditation, or any practice that strengthens your relationship with yourself. Boundaries matter deeply now. Energy leaks cannot be taken lightly, and your silence will be medicinal. Don't be afraid of it.\n\nYou are learning to trust yourself without external validation. The more you honour what is still forming within you, the clearer your path becomes.`,
  },
  {
    num: 3, name: "The Empress", theme: "Nourishment, Creativity & Organic Growth",
    affirmation: "Love and beauty flow through my life like an eternal river.",
    content: `An Empress year feels like being invited back into your body, your senses, and your capacity to receive. 2026 will show you that growth does not come from effort alone — it comes from care and ease, too. What you nurture patiently begins to thrive.\n\nThis year often highlights themes of creativity, emotional connection, pleasure, and well-being. You may feel drawn to beautify your surroundings, deepen bonds, or give attention to something that has been waiting for your love and care. The Empress reminds you that life flourishes when it feels safe. It also reminds you to savour the fruits you have so lovingly nurtured all these years. Kids, creative projects, love and leisure may be prominent for this year.\n\nThe year will make you realise that Rest is not laziness. It is part of the process and so is joy and softness. Through physical, emotional and creative nourishment, all burnout may dissolve. This is also a year of recalibrating self-worth. You learn that you don't need to earn love, rest, or enjoyment by overgiving. Receiving will now come without guilt. Stop forcing timelines and growth will surprise you this year.`,
  },
  {
    num: 4, name: "The Emperor", theme: "Structure, Responsibility & Self-Leadership",
    affirmation: "I trust and depend on my own power.",
    content: `The King has arrived (BGM: Azeem-o-Shaan Shehenshah!!!). This year asks you to stand upright in your own life. It is a call towards responsibility which arises out of self-esteem and not as a burden. This is the year where structure becomes a form of self-care. You do things because you want to and not because you have to.\n\nYou may be asked to make firm decisions, set clearer boundaries, or take on leadership externally or within yourself. Chaos no longer feels creative, it feels draining. Systems, routines, and long-term planning become stabilising forces rather than constraints. So, be it your home life or business, this year asks to bring systems in place. Lead, delegate, supervise — all with empathy.\n\nBoundaries become more important than ever because a King protects his empire — his essence, else the energy starts scattering and enemies encroach. This year favours consistency over intensity, commitment over passion.\n\nIf resisted, the year can feel heavy or restrictive. If embraced, it becomes deeply empowering — offering a sense of solidity and trust in your own capacity to lead your life.`,
  },
  {
    num: 5, name: "The Hierophant", theme: "Meaning, Values & Lived Wisdom",
    affirmation: "Alignment with my true values is what makes me wiser.",
    content: `What values do I actually live by?\n\nThis is going to be a question you will ask yourself throughout the year. Not what you claim to believe. Not what you inherited unquestioned. But what your daily choices reveal as truth.\n\nThis year draws attention to the frameworks that shape your life — belief systems, traditions, commitments, moral codes, and the invisible rules you follow. Some of these structures offer support and continuity, while others may feel outdated, hollow, or restrictive. The Hierophant will not ask you for rebellion or blind obedience but he will ask for conscious alignment.\n\nYou may feel drawn toward learning, returning to study, seeking a mentor, deepening spiritual practice, or exploring philosophy, psychology, or ancestral wisdom. At the same time, you may find yourself becoming a guide for others, even informally.\n\nYou will be unable to cope with hypocrisy this year, where actions are far from values. This year exposes places where you say one thing and do another, not to shame you, but to invite coherence. It is a beautiful opportunity to align your beliefs and actions. The change in your mindset will invite several people who want to learn from you.`,
  },
  {
    num: 6, name: "The Lovers", theme: "Choice, Alignment & Honest Commitment",
    affirmation: "I choose Love and accept myself.",
    content: `A Lovers year is often misunderstood as a purely romantic passage. In truth, it is a year of profound self-confrontation through choice. Every decision becomes a mirror. Every commitment reflects what you value and what you avoid.\n\nThis year asks you to notice where you are torn in yourself. Where do you want two incompatible things? Where do you postpone decisions because the outcome feels uncomfortable? The Lovers teaches that avoidance is also a choice — and often the most draining one.\n\nRelationships may take centre stage this year, but not only romantic ones. Partnerships, friendships, family bonds, and even your relationship with work or purpose ask for honesty. You may find yourself renegotiating agreements, spoken or unspoken, and redefining what "commitment" truly means to you.\n\nChoosing consciously does not guarantee ease, but when inner values and outer actions align, energy stops leaking. Life becomes simpler, even when it remains complex.\n\nThere may be moments where you realise that choosing one path means letting something else go — an old identity, a version of yourself, or a familiar comfort. Ultimately, this year teaches you love in its purest form — for self, for others, for life.`,
  },
  {
    num: 7, name: "The Chariot", theme: "Directed Momentum & Willpower",
    affirmation: "I steer my life in my chosen direction and move forward with inner alignment.",
    content: `A Chariot year brings motion. All stuck traffic — plans, ambitions, external circumstances — clear away. But this doesn't guarantee a pothole-free highway. You are still being asked to steer with inner coordination. You may feel a surge of drive, urgency, or desire to "get somewhere." Goals become very sharp and you will be keener in finding your direction. Yet the Chariot is not about speed alone, it is about control without rigidity. Emotional regulation becomes essential. If unresolved feelings pull you in opposite directions, movement towards any goal becomes exhausting.\n\nThis year teaches disciplined momentum. You are asked to hold the reins firmly, without strangling yourself. To know when to push forward, when to take a U-turn, when to recalibrate. Your willpower to keep going becomes your medicine.\n\nYou will relish victory in some long-overdue projects or personal matters. This victory is not over others but a proof of self-mastery. And remember, it's a pit stop — so challenges that arise are not meant to stop you, they are meant to refine your focus.\n\n2026 can be a productive, decisive year if you commit to clarity. When the purpose/destination is fed into GPS, movement becomes meaningful — else it's just an exhausting long drive.`,
  },
  {
    num: 8, name: "Strength", theme: "Quiet Courage & Emotional Mastery",
    affirmation: "I meet life with calm courage and compassionate strength.",
    content: `2026 will reshape your understanding of power. This is not a year that rewards force, domination, or emotional suppression. Instead, it teaches you the art of staying present with intensity — even if that intensity comes as fear, anger, vulnerability, desire, or self-doubt.\n\nThis year often brings situations that test emotional resilience. You may notice old triggers resurfacing because you now have the capacity to meet them differently. Where you once reacted, you are now asked to respond. In situations you once shut down, now, you will be invited to stay open without losing yourself.\n\nThe lion in this card is not an enemy. It represents instinct, passion, and raw emotion. Strength does not demand that you cage or kill it. Instead, it asks you to build a relationship with it. A relationship based on trust, patience, and compassion. This is a year of learning how to hold strong feelings without being consumed by them.\n\nYou may also notice a shift in how you define courage. It becomes quieter, less performative. You will recognise the gentle power of saying "NO", asking for help without shame, and choosing rest over proving yourself.\n\nWhen lived consciously, this becomes profoundly empowering. This is a year with the Shakti of Durga. Own it.`,
  },
  {
    num: 9, name: "The Hermit", theme: "Inner Authority, Sacred Solitude & Wise Choices",
    affirmation: "I enjoy the melody of my Silence.",
    content: `This is a personal favourite year because it brings one closer to themselves, unlike any other year. Life gradually pulls your attention away from external validation, constant opinions, and collective noise, directing you inward. This is a year of intentional solitude, where clarity is born through listening. You may find that activities, conversations, or environments that once energised you now feel draining or unnecessary. There will be a strong desire to simplify life — fewer explanations, obligations and distractions. You will know where your true joy is.\n\nYou may re-evaluate beliefs you've lived by for years, goals you've chased on autopilot or identities you've worn because everyone wanted you to. But do not rush answers. Insight unfolds slowly this year, in layers, revealing itself only when you stop forcing conclusions. You will start enjoying your own company more than any other.\n\nThis year, you are learning to sit with your thoughts, fears, and longings without immediately seeking distraction or reassurance. Over time, this builds unshakable inner authority.\n\nThe lantern the Hermit carries does not illuminate the entire future. It lights only the next step. This teaches trust — trust in timing, trust in intuition, trust in the intelligence of the process. Wisdom gained in this year will be your long term compass.`,
  },
  {
    num: 10, name: "Wheel of Fortune", theme: "Change, Timing & Participation in Life's Cycles",
    affirmation: "Life is a Wheel of Fortune, and it is My Chance to Spin it!",
    content: `A Wheel of Fortune year brings movement — sometimes exhilarating, sometimes unsettling. This is the year where you are reminded, unmistakably, that life is cyclical. Nothing stays fixed. Roles shift, circumstances evolve, and what felt stable may suddenly turn — because that's progression.\n\nThis year often arrives with unexpected changes. Opportunities may appear when you least expect them. Plans may dissolve when you have everything chalked out. Old patterns come to completion, and you feel as if you are enjoying sitting in a grand Ferris wheel of the universe.\n\nYou will catch yourself believing in words like "divine timing", "luck" and "magic." The wisdom lies in recognising when to act and when to wait. Fighting the cycle leads to exhaustion. Moving with it creates momentum.\n\nThis year also highlights karmic themes — plain, simple cause and effect playing out more visibly. Past choices, attitudes, and habits begin to show tangible results.\n\nStability now comes from adaptability. The more flexible your mindset, the smoother the ride. This is a powerful year for growth if you remain curious. Ask Universe, "Show me what miracle is up next?"`,
  },
  {
    num: 11, name: "Justice", theme: "Truth, Accountability & Energetic Balance",
    affirmation: "My Peace is the fruit of Justice I do to myself.",
    content: `2026 becomes a year where truth and clarity replace confusion. Life asks you to look honestly at your choices, actions, and motivations. You will be given a chance to be fair and also be treated fairly.\n\nYou may feel called to make important decisions this year. These decisions carry weight because they shape long-term balance. But Justice does not rush. It asks for thoughtfulness, objectivity, and integrity.\n\nThis year often involves reassessing agreements in relationships, work, or personal commitments. Where have you been over-giving? Where have you avoided accountability? Justice teaches that fairness begins within. You cannot demand balance externally if you abandon it internally.\n\nJustice also strengthens your ethical compass. You become more aware of alignment in your work and life. You rise above simple benefits and rather see what is right. People will rely on your inner compass and wisdom and will also seek your guidance to make decisions in their lives. Your job is to simply speak your truth.\n\nExpect a lot of balance and harmony coming into your life — work, life, relationships — all thanks to the courage you will show to stand in your truth, while also giving space to perspectives.`,
  },
  {
    num: 12, name: "The Hanged Man", theme: "Surrender, Stillness & Perspective Shift",
    affirmation: "I pause. And in pausing, I see things differently.",
    content: `It is said that when Man forces the moment, the moment forces the Man. But anyone who stands with the moment, the moment stands as his. A Hanged Man year has come to alter your relationship with progress. Momentum may feel slow, answers may come with a delay, and efforts may give slow returns. But all this suspension is intentional. Life is asking you to pause, not because you are stuck, but because your perspective needs to change.\n\nThis year often feels uncomfortable for those who are used to control or want constant action. External validation won't arrive as expected, and you will learn to cheer for yourself. Growth now happens internally, through reflection rather than achievement. But the Bonus of this year is New Ideas, Unconventional breakthroughs, understanding hidden motivations, unspoken truths, or alternative meanings. What once felt frustrating will now reveal wisdom.\n\nThis year teaches trust in stillness. And in a hustling bustling world, such a year is a blessing in disguise. To navigate — use tools like automatic writing, headstands, head massages, practising "maun" — silence and stillness, art therapy.`,
  },
  {
    num: 13, name: "Death", theme: "Necessary Endings, Deep Release & Identity Renewal",
    affirmation: "I own my inner Phoenix and rise from the ashes.",
    content: `No, no, no… do not make the mistake of taking this card at face value. But also do not make the mistake of ignoring it either. This year, something in your life reaches a point where continuation is no longer possible without distortion. This is not about dramatic destruction, but just letting the flower wilt, which has lived its life. A chapter now completes, and pretending otherwise becomes more painful than letting go.\n\nWhat ends during a Death year is deeply connected to identity. A role you have outgrown, a way of relating that no longer reflects who you are — or may be a habit that was more for survival than authenticity. This is why the process can feel very raw at times because you are shedding a skin. And this shedding makes us emotional, so let grief be your natural companion here. Even necessary endings carry sadness, nostalgia, and fear of the unknown.\n\nAll of this is a part of transformation, and as the year progresses, space begins to open!! At first it may feel like emptiness but very soon, you will see that it is actually like a land which has been harvested, tilled again and is ready for new seeds. It is where new life will eventually root. This year will bring a lot of patience to you. Gardening and working with plants in their different season, is a beautiful way to channel this year's energy.\n\nVitality will be restored this year and energy that was trapped in maintenance, pretence, or fear will be released. Honour both what was and what is becoming.`,
  },
  {
    num: 14, name: "Temperance", theme: "Integration, Inner Alchemy & Sustainable Harmony",
    affirmation: "Harmony comes to me because I honour rhythm, patience, and balance.",
    content: `2026 arrives like a deep exhale after intensity. It will be soft, patient, and will weave together parts of you that have lived in opposition. This is the year where healing becomes a practice, not a free masterclass that you hop into.\n\nRefinement will come through balance, subtle adjustments and gently remixing flavours in life. You may feel drawn toward moderation in all that you do. This year will bring more respect for your energy. You will know where you're doing excess — over-giving, over-working, over-analysing — and you will be quick to recalibrate.\n\nAll the emotional work you have done must meet practical action this year. Spiritual understanding must ground into daily habits. Small, repeated choices carry enormous power. Relationships will also feel tender and soft. You may find yourself less reactive, more curious, more willing to meet differences halfway. There is a quiet confidence that develops this year, where you know self-regulation.\n\nTemperance is also deeply connected to healing — physical, emotional, and nervous-system level healing. You may be drawn to therapies, routines, or practices that restore equilibrium rather than stimulate extremes. Progress may feel slow, but it is enduring.\n\nThis year teaches alchemy — the art of blending opposites into something new. Logic and intuition. Effort and rest. Independence and connection. Everything in moderation.`,
  },
  {
    num: 15, name: "The Devil", theme: "Confront, Liberate and Reclaim Power",
    affirmation: "I am Free to Choose.",
    content: `2026 brings you passion, pleasure and opportunities to eat, drink and make merry. Expect a lot of party invites, late nights, good food, loud music — and enjoy to the fullest.\n\nHowever, all this comes with a little Statutory Warning 😄 Confrontation with fears around attachment and desires may show up. This year life will allow you to define your idea of pleasure. Are there any addictions in your life — addiction to some people, lifestyle, doom scrolling, a project, a dream or a habit? All that will be exposed and you may notice compulsions more clearly. Compulsive behaviours of overworking, overgiving, emotional dependency, or the need for control.\n\nThe Devil does not represent evil, it represents unconsciousness. This year asks you to become conscious of where pleasure becomes your pain. Where comfort overrides growth. You may realize that certain "choices" were never freely chosen by you. They were inherited, conditioned, or were simply fear-driven.\n\nPower dynamics come into focus this year. Where do you give your power away in exchange for approval, security, or familiarity? The Devil reveals that the cage is often unlocked — but stepping out requires courage.\n\nThis year is deeply somatic. The body speaks clearly now — through stress responses, addictions, attraction, aversion, allergies. Listen to her. Shadow work is important. Naming patterns, redefining boundaries, choosing discomfort over self-betrayal. All this will free you one knot at a time.`,
  },
  {
    num: 16, name: "The Tower", theme: "Truth That Cannot Be Unseen, Collapse That Liberates",
    affirmation: "Like Kali, I allow truth to dismantle what was never meant to endure.",
    content: `2026 is like a Lego Tower coming down, which already had a shaky foundation. You try to put one brick on another, trying to balance and make the tower reach the ceiling, but one unaligned brick and the whole tower comes down. You saw it coming, didn't you? So, what do you do — you use the energy of the year to stop pretending, dismantle what was built on avoidance, fear, or false stability.\n\nThis year any such collapse of belief you relied on, a relationship structure, a professional identity, or a personal narrative may feel abrupt — but it is actually your Life's acceleration so you don't remain trapped in a slow erosion of self.\n\nEmotionally, this year can feel disorienting. The ground beneath you may feel unreliable, and familiar reference points disappear. Do not even try to control anything… let it go down. It wasn't meant to hold your future anyway. 2026 will insist that you not rebuild too quickly. Clarity must come before reconstruction.\n\nAs the year unfolds, a strange relief often follows the initial shock. The pressure to maintain all these illusions will lift off, and you will breathe again. Build again. Use this year to move away from all that is not yours. It is a beautiful chance to clean the slate. This year Maa Kali will be holding you throughout. Work with her. Be with her.\n\nRemember, for a STAR to be born, a gaseous Nebula must collapse.`,
  },
  {
    num: 17, name: "The Star", theme: "Gentle Renewal and Restoration of Faith",
    affirmation: "I am a Star. My destiny is to Shine.",
    content: `2026 reintroduces the possibility of ease that doesn't feel like a fantasy anymore, but as a lived experience. This year is here to restore faith slowly, reminding you that life is still willing to meet you kindly.\n\nThis is a year of deep healing where you will not be asked to relive pain anymore, to prove growth. Instead, you are invited to rest into what feels nourishing, honest, and emotionally safe.\n\nYou will see Hope everywhere and spread it too. You may notice yourself making plans again, trusting people a little more, allowing softness without fear of collapse. This year often supports creative expression, spiritual reconnection, and emotional vulnerability that feels truly magical. You may feel more aligned with your natural rhythm, less pressured to perform or prove. The nervous system begins to settle.\n\nThe Star also asks you to become your own source of reassurance. External validation matters less now — and you learn that hope is not something you wait for. It is actually, something you practice by choosing gentleness again and again.\n\nWith such an inner alignment, this year promises you will shine like a Star in your work, relations and life in general.`,
  },
  {
    num: 18, name: "The Moon", theme: "Moving Ahead with Intuition",
    affirmation: "I wax and wane, shine and become dark too, but like the Moon, I am always whole.",
    content: `A Moon year removes clear signposts. 2026 invites you to develop a different kind of intelligence. One that listens to emotion, sensation, dreams, and subtle inner cues. One that doesn't keep logic on a pedestal.\n\nThis year often feels confusing because it exposes subconscious material, old fears, unprocessed memories, and emotional patterns that rise to the surface to be acknowledged consciously. And the power of this year is that it will help you to be present. Your presence in the here and now will remove all uncertainty and will bring clarity.\n\n2026 will sharpen your intuition like never before. You may feel more sensitive to people, environments, and unspoken words. This sensitivity is not a weakness but information. These are signs and clues to your next steps. Your creative power and imagination will be super. Use the energy to work in these fields.\n\nUncertainty becomes a teacher with whom you learn to sit with — not knowing, resisting the urge to force answers. Over time, a deep self trust will build this year which will instill confidence in future endeavours. Themes around mother and motherhood are prominent. Work with Full Moon and New Moon energies like a sacred ritual. Be consistent with them and they will reveal deeper talents.`,
  },
  {
    num: 19, name: "The Sun", theme: "Visibility, Vitality & Unapologetic Presence",
    affirmation: "I allow my inner Sun to sustain life in and around me.",
    content: `To get a Personal Year as Sun in a Sun Year (2026), is nothing short of a blessing. 2026 brings life back into full color. Your energy is rising again, clarity strengthening, and self-expression feels so natural as if the clouds have been removed. After all, who can cloud the mighty Sun! This is a year of being seen — not for who you perform as, but for who you genuinely are. What is your true shine?\n\nThe Sun year brings a lot of passion, warmth and heat. So you would want to be aware of too much heat, ego clashes or any situations of overconfidence. Shine but do not burn others. In 2026, Joy becomes a compass for you. You rediscover what feels playful, creative, and alive. Confidence grows from self-acceptance and you will see your self-worth beyond what your achievements are. The Sun teaches that authenticity is magnetic.\n\nRelationships thrive when honesty replaces self-censorship but also be considerate. This is a year of personal glow-up!! Use it to the fullest, shine bright and enjoy life with your favourite people. Your brightness will make others find their brightness too. Pursue your big projects, bag your promotions, show your talent, own the stage. This is Your Year!`,
  },
  {
    num: 20, name: "Judgement", theme: "Awakening, Integration of the Past & Conscious Rebirth",
    affirmation: "I allow myself to answer my true calling.",
    content: `A Judgement year is not about being evaluated by an external force; it is about finally hearing yourself clearly and freeing yourself from all kinds of judgement. This is the year when your experiences, choices, mistakes, triumphs — all rise together into awareness and ask to be integrated.\n\nYou may feel an inner call that is difficult to ignore. A deeper purpose. You may have fated encounters too. A Judgement year often coincides with major life reviews — emotional, spiritual, and psychological. You begin to see your past not as a series of unrelated events, but as a coherent narrative that has shaped your capacity, resilience, and wisdom. This year, you will be able to appreciate how far you've come.\n\nOld guilt or shame around being "you" will easily dissolve. You will start giving yourself more grace and stop punishing yourself for asking or being. What once felt like failure now reveals itself as preparation for a new beginning.\n\nThere is also an element of accountability here. Karmic balance as cause and effect. You are asked to take responsibility for your life as it stands. No blame to anyone or anything or even yourself. Simple empowerment. Excuses will lose credibility this year, so you no longer define yourself by what happened to you, but by how you respond now.\n\n2026 can feel like standing at a threshold. The old identity has been outgrown, but the new one requires courage to embody. You choose to live differently now because you see differently. Angels are protecting you all through.`,
  },
  {
    num: 21, name: "The World", theme: "Completion, Wholeness & Embodied Fulfillment",
    affirmation: "I am a child of the Universe. I am whole.",
    content: `While the world is shouting that 2026 is all about new beginnings, new races, new this, new that… your personal year is about the finishing line!! To complete what you started. To close chapters. To integrate all that was scattered or unresolved, and stabilise the identity you always wanted to own. The World represents fulfillment — not as achievement, but as embodiment.\n\nYou may notice a deep sense of recognition this year. A feeling of "this is me" rather than "this is who I'm trying to become." A year of mindful efforts, respecting your energy, strengthening your boundaries and releasing all kinds of hustle and chase. 2026 may carry a sense of closure. Long cycles complete — emotionally, professionally, spiritually — and you will be so satisfied as if you submitted a big assignment. You will see how past experiences, even difficult ones, contributed to your current capacity. Nothing feels wasted.\n\nThe World teaches wholeness through acceptance. You no longer reject parts of yourself that don't fit an ideal. Shadow and light coexist without conflict. This internal harmony creates external ease. There is also a sense of belonging that emerges. You feel more at home in your life, your body, and your choices. External validation matters less because inner coherence has taken its place.\n\nA World year also brings expansion through travel, visibility, recognition, or contribution. You will feel whole and will give because you are full, not because you are seeking completion. 2026 will be remembered as a year where you were exactly where you needed to be, where you grew exactly how you were meant to.`,
  },
];

function calcYearCard(dob: string): { num: number; card: typeof cards[0] } | null {
  const parts = dob.split("-");
  if (parts.length < 2) return null;
  const day = parseInt(parts[2] ?? "0");
  const month = parseInt(parts[1] ?? "0");
  if (!day || !month) return null;

  const digits = (n: number) => String(n).split("").map(Number);
  let sum = [...digits(day), ...digits(month), 2, 0, 2, 6].reduce((a, b) => a + b, 0);
  while (sum > 21) sum = String(sum).split("").map(Number).reduce((a, b) => a + b, 0);
  const card = cards.find((c) => c.num === sum);
  return card ? { num: sum, card } : null;
}

export default function TarotYearbook() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calcYearCard>>(null);

  const handleCalculate = () => {
    setResult(calcYearCard(dob));
  };

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
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">Soul Farm by Kriti</p>
          <h1 className="text-3xl md:text-5xl font-serif gold-gradient-text mb-4 leading-tight">
            The Tarot Year Book for 2026
          </h1>
          <p className="text-muted-foreground text-base italic mb-2">Understanding Themes, Timing & Inner Alignment</p>
          <div className="w-16 h-px bg-primary/50 mb-8" />
        </MotionSection>

        <FadeIn delay={0.1}>
          <p className="text-muted-foreground leading-relaxed font-light mb-4">
            For the past four years, I have been using my Yearly Tarot Card for anchoring the year's theme. It does not predict events in a rigid, fatalistic way, but offers something far more useful. When I know the larger climate I am moving through, my choices become slightly wiser, because the expectations and actions are aligned.
          </p>
          <p className="text-muted-foreground leading-relaxed font-light mb-4">
            So, our Year Card acts like a lens zooming in — what kind of growth life is inviting us into? Whether that growth arrives through action, surrender, healing, confrontation, integration, or completion. Once we understand this overarching energy, we stop fighting the year and start collaborating with it.
          </p>
          <p className="text-muted-foreground leading-relaxed font-light italic mb-10">
            The purpose of this book is served if you use it to walk into the year <span className="text-foreground not-italic font-medium">Aligned and Aware.</span>
          </p>
        </FadeIn>

        {/* Calculator */}
        <FadeIn delay={0.15}>
          <div className="p-8 border border-primary/30 rounded bg-card/20 backdrop-blur mb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.06),transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="text-xl font-serif gold-gradient-text mb-2">Find Your Personal Year Card</h2>
              <p className="text-muted-foreground text-sm mb-6">Enter your date of birth below — the year doesn't matter, only day and month are used.</p>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="flex-1 bg-background border border-border rounded px-4 py-2 text-foreground focus:outline-none focus:border-primary text-sm"
                />
                <button
                  onClick={handleCalculate}
                  disabled={!dob}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded text-xs uppercase tracking-widest font-serif hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reveal My Card
                </button>
              </div>

              {result && (
                <div className="mt-8 p-6 border border-primary/30 rounded bg-background/50">
                  <p className="text-primary uppercase tracking-widest text-xs mb-2">Your 2026 Year Card</p>
                  <h3 className="text-2xl font-serif gold-gradient-text mb-1">{result.card.name}</h3>
                  <p className="text-primary/70 text-sm italic mb-4">{result.card.theme}</p>
                  <div className="space-y-3 text-muted-foreground text-sm leading-relaxed font-light">
                    {result.card.content.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-primary/20 text-center">
                    <p className="font-serif text-primary italic text-sm">"{result.card.affirmation}"</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </FadeIn>

        {/* How to Calculate */}
        <FadeIn delay={0.2}>
          <h2 className="text-2xl font-serif text-foreground mb-4">How to Calculate Manually</h2>
          <div className="p-6 border border-primary/20 rounded bg-card/30 mb-4 text-muted-foreground text-sm leading-relaxed space-y-3">
            <p>1. Take the <strong className="text-foreground">Day and Month</strong> of your birthdate (year of birth not required) and add the digits.</p>
            <p>2. Now, add the digits of <strong className="text-foreground">2026</strong> to the sum from step 1.</p>
            <p>3. After adding all the digits, you should get a number between 1–21. If your number is &gt;21, add the digits again to arrive at a number between 1–21.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 border border-primary/20 rounded bg-card/30">
              <p className="text-primary font-medium mb-2">Example 1</p>
              <p className="text-muted-foreground">DOB: 26.10.1984 → take 26 and 10 only</p>
              <p className="text-muted-foreground">2+6+1+0 = 9</p>
              <p className="text-muted-foreground">9 + 2+0+2+6 = 19</p>
              <p className="text-foreground font-serif mt-2">Year Card: The Sun ☀️</p>
            </div>
            <div className="p-4 border border-primary/20 rounded bg-card/30">
              <p className="text-primary font-medium mb-2">Example 2</p>
              <p className="text-muted-foreground">DOB: 9.3.2002 → take 9 and 3 only</p>
              <p className="text-muted-foreground">9+3 = 12</p>
              <p className="text-muted-foreground">12 + 2+0+2+6 = 22 → 2+2 = 4</p>
              <p className="text-foreground font-serif mt-2">Year Card: The Emperor 👑</p>
            </div>
          </div>
        </FadeIn>

        {/* All Cards Index */}
        <FadeIn delay={0.25}>
          <h2 className="text-2xl font-serif text-foreground mt-14 mb-6">All 21 Year Cards</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {cards.map((card) => (
              <button
                key={card.num}
                onClick={() => setResult({ num: card.num, card })}
                className="p-4 border border-primary/20 rounded bg-card/30 hover:border-primary/50 hover:bg-card/60 transition-all text-left group"
              >
                <span className="text-xs text-primary/60 font-serif">{card.num}</span>
                <p className="text-sm font-serif text-foreground group-hover:text-primary transition-colors mt-0.5">{card.name}</p>
                <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{card.theme}</p>
              </button>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground/60 mt-4">Click any card to read its full theme above ↑</p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-12 p-6 border border-primary/20 rounded bg-card/20 text-center">
            <p className="text-muted-foreground text-sm">
              For deeper insights, personal Tarot readings and Astrology consultations, reach out to Kriti at{" "}
              <a href="https://www.instagram.com/soulfarmbykriti" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@soulfarmbykriti</a>
              {" "}or <a href="mailto:soulfarmbykriti@gmail.com" className="text-primary hover:underline">soulfarmbykriti@gmail.com</a>
            </p>
            <p className="text-primary font-serif text-sm mt-4">✦ Soul Farm by Kriti ✦</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.35}>
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
