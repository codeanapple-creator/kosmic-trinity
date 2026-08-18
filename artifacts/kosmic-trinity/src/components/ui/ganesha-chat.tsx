import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";
import bodhiImg from "../../assets/bodhi_nobg.png";
import { useOverlay } from "@/contexts/overlay-context";

type Message = { from: "ganesha" | "user"; text: string };

const WISDOM: { keywords: string[]; responses: string[] }[] = [
  // ── IDENTITY & GREETINGS ─────────────────────────────────────────────────
  {
    keywords: ["who are you", "what are you", "your name", "bodhi", "ganesha", "ganesh", "ganapati"],
    responses: [
      "Om! I am Bodhi 🐘 - a little spark of Ganapati's enlightened wisdom, born to sit at the threshold of Kosmic Trinity and welcome every seeker who arrives. Ask me anything!",
      "My name is Bodhi - it means *enlightenment* in Sanskrit ✨. I carry the spirit of Ganapati: the remover of obstacles, lord of new beginnings. My broken tusk wrote the Mahabharata itself - so you know I take wisdom seriously! 😄",
    ],
  },
  {
    keywords: ["hello", "namaste", "hey there", "greet", "good morning", "good evening", "good afternoon"],
    responses: [
      "Om Namaste, dear seeker! 🐘✨ I am Bodhi, your cosmic guide at Kosmic Trinity. Ask me about your dharma, your relationships, your abundance path - or simply share what weighs on your heart.",
      "Om Shri Ganeshaya Namah! Welcome, beautiful soul. I am Bodhi - and the stars brought you here for a reason. What question lives in your heart today?",
    ],
  },

  // ── WHAT IS KOSMIC TRINITY / GENERAL INFO ────────────────────────────────
  {
    keywords: ["kosmic trinity", "what is this", "about this", "what do you do", "this website", "this platform", "you do here"],
    responses: [
      "Kosmic Trinity is a space where ancient wisdom meets self-awareness. Through Astrology, Tarot, and intuitive guidance, we help you explore your *Dharma* (purpose), *Artha* (abundance), and *Kaam* (relationships). As the Upanishads say, *'Ātmanam viddhi'* — Know thyself. 🕉️\n\nWould you like to know which session may support your current situation?\n\n✨ Explore *Dharma*, *Artha*, or *Kaam* offerings based on the life question calling you most right now.",
    ],
  },
  {
    keywords: ["how can you help", "how will this", "what can i get", "what do you offer", "help with my life", "how do you help", "what do you provide", "how does this work"],
    responses: [
      "Life often gives us questions before it gives answers. Kosmic Trinity helps you understand your patterns, gifts, relationships, career path, and inner calling through personalized guidance. The Bhagavad Gita reminds us - *'Yogaḥ karmasu kauśalam'* — Excellence comes through conscious action. 🌟\n\nWould you like to know which session may support your current situation?\n\n🌱 Purpose → *Swadharm Session*\n💰 Money & career → *Samriddhi Session*\n❤️ Relationships → *Sayujya Session*",
    ],
  },
  {
    keywords: ["predictions", "just astrology", "only astrology", "tarot or", "astrology or", "how is this different from", "not just predictions", "what kind of"],
    responses: [
      "Astrology and Tarot are tools for reflection and awareness, not fixed predictions. They help you understand your inner landscape and make conscious choices. We blend astrology, tarot, psychology, neuroscience, and ancient wisdom — not to tell you what will happen, but to help you meet life with greater clarity. The Vedas remind us, *'Ātmanam viddhi'* — Know thyself. ✨\n\nWould you like to know which session may support your current situation?\n\n🌱 Feeling unsure where to begin → *Swadharm Session*",
    ],
  },
  {
    keywords: ["new to this", "beginner", "first time", "never done this", "where do i start", "how to begin", "just starting", "where should i start", "how do i start"],
    responses: [
      "Welcome, dear seeker. You don't need to know everything before beginning — start with the question your heart is carrying today. The journey of self-discovery begins with curiosity. *'Tamaso mā jyotir gamaya'* — Lead me from darkness to light. 🕉️\n\nWould you like to know which session may support your current situation?\n\n🌱 Feeling lost → *Soulcalling Guidebook*\n✨ Seeking deeper understanding → *Swadharm Session*\n🌞 Current life phase clarity → *Soulfarm Season Reading*",
    ],
  },
  {
    keywords: ["which reading", "which session", "which service", "best for me", "recommend", "suggest", "what should i book", "where to start", "which one", "what would you"],
    responses: [
      "The right session depends on the area where you seek clarity — your life has many dimensions, and each requires a different lens. 🌟\n\nWould you like to know which session may support your current situation?\n\n🌱 Purpose & patterns → *Soulcalling Guidebook* or *Swadharm Session*\n🌞 Current timing → *Soulfarm Season Reading*\n💰 Money & career → *Samriddhi Session* / *SARTHAK* / *Power of Pentacles*\n❤️ Relationships → *Sayujya Session*\n👶 Children → *Santati Session*\n🎨 Creativity & expression → *Srijan*\n🌊 To weave all three holistically → *TRIVENI*",
    ],
  },
  {
    keywords: ["different from other", "why choose you", "what makes you", "unique about", "why should i", "better than other", "special about"],
    responses: [
      "Kosmic Trinity brings together ancient wisdom and practical living. Instead of looking at life through only one lens, we integrate *Dharma* (purpose), *Artha* (abundance), and *Kaam* (love and creative expression) through astrology, tarot, financial guidance, and mindful creativity. We believe spirituality is not separate from everyday life — it should shape the way you love, earn, create, and become. 🕉️\n\nWould you like to know which session may support your current situation?\n\n🌊 *TRIVENI* — our most integrative offering, weaving all three pillars together.",
    ],
  },

  // ── PURPOSE & DHARMA ─────────────────────────────────────────────────────
  {
    keywords: ["lost", "purpose", "dharma", "soul", "calling", "mission", "why am i here", "find my purpose", "no direction", "what am i meant", "what is my purpose", "find direction"],
    responses: [
      "Feeling lost is sometimes the soul's invitation to look deeper. The Bhagavad Gita says, *'Svadharme nidhanam shreyah'* — Better to follow your own path than imitate another's. Your birth chart carries clues about your gifts, tendencies, and lessons. 🌟\n\nWould you like to know which session may support your current situation?\n\n🌱 *Soulcalling Guidebook* — to decode your deeper birth intention\n✨ *Swadharm Session* — for a live exploration of patterns and purpose",
      "The Upanishads remind us - *'Tat tvam asi'* - Thou art That. Your dharma is not a role you play; it is the truth of what you already are. Your purpose is not hidden from you — it is written in your very nature. 🕉️\n\nWould you like to know which session may support your current situation?\n\n🌱 *Soulcalling Guidebook* — decode your soul's intention through your birth chart\n✨ *Swadharm Session* — a deeper, personalised live exploration",
    ],
  },
  {
    keywords: ["stuck", "keep failing", "nothing is working", "nothing works", "trying my best", "same mistake", "same lesson", "keep repeating", "unseen pattern", "not moving forward", "not progressing"],
    responses: [
      "Sometimes the obstacle is not effort — it is an unseen pattern repeating beneath the surface. Ancient wisdom teaches that awareness is the first step toward liberation. When you understand your cycles, you can respond differently rather than react the same way. 🐘\n\nWould you like to know which session may support your current situation?\n\n✨ *Swadharm Session* — to explore repeating patterns, unfinished cycles, and the Dharma your soul is moving toward\n🌞 *Soulfarm Season Reading* — to understand what this current phase is asking from you",
      "*'न हि ज्ञानेन सदृशं पवित्रमिह विद्यते॥'* — There is nothing in this world as purifying as true knowledge. Life often repeats a lesson until we become conscious of the pattern behind it. Awareness creates the possibility of a new response. 🌟\n\nWould you like to know which session may support your current situation?\n\n✨ *Swadharm Session* — identify repeating patterns and the deeper Dharma guiding your evolution",
    ],
  },
  {
    keywords: ["what am i meant", "how do i know my purpose", "true calling", "my gifts", "natural talent", "my strengths", "what should i do with my life", "meant to do"],
    responses: [
      "Your purpose is not something you must forcefully find — it is something you gradually uncover. Your natural gifts, tendencies, and life experiences carry clues. *'Yad bhavam tad bhavati'* — What you deeply hold within shapes your becoming. 🌟\n\nWould you like to know which session may support your current situation?\n\n🌱 *Soulcalling Guidebook* — discover your gifts, karmic tasks, and soul intentions through your birth chart\n✨ *Swadharm Session* — to explore patterns, cycles, and the Dharma your soul is moving toward",
    ],
  },
  {
    keywords: ["don't know what", "no idea what i want", "confused about", "what do i really want", "lost touch with", "don't know what i want", "no idea anymore"],
    responses: [
      "Sometimes confusion appears when an old version of you is ready to transform. Give yourself permission to pause and listen inward. The Upanishads remind us that true knowledge always begins within — not outside. 🕉️\n\nWould you like to know which session may support your current situation?\n\n✨ *Swadharm Session* — reconnect with your deeper purpose\n🌞 *Soulfarm Season Reading* — understand your current cosmic season and what this phase is asking from you",
    ],
  },
  {
    keywords: ["natal chart", "birth chart", "astrology tell", "astrology and purpose", "astrology really", "can astrology"],
    responses: [
      "Astrology is not a sentence written in stone — it is a symbolic map of your potentials. Like a seed contains the possibility of a tree, your birth chart reflects the qualities you can cultivate. Knowing the nature of the seed, you can take aligned actions and grow to your highest potential. 🌱\n\nWould you like to know which session may support your current situation?\n\n✨ *Swadharm Session* — personalised birth chart exploration with deeper discussion around your soul patterns",
    ],
  },

  // ── RELATIONSHIPS & KAAM ─────────────────────────────────────────────────
  {
    keywords: ["wrong people", "wrong person", "attract wrong", "toxic relationship", "why do i attract", "wrong partner", "bad relationship", "keep attracting", "ending up with"],
    responses: [
      "Often, we attract relationships that mirror the beliefs, wounds, and patterns we carry within. This is not about blame — it is about awareness. As the Upanishads remind us, *'Yatha pinde tatha brahmande'* — As within, so is reflected outside. 🌙\n\nWould you like to know which session may support your current situation?\n\n❤️ *Sayujya Session* — to understand relationship patterns, emotional loops, love language, and the deeper soul dynamics influencing your connections",
    ],
  },
  {
    keywords: ["same pattern", "relationships always", "relationships keep", "relationship keeps", "same type of person", "relationships end", "relationships fail", "relationships never work"],
    responses: [
      "When the same story appears repeatedly, life may be inviting you to understand its deeper lesson. Awareness transforms patterns into wisdom. Your relationships are not just experiences — they are teachers on your journey. 🌟\n\nWould you like to know which session may support your current situation?\n\n❤️ *Sayujya Session* — explore unresolved emotional loops, recurring relationship themes, and the way your soul experiences love",
    ],
  },
  {
    keywords: ["find partner", "right partner", "right person", "will i find love", "will i find the", "when will i meet", "soulmate", "life partner", "find the right"],
    responses: [
      "A meaningful relationship is not only about finding the right person — it is also about becoming aware of yourself. Astrology can reveal your relationship tendencies and emotional needs, so that you find the most optimally aligned partner. *'Sa hi sarvasya sarvatah pujyah'* — That love which sees the divine in another is the highest worship. ✨\n\nWould you like to know which session may support your current situation?\n\n❤️ *Sayujya Session* — understand your relationship patterns, desires, love language, and the qualities that support deeper connection",
    ],
  },
  {
    keywords: ["understand my relationship", "relationship better", "improve my relationship", "communicate better", "love language", "partner and i"],
    responses: [
      "Every relationship has its own language of love, conflict, and connection. Understanding each other's emotional world can transform even the most challenging bond. As the Gita teaches, clarity brings harmony to action. The Vedas speak of *Ardhanarishvara* — the divine union of Shiva and Shakti. 🌹\n\nWould you like to know which session may support your current situation?\n\n❤️ *Sayujya Session* — gain insights into relational dynamics, emotional patterns, conflicts, and your unique way of giving and receiving love",
    ],
  },
  {
    keywords: ["love", "relationship", "partner", "kaam", "heart", "marriage", "compatible", "is he right", "is she right", "right for me"],
    responses: [
      "A relationship cannot be measured only by attraction. It also involves emotional compatibility, shared growth, communication, and mutual understanding. Astrology can offer perspective, but conscious choices create lasting bonds. Synastry is the cosmic language of love — two charts overlay like constellations, revealing karmic ties that span many lifetimes. 🌙\n\nWould you like to know which session may support your current situation?\n\n❤️ *Sayujya Session* — explore soul connections, relationship dynamics, and deeper patterns within your partnership",
      "The Vedas speak of *Ardhanarishvara* - the divine union of Shiva and Shakti. Every relationship is a mirror reflecting your own evolution. What does yours show you? Your connections are never accidental. 🌹\n\nWould you like to know which session may support your current situation?\n\n❤️ *Sayujya Session* — understand the soul contract and deeper dynamics shaping your relationships",
    ],
  },

  // ── MONEY, CAREER & ARTHA ────────────────────────────────────────────────
  {
    keywords: ["struggle with money", "money problems", "broke", "never have enough", "financial struggle", "money stress", "bank account", "no money", "financially", "work hard but"],
    responses: [
      "Money is not only about effort — it is also connected with beliefs, habits, confidence, and the ability to receive. Ancient wisdom teaches that *Shri* — Goddess Lakshmi — is *Chanchala*, ever flowing. Astrology teaches you to tame that flow and live a rich, aligned life. 💛\n\nWould you like to know which session may support your current situation?\n\n💰 *Samriddhi Session* — identify wealth patterns, subconscious blocks, career direction, and decisions influencing your financial flow",
    ],
  },
  {
    keywords: ["career aligned", "right career", "right job", "career purpose", "work purpose", "career and passion", "job and passion", "career match", "career right"],
    responses: [
      "Your work can become an expression of your natural gifts when aligned with your inner strengths. Your birth chart carries clues about talents and possibilities waiting to be explored. *'Karmanye vadhikaraste'* — You have the right to your actions; let them be rooted in your dharma. 🌟\n\nWould you like to know which session may support your current situation?\n\n📖 *SARTHAK – A Book of Money Magic* — discover your tangible talents, money element, and earning potential\n💰 *Samriddhi Session* — for deeper career clarity and professional decisions",
    ],
  },
  {
    keywords: ["change career", "change my job", "switch career", "leave my job", "start a business", "quit my job", "new career", "different career", "career change"],
    responses: [
      "Big decisions become easier when you understand both your inner calling and the timing of your journey. Astrology can help you reflect on possibilities — but your wisdom and willpower create the new path. The Gita reminds us, *'Yogaḥ karmasu kauśalam'* — Excellence comes through conscious, aligned action. 🌱\n\nWould you like to know which session may support your current situation?\n\n💰 *Samriddhi Session* — explore professional shifts, career direction, and alignment between your purpose and abundance",
    ],
  },
  {
    keywords: ["improve finances", "get rich", "earn more", "astrology and money", "help with finances", "financial growth", "improve my money", "increase income", "better financially"],
    responses: [
      "Astrology does not magically hand over a hidden chest of dollars! But it can reveal your strengths, patterns, and opportunities — sometimes even ancestral blockages in your financial health. Wealth grows when awareness meets disciplined effort. *'Karmanye vadhikaraste'* — You have the right to your actions. 💛\n\nWould you like to know which session may support your current situation?\n\n📖 *SARTHAK – A Book of Money Magic* — understand your earning capacity and hidden talents\n💰 *Samriddhi Session* — work through deeper money patterns and career choices",
    ],
  },
  {
    keywords: ["others succeed", "others have it", "not to me", "others but not", "life harder for me", "others are luckier", "so easily to others", "easier for others", "luckier than me", "others seem to", "comes easily to", "easily for others"],
    responses: [
      "Every person has a unique journey, timing, and set of lessons. Comparing paths often hides the wisdom of your own timeline. Your task is not to copy another's journey — it is to understand yours. *'Kala eva sarveshaam balavatah'* — Time is the greatest force; your season is simply different, not lesser. 🌞\n\nWould you like to know which session may support your current situation?\n\n🌞 *Soulfarm Season Reading* — understand your current cosmic season, what to sow, nurture, and harvest\n💰 *Samriddhi Session* — align your career and wealth path with your unique chart",
    ],
  },
  {
    keywords: ["money", "wealth", "abundance", "artha", "finance", "job", "career", "work", "business", "income"],
    responses: [
      "*'Dharmena hi labhante vittam.'* Wealth flows naturally to one aligned with dharma. Your 2nd house and Jupiter placement reveal your abundance blueprint — where grace naturally multiplies your effort. 💛\n\nWould you like to know which session may support your current situation?\n\n💰 *Samriddhi Session* — career clarity, wealth patterns, and abundance alignment\n📖 *SARTHAK – A Book of Money Magic* — your money element, talents, and earning potential",
      "The Arthashastra teaches that wealth is a tool for dharmic living, not an end in itself. When you align your vocation with your soul's purpose, Lakshmi follows. Saturn reveals where you must put in honest effort; Jupiter shows where grace multiplies it. 🌟\n\nWould you like to know which session may support your current situation?\n\n💰 *Samriddhi Session* — deeper money patterns and career alignment",
    ],
  },

  // ── PERSONAL GROWTH & INNER CLARITY ─────────────────────────────────────
  {
    keywords: ["overthinking", "overthink", "thoughts never", "can't stop thinking", "cannot stop thinking", "mind won't", "racing thoughts", "cannot focus", "can't focus", "too many thoughts", "thoughts racing", "my thoughts", "mind keeps", "mind never", "never stop thinking"],
    responses: [
      "An overactive mind often seeks certainty in an uncertain world. Understanding your emotional patterns can help create inner stability. The ancient sages emphasised mastering the mind as the path toward freedom.\n\n*'उद्धरेदात्मनाऽत्मानं नात्मानमवसादयेत्।'* — Bhagavad Gita 6.5 — *Elevate yourself through the power of your own mind; do not let yourself fall. For the mind alone can be your friend, and the mind alone can be your enemy.* 🕉️\n\nWould you like to know which session may support your current situation?\n\n✨ *Swadharm Session* — explore the deeper patterns shaping your thoughts and life choices",
    ],
  },
  {
    keywords: ["disconnected", "lost myself", "not myself", "feel empty", "feel numb", "numb lately", "empty inside", "don't recognise", "don't feel like myself", "completely numb"],
    responses: [
      "Disconnection can be a gentle invitation to return inward. Before finding answers outside, we reconnect with the wisdom already within. *'Tat Tvam Asi'* — You are That; the essence you seek is within you. 🕉️\n\nWould you like to know which session may support your current situation?\n\n✨ *Swadharm Session* — a personal exploration of your journey, to help you find your way back to yourself",
    ],
  },
  {
    keywords: ["help with real", "real life problems", "actual problems", "spirituality practical", "does this actually help", "practical guidance", "life problems", "everyday problems"],
    responses: [
      "True spirituality is not an escape from life — it is a way to meet life with greater wisdom. It allows us to connect to our spirit and live with joy, alignment, and highest potential, like a GPS that helps you reach your destination and navigate roadblocks. 🌟\n\nWould you like to know which session may support your current situation?\n\n🌱 Purpose → *Swadharm Session*\n❤️ Relationships → *Sayujya Session*\n💰 Money & career → *Samriddhi Session*\n🌞 Current timing → *Soulfarm Season Reading*",
    ],
  },

  // ── SEASON / TIMING ──────────────────────────────────────────────────────
  {
    keywords: ["future", "destiny", "what will happen", "when will", "transit", "timing", "what is coming", "season", "phase"],
    responses: [
      "The Jyotisha traditions teach - *'Kala eva sarveshaam balavatah.'* Time is the greatest force. Transits reveal not fate, but seasons — when to plant and when to harvest. 🌞\n\nWould you like to know which session may support your current situation?\n\n🌞 *Soulfarm Season Reading* — understand your current cosmic season and what this phase is asking of you",
      "The stars do not dictate your choices; they illuminate them. Your solar return and current progressions are a cosmic weather report — not a verdict. A skilled reader reads the map; you still choose the road. ✨\n\nWould you like to know which session may support your current situation?\n\n🌞 *Soulfarm Season Reading* — clarity on your current cycle and the timing of your journey",
    ],
  },

  // ── CHILDREN / SANTATI ───────────────────────────────────────────────────
  {
    keywords: ["child", "children", "kid", "baby", "santati", "parenting", "my son", "my daughter"],
    responses: [
      "Children are souls with their own dharma, arriving into a family that carries its own karmic field. Understanding a child's birth chart can reveal their natural gifts, learning style, and the kind of environment they thrive in. 🌱\n\nWould you like to know which session may support your current situation?\n\n👶 *Santati Session* — for insight into your child's nature, gifts, and soul journey",
    ],
  },

  // ── CREATIVITY & SRIJAN ──────────────────────────────────────────────────
  {
    keywords: ["creativity", "creative", "art", "expression", "srijan", "block creativity", "creative block", "artistic"],
    responses: [
      "Creativity is the soul speaking in its native language. *Srijan* — meaning creation — is one of the most sacred acts: to slow down, pick up a brush, a pen, or a piece of clay, and let your soul speak without words. No prior experience needed — only presence and willingness. 🎨\n\nWould you like to know which session may support your current situation?\n\n🎨 *Srijan* — a mindful Zen Art Session with Smriti, designed to reconnect you with your inner world through the sacred act of making",
    ],
  },

  // ── KARMA & PAST LIVES ────────────────────────────────────────────────────
  {
    keywords: ["karma", "karmic", "past life", "rebirth", "reincarnation"],
    responses: [
      "*'Yad bhavam tad bhavati'* - As you feel, so you become. Karma is not punishment; it is the universe's perfect accounting. Every soul chooses its lessons before birth. The South Node in your chart holds the echoes of past-life mastery. The North Node points toward what your soul came to learn. 🌙\n\nWould you like to know which session may support your current situation?\n\n✨ *Swadharm Session* — explore your karmic patterns, soul lessons, and the Dharma you are moving toward",
    ],
  },

  // ── FEAR & DIFFICULTY ─────────────────────────────────────────────────────
  {
    keywords: ["fear", "anxiety", "worry", "stress", "pain", "struggle", "difficult time", "hard time", "going through a lot"],
    responses: [
      "The Gita says - *'Nainam chindanti shastrani'* - The soul cannot be cut by any weapon, nor burned by fire. Whatever storm you face, your essence is untouchable. Fear is the shadow of attachment. Breathe, seeker — the stars that seemed against you may simply be asking you to grow. 🐘\n\nWould you like to know which session may support your current situation?\n\n✨ *Swadharm Session* — to understand the deeper pattern beneath what you are going through\n🌞 *Soulfarm Season Reading* — to see where you are in your cycle and what this season is teaching you",
    ],
  },

  // ── BOOKING ───────────────────────────────────────────────────────────────
  {
    keywords: ["book", "booking", "appointment", "how to book", "how do i book", "consult", "session price", "how much"],
    responses: [
      "How auspicious that you seek a reading! 🌟 Head to our *Booking* page — choose Dharma, Artha, or Kaam, and let thekosmictrinity illuminate your cosmic blueprint. Each session is a sacred conversation with your chart.\n\nWould you like to know which session may support your current situation?\n\n🌱 Purpose → *Swadharm Session* | 💰 Abundance → *Samriddhi Session* | ❤️ Relationships → *Sayujya Session* | 🌊 All three → *TRIVENI*",
    ],
  },
  {
    keywords: ["reading", "service", "what sessions do you have", "what do you offer", "offerings", "products"],
    responses: [
      "Kosmic Trinity offers a wide range of sessions, each designed for a specific area of life. 🌟\n\nWould you like to know which session may support your current situation?\n\n🌱 *Soulcalling Guidebook* — discover your gifts through your birth chart\n✨ *Swadharm Session* — purpose & patterns\n🌞 *Soulfarm Season Reading* — current timing & cycles\n💰 *Samriddhi Session* — money & career clarity\n📖 *SARTHAK* — your money element & talents\n❤️ *Sayujya Session* — relationships & love\n👶 *Santati Session* — for your children\n🎨 *Srijan* — mindful creativity\n🌊 *TRIVENI* — all three pillars woven together",
    ],
  },

  // ── MEDITATION & SPIRITUALITY ─────────────────────────────────────────────
  {
    keywords: ["meditation", "spiritual", "god", "divine", "universe", "consciousness", "atma", "self", "inner peace"],
    responses: [
      "*'Aham Brahmasmi'* - I am Brahman, the infinite. This is not arrogance; it is the deepest recognition the Upanishads offer. Your consciousness is not separate from the cosmos.",
      "The Mandukya Upanishad speaks of four states: waking, dreaming, deep sleep, and *Turiya* - pure awareness beyond all three. Meditation is the doorway to Turiya. Even five minutes of stillness each morning is the most powerful practice the ancients gave us. ✨",
      "Ramana Maharshi's teaching was simple: *'Who am I?'* Keep asking. Keep peeling. The one who asks and the answer are the same. 🕉️",
    ],
  },

  // ── MANTRA ────────────────────────────────────────────────────────────────
  {
    keywords: ["mantra", "chant", "japa", "prayer", "hymn", "stotra", "shloka"],
    responses: [
      "🕉️ For clarity and new beginnings, chant *Om Gam Ganapataye Namah* - 108 times each morning. Ganapati removes all obstacles and opens every sacred door.\n\nFor inner peace, *Om Shanti Shanti Shanti* - three times, letting each Shanti dissolve a layer of restlessness.",
      "The *Gayatri Mantra* is the mother of all mantras 🌟 -\n*Om Bhur Bhuvah Svaha, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat.*\nChant at dawn, facing east. It awakens the solar intelligence within your own consciousness.",
      "Begin with *So Hum* - *I am That* - inhaling *So*, exhaling *Hum*. This is the mantra the breath itself chants 21,600 times a day whether you notice or not. 🐘 Bringing awareness to it is one of the most natural meditations the ancients gave us.",
    ],
  },

  // ── MOON & CYCLES ─────────────────────────────────────────────────────────
  {
    keywords: ["moon", "lunar", "emotion", "feeling", "moon sign", "ritual"],
    responses: [
      "The Moon is the mind itself - *'Chandrama manaso jatah'* - the Moon was born from the cosmic mind. Your Moon sign reveals how your soul feels, remembers, and belongs. Every lunation is an invitation: new moons plant seeds; full moons harvest them. 🌕",
    ],
  },

  // ── TAROT ─────────────────────────────────────────────────────────────────
  {
    keywords: ["tarot", "card", "oracle", "divination", "tarot reading"],
    responses: [
      "Cards are a mirror, not a crystal ball 🌟 - every card reflects a truth already living inside you. The archetypes map the soul's journey. The cards do not predict a fixed future — they reveal the energy you are currently moving with.\n\nWould you like to know which session may support your current situation?\n\n✨ Book a card + astrology fusion session with thekosmictrinity for the deepest clarity.",
    ],
  },

  // ── REIKI & ENERGY HEALING ────────────────────────────────────────────────
  {
    keywords: ["reiki", "energy", "healing", "chakra", "aura", "vibration", "frequency"],
    responses: [
      "Reiki is the ancient understanding that *prana* - life-force energy - flows through all living beings. When that flow is blocked, dis-ease follows. Your birth chart can even reveal which chakras tend toward imbalance — Saturn often constricts, Jupiter expands, Mars ignites. 🌿\n\nEven five minutes of conscious breath is the Reiki you give yourself. 🕉️",
    ],
  },

  // ── GENERAL WISDOM / GUIDANCE ─────────────────────────────────────────────
  {
    keywords: ["wisdom", "guidance", "guide", "right path", "direction", "advice", "help me", "what should i do"],
    responses: [
      "The *Mundaka Upanishad* says - *'Brahmavidya sarvavidya pratishtha'* - Knowledge of the Self is the foundation of all knowledge. Every outer question eventually leads to one inner question: Who am I?\n\nStart there. The path becomes clear when you know who is walking it. 🕉️\n\nWould you like to know which session may support your current situation?\n\n✨ *Swadharm Session* — a personalised exploration of your patterns and purpose",
      "Wisdom is not acquired, dear seeker — it is remembered. The truth you seek has always lived within you, waiting for the noise of doubt to quiet. Sit in stillness for even five minutes each morning. The cosmos speaks loudest in silence. 🌟\n\nWould you like to know which session may support your current situation?\n\n🌞 *Soulfarm Season Reading* — understand your current cosmic season and what it is asking of you",
    ],
  },
];

const OPENING_QUOTES = [
  "*'Yatra yogeshvarah krishno yatra partho dhanur-dharah, tatra shrir vijayo bhutir dhruva nitir matir mama.'*\n\nWherever there is Krishna, the lord of yoga, and wherever there is Arjuna, the archer, there will also certainly be opulence, victory, extraordinary power, and morality - that is my opinion.\n- Bhagavad Gita 18.78 ✨",
  "*'Tameva bhantam anubhati sarvam, tasya bhasa sarvam idam vibhati.'*\n\nIt is the Light of Consciousness alone that illumines everything. By that light, all this universe shines.\n- Mundaka Upanishad 🌟",
  "*'Sarve bhavantu sukhinah, sarve santu niramayah, sarve bhadrani pashyantu, ma kashchid duhkhabhag bhavet.'*\n\nMay all be happy. May all be free from disease. May all see what is auspicious. May none suffer.\n- Ancient Vedic Prayer 🕉️",
  "*'Asato ma sadgamaya, tamaso ma jyotirgamaya, mrityor ma amritam gamaya.'*\n\nLead me from the unreal to the real. Lead me from darkness to light. Lead me from death to immortality.\n- Brihadaranyaka Upanishad ✨",
  "*'Uddhared atmanatmanam natmanam avasadayet, atmaiva hy atmano bandhur atmaiva ripur atmanah.'*\n\nLet a man lift himself by himself; let him not degrade himself. For the Self alone is the friend of the self, and the Self alone is the enemy of the self.\n- Bhagavad Gita 6.5 🌟",
  "*'Na jayate mriyate va kadachin nayam bhutva bhavita va na bhuyah, ajo nityah shashvato yam purano na hanyate hanyamane sharire.'*\n\nThe soul is never born, nor dies. Having once existed, it does not cease to be. It is unborn, eternal, ever-existing, and primeval - it is not slain when the body is slain.\n- Bhagavad Gita 2.20 🕉️",
];

const FALLBACKS = [
  "The Upanishads say - *'Satyam eva jayate'* - Truth alone triumphs. Sit with your question a little longer; the answer already lives within you.\n\nIf you seek deeper clarity, a personal reading with thekosmictrinity can illuminate what the stars are whispering to you specifically. 🕉️",
  "Every sincere question is a prayer, and the cosmos always answers - sometimes through insight, sometimes through timing, sometimes through a person who arrives exactly when needed. ✨\n\nTell me more - are you navigating love, purpose, abundance, or something else? I am here.",
  "*'Tam eva sharanam gaccha'* - Take refuge in That which is eternal. The divine is closer than your own breath, seeker. Whatever weighs on you right now, it is workable. The planets are not against you - they are for your growth. 🐘",
  "I sense you carry a question that is still finding its words. That is perfectly sacred - not all wisdom arrives as a sentence. Breathe. Sit. Then ask again, and I will do my best to meet you there. 🌟",
  "Some questions are portals, not problems. Let me ask you this: what would your life look like if the answer arrived tomorrow? That vision - *that* is the mantra your soul is already chanting. 🕉️",
];

function getOpeningMessage(): Message {
  const quote = OPENING_QUOTES[Math.floor(Math.random() * OPENING_QUOTES.length)];
  return {
    from: "ganesha",
    text: `Om Namaste! 🐘✨ I am Bodhi - your cosmic wisdom guide at Kosmic Trinity.\n\nA gift of ancient wisdom as you arrive:\n\n${quote}\n\nAsk me about dharma, love, abundance, karma, or anything that weighs on your soul.`,
  };
}

function pickResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const group of WISDOM) {
    if (group.keywords.some((k) => lower.includes(k))) {
      return group.responses[Math.floor(Math.random() * group.responses.length)];
    }
  }
  return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
}

function renderText(text: string) {
  return text.split(/(\*[^*]+\*|🐘|✨|🌟|🕉️|🌕|🌙|😄|💛|🌿)/).map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i} className="text-primary not-italic font-medium">{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function GaneshaChat() {
  const { activeOverlay, toggleOverlay } = useOverlay();
  const open = activeOverlay === "chat";

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  function handleOpen() {
    if (activeOverlay !== "chat" && messages.length === 0) {
      setMessages([getOpeningMessage()]);
    }
    toggleOverlay("chat");
  }

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, typing]);

  function send() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { from: "user", text: trimmed }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { from: "ganesha", text: pickResponse(trimmed) }]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      {/*
        Chat toggle button.
        z-[75]: ABOVE the nav overlay (z-[60]) and nav button (z-[70]) so the
        chat button is always tappable. On Android, a user tapping it while the
        nav is open will close the nav and open the chat (mutual exclusivity
        via OverlayContext.toggleOverlay).
        touch-action: manipulation — removes 300 ms tap delay on Android WebView.
      */}
      <button
        onClick={handleOpen}
        aria-label={open ? "Close Bodhi wisdom chat" : "Open Bodhi wisdom chat"}
        style={{ touchAction: "manipulation" }}
        className="fixed bottom-6 right-6 z-[75] w-20 h-20 rounded-full
          flex items-center justify-center overflow-hidden
          bg-background border-2 border-primary/70
          shadow-[0_0_22px_rgba(201,168,76,0.55)]
          hover:shadow-[0_0_36px_rgba(201,168,76,0.85)]
          transition-all duration-300 hover:scale-105
          animate-[pulse-glow_4s_ease-in-out_infinite]"
      >
        {open ? (
          <X size={20} className="text-primary" />
        ) : (
          <img
            src={bodhiImg}
            alt="Bodhi"
            draggable={false}
            className="w-[92%] h-[92%] object-contain"
          />
        )}
      </button>

      {/*
        Chat window.
        z-[65]: above the nav overlay (z-[60]) but below the nav toggle button
        (z-[70]) and chat button (z-[75]).
        Rendered conditionally (not just hidden) so it's fully removed from the
        DOM — and from Android's compositing layer tree — when closed.
      */}
      {open && (
        <div
          className="fixed bottom-28 right-6 z-[65] w-[340px] max-w-[calc(100vw-2rem)]
            bg-background border border-primary/40 rounded-lg shadow-[0_0_40px_rgba(201,168,76,0.2)]
            flex flex-col overflow-hidden"
          style={{ height: "480px" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-primary/20 bg-card/40 shrink-0">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/40 overflow-hidden shrink-0 flex items-center justify-center">
              <img src={bodhiImg} alt="Bodhi" className="w-[90%] h-[90%] object-contain" />
            </div>
            <div className="min-w-0">
              <p className="font-serif text-sm text-primary tracking-wide leading-none">Bodhi</p>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase mt-0.5">Cosmic Wisdom Guide · बोधि</p>
            </div>
            <Sparkles size={14} className="text-primary/50 ml-auto shrink-0" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/20">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                {m.from === "ganesha" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 overflow-hidden shrink-0 mt-0.5 flex items-center justify-center">
                    <img src={bodhiImg} alt="Bodhi" className="w-[88%] h-[88%] object-contain" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                    m.from === "ganesha"
                      ? "bg-card/60 border border-primary/20 text-foreground font-light"
                      : "bg-primary/20 border border-primary/30 text-foreground text-right"
                  }`}
                >
                  {m.text.split("\n").map((line, li) => (
                    <p key={li} className={li > 0 ? "mt-1.5" : ""}>{renderText(line)}</p>
                  ))}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 overflow-hidden shrink-0 flex items-center justify-center">
                  <img src={bodhiImg} alt="Bodhi" className="w-[88%] h-[88%] object-contain" />
                </div>
                <div className="bg-card/60 border border-primary/20 rounded-lg px-4 py-3 flex gap-1 items-center">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="w-1.5 h-1.5 rounded-full bg-primary/60"
                      style={{ animation: `twinkle 1.2s ease-in-out infinite ${d * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-primary/20 bg-card/20 shrink-0">
            <div className="flex gap-2 items-end">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask Ganapati…"
                className="flex-1 resize-none bg-background/60 border border-border rounded px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors leading-relaxed"
                style={{ maxHeight: "80px" }}
              />
              <button
                onClick={send}
                disabled={!input.trim()}
                className="w-9 h-9 rounded flex items-center justify-center bg-primary text-primary-foreground
                  hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <Send size={14} />
              </button>
            </div>
            <p className="text-[9px] text-muted-foreground/40 text-center mt-2 tracking-widest uppercase">
              Bodhi · Om Shri Ganeshaya Namah
            </p>
          </div>
        </div>
      )}
    </>
  );
}
