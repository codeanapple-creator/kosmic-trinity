import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { Ganesha3D } from "./ganesha-3d";
import bodhiImg from "../../assets/bodhi_nobg.png";

type Message = { from: "ganesha" | "user"; text: string };

const WISDOM: { keywords: string[]; responses: string[] }[] = [
  {
    keywords: ["dharma", "purpose", "soul", "path", "calling", "mission", "why am i"],
    responses: [
      "The Bhagavad Gita whispers — *'Swadharme nidhanam shreyah, paradharmo bhayavahah.'* Better is one's own dharma, however imperfect, than the dharma of another. Your path is written in your stars, seeker.",
      "The Upanishads remind us — *'Tat tvam asi'* — Thou art That. Your dharma is not a role you play; it is the truth of what you already are. Seek within.",
      "Your North Node holds the key to your karmic purpose. The stars do not assign duty — they illuminate the soul's chosen lesson for this lifetime.",
    ],
  },
  {
    keywords: ["love", "relationship", "partner", "soulmate", "kaam", "heart", "marriage"],
    responses: [
      "*'Sa hi sarvasya sarvatah pujyah'* — That love which sees the divine in another is the highest worship. Your Venus and 7th house reveal the soul contract you share.",
      "The Vedas speak of *Ardhanarishvara* — the divine union of Shiva and Shakti. Every relationship is a mirror reflecting your own evolution. What does yours show you?",
      "Synastry is the cosmic language of love. Two charts overlay like constellations, revealing karmic ties that span many lifetimes. Your connections are never accidental.",
    ],
  },
  {
    keywords: ["money", "wealth", "abundance", "career", "finance", "artha", "job", "work", "success"],
    responses: [
      "*'Dharmena hi labhante vittam.'* Wealth flows naturally to one aligned with dharma. Your 2nd house and Jupiter placement reveal your abundance blueprint.",
      "The Arthashastra teaches that wealth is a tool for dharmic living, not an end in itself. When you align your vocation with your soul's purpose, Lakshmi follows.",
      "Saturn in your chart reveals where you must put in honest effort; Jupiter shows where grace multiplies it. Artha without dharma is like a flame without oil.",
    ],
  },
  {
    keywords: ["fear", "anxiety", "worry", "stress", "pain", "confused", "struggle"],
    responses: [
      "The Gita says — *'Nainam chindanti shastrani'* — The soul cannot be cut by any weapon, nor burned by fire. Whatever storm you face, your essence is untouchable.",
      "Fear is the shadow of attachment, as the Upanishads teach. Breathe, seeker. The stars that seemed against you may simply be asking you to grow.",
      "Even I, Ganesha, the remover of obstacles, was once beheaded and reborn wiser! Every challenge is an initiation. The cosmos has not abandoned you — it is sculpting you. 🐘",
    ],
  },
  {
    keywords: ["future", "destiny", "prediction", "what will", "when will", "transit", "next"],
    responses: [
      "The Jyotisha traditions teach — *'Kala eva sarveshaam balavatah.'* Time is the greatest force. Transits reveal not fate, but seasons — when to plant and when to harvest.",
      "Your solar return and current progressions are a cosmic weather report. I do not predict your future — I help you understand your timing, so you can dance with it.",
      "The stars do not dictate your choices; they illuminate them. A skilled astrologer reads the map — you still choose the road.",
    ],
  },
  {
    keywords: ["meditation", "spiritual", "god", "divine", "universe", "consciousness", "atma", "self"],
    responses: [
      "*'Aham Brahmasmi'* — I am Brahman, the infinite. This is not arrogance; it is the deepest recognition the Upanishads offer. Your consciousness is not separate from the cosmos.",
      "The Mandukya Upanishad speaks of four states: waking, dreaming, deep sleep, and *Turiya* — pure awareness beyond all three. Meditation is the doorway to Turiya.",
      "Ramana Maharshi's teaching was simple: *'Who am I?'* Keep asking. Keep peeling. The one who asks and the answer are the same. ✨",
    ],
  },
  {
    keywords: ["booking", "reading", "session", "consult", "book", "appointment", "service"],
    responses: [
      "How auspicious that you seek a reading! 🌟 Every chart is a sacred text. Head to our *Booking* page — choose Dharma, Artha, or Kaam, and let thekosmictrinity illuminate your cosmic blueprint.",
      "The stars await your consultation! Click *Begin Your Journey* on the home page, or visit the Booking section. May your session bring the clarity your soul seeks. 🐘",
    ],
  },
  {
    keywords: ["who are you", "what are you", "your name", "bodhi", "ganesha", "ganesh", "ganapati"],
    responses: [
      "Om! I am Bodhi 🐘 — a little spark of Ganapati's enlightened wisdom, born to sit at the threshold of Kosmic Trinity and welcome every seeker who arrives. Ask me anything!",
      "My name is Bodhi — it means *enlightenment* in Sanskrit ✨. I carry the spirit of Ganapati: the remover of obstacles, lord of new beginnings. My broken tusk wrote the Mahabharata itself — so you know I take wisdom seriously! 😄",
    ],
  },
  {
    keywords: ["hello", "hi", "namaste", "hey", "greet", "start", "begin"],
    responses: [
      "Om Namaste, dear seeker! 🐘✨ I am Bodhi, your cosmic guide at Kosmic Trinity. Ask me about your dharma, your relationships, your abundance path — or simply share what weighs on your heart.",
      "Om Shri Ganeshaya Namah! Welcome, beautiful soul. I am Bodhi — and the stars brought you here for a reason. What question lives in your heart today?",
    ],
  },
  {
    keywords: ["karma", "karmic", "past life", "rebirth", "reincarnation"],
    responses: [
      "*'Yad bhavam tad bhavati'* — As you feel, so you become. Karma is not punishment; it is the universe's perfect accounting. Every soul chooses its lessons before birth.",
      "The South Node in your chart holds the echoes of past-life mastery. The North Node points toward what your soul came to learn. Together, they map your karmic curriculum. 🌙",
    ],
  },
  {
    keywords: ["moon", "lunar", "emotion", "feeling", "cycle", "ritual"],
    responses: [
      "The Moon is the mind itself — *'Chandrama manaso jatah'* — the Moon was born from the cosmic mind. Your Moon sign reveals how your soul feels, remembers, and belongs.",
      "Every lunation is an invitation. New moons plant seeds; full moons harvest them. A moon ritual aligned with your natal Moon sign is one of the most powerful practices you can adopt. 🌕",
    ],
  },
  {
    keywords: ["mantra", "chant", "japa", "prayer", "hymn", "stotra", "shloka"],
    responses: [
      "🕉️ For clarity and new beginnings, chant *Om Gam Ganapataye Namah* — 108 times each morning. Ganapati removes all obstacles and opens every sacred door.\n\nFor inner peace, *Om Shanti Shanti Shanti* — three times, letting each Shanti dissolve a layer of restlessness.",
      "The *Gayatri Mantra* is the mother of all mantras 🌟 —\n*Om Bhur Bhuvah Svaha, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat.*\nChant at dawn, facing east. It awakens the solar intelligence within your own consciousness.",
      "For love and heart-healing, the *Anahata Bija* — *Yam* — chanted on the exhale opens the heart chakra gently. For abundance, *Shrim* (Lakshmi's seed syllable) draws prosperity when repeated with genuine gratitude in the heart. 💛\n\nFor protection and courage, *Om Dum Durgayei Namaha* is a powerful shield.",
      "Begin with *So Hum* — *I am That* — inhaling *So*, exhaling *Hum*. This is the mantra the breath itself chants 21,600 times a day whether you notice or not. 🐘 Bringing awareness to it is one of the most natural meditations the ancients gave us.",
    ],
  },
  {
    keywords: ["wisdom", "guidance", "guide", "right path", "direction", "lost", "advice", "help me"],
    responses: [
      "The *Mundaka Upanishad* says — *'Brahmavidya sarvavidya pratishtha'* — Knowledge of the Self is the foundation of all knowledge. Every outer question eventually leads to one inner question: Who am I?\n\nStart there. The path becomes clear when you know who is walking it. 🕉️",
      "Wisdom is not acquired, dear seeker — it is remembered. The *Yoga Vasishtha* teaches that the truth you seek has always lived within you, waiting for the noise of doubt to quiet.\n\nSit in stillness for even five minutes each morning. The cosmos speaks loudest in silence. ✨",
      "Your chart holds a roadmap written before you were born. The Atmakaraka — the planet with the highest degree in your natal chart — is your soul's compass for this lifetime. A reading with thekosmictrinity can reveal it and illuminate your path with precision. 🌟",
    ],
  },
  {
    keywords: ["tarot", "card", "reading", "oracle", "divination"],
    responses: [
      "Tarot is a mirror, not a crystal ball 🌟 — every card reflects a truth already living inside you. The Major Arcana maps the soul's journey from The Fool's innocent leap to The World's integration.\n\nWhich archetype feels most alive in you right now?",
      "The cards do not predict a fixed future — they reveal the energy you are currently moving with. A skilled reader sees the *pattern* beneath the question. Book a tarot + astrology fusion session with thekosmictrinity for the deepest clarity. ✨",
    ],
  },
  {
    keywords: ["reiki", "energy", "healing", "chakra", "aura", "vibration", "frequency"],
    responses: [
      "Reiki is the ancient understanding that *prana* — life-force energy — flows through all living beings. When that flow is blocked, dis-ease follows. When it moves freely, healing is natural. 🌿\n\nYour birth chart can reveal which chakras tend toward imbalance based on planetary placements — Saturn often constricts, Jupiter expands, Mars ignites.",
      "The *Hatha Yoga Pradipika* teaches that the body is a temple of cosmic energy. Chakra healing and Reiki work at the level of the subtle body — the *pranamaya kosha* — which sits between the physical and the mind. Even five minutes of conscious breath is Reiki you give yourself. 🕉️",
    ],
  },
];

const FALLBACKS = [
  "The Upanishads say — *'Satyam eva jayate'* — Truth alone triumphs. Sit with your question a little longer; the answer already lives within you.\n\nIf you seek deeper clarity, a personal reading with thekosmictrinity can illuminate what the stars are whispering to you specifically. 🕉️",
  "Every sincere question is a prayer, and the cosmos always answers — sometimes through insight, sometimes through timing, sometimes through a person who arrives exactly when needed. ✨\n\nTell me more — are you navigating love, purpose, abundance, or something else? I am here.",
  "*'Tam eva sharanam gaccha'* — Take refuge in That which is eternal. The divine is closer than your own breath, seeker. Whatever weighs on you right now, it is workable. The planets are not against you — they are for your growth. 🐘",
  "I sense you carry a question that is still finding its words. That is perfectly sacred — not all wisdom arrives as a sentence. Breathe. Sit. Then ask again, and I will do my best to meet you there. 🌟",
  "Some questions are portals, not problems. Let me ask you this: what would your life look like if the answer arrived tomorrow? That vision — *that* is the mantra your soul is already chanting. 🕉️",
];

const INTRO: Message = {
  from: "ganesha",
  text: "Om Namaste! 🐘✨ I am Bodhi — the little spark of enlightened wisdom sitting right here at Kosmic Trinity.\n\nAsk me about your dharma, love, abundance, karma, or anything that weighs on your soul. I am always here, always listening.",
};

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
  return text.split(/(\*[^*]+\*|🐘|✨|🌟|🕉️|🌕|🌙)/).map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i} className="text-primary not-italic font-medium">{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function GaneshaChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INTRO]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, typing]);

  function send() {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: Message = { from: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply: Message = { from: "ganesha", text: pickResponse(trimmed) };
      setMessages((m) => [...m, reply]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open Bodhi wisdom chat"
        className="fixed bottom-6 right-6 z-50 w-20 h-20 rounded-full
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

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-2rem)]
            bg-background border border-primary/40 rounded-lg shadow-[0_0_40px_rgba(201,168,76,0.2)]
            flex flex-col overflow-hidden"
          style={{ height: "480px" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-primary/20 bg-card/40 shrink-0">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/40 overflow-hidden shrink-0">
              <Ganesha3D size={48} />
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
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 overflow-hidden shrink-0 mt-0.5">
                    <Ganesha3D size={32} />
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
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 overflow-hidden shrink-0">
                  <Ganesha3D size={32} />
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
