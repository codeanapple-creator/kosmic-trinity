import { Check, Gift } from "lucide-react";
import { DEVIS, INCLUDES, formatLongDate } from "@/lib/navratri";
import { Mandala } from "./mandala";

export function NavratriDetails({ startDate, compact = false }: { startDate?: string; compact?: boolean }) {
  return (
    <div data-testid="navratri-details">
      <div className="flex items-center gap-4">
        <Mandala className={compact ? "w-16 h-16 shrink-0" : "w-24 h-24 shrink-0"} />
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary">The 3rd Navratri Circle</p>
      </div>
      <h2 className={`font-serif text-foreground leading-tight mt-4 ${compact ? "text-2xl" : "text-3xl md:text-5xl"}`}>
        October, the month to <span className="gold-gradient-text">welcome Shakti</span>
      </h2>
      <p className="mt-4 text-foreground/80 leading-relaxed">
        A month to awaken the nine powerful and benevolent energies. The circle opens on{" "}
        <strong className="text-primary font-normal">{formatLongDate(startDate)}</strong>, and for nine days we sit with
        nine Devis and nine celestial bodies, together.
      </p>

      <ul className="mt-5 space-y-2.5">
        {INCLUDES.map((t) => (
          <li key={t} className="flex gap-3 text-sm text-foreground/85">
            <Check size={15} className="text-primary mt-0.5 shrink-0" /> {t}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex gap-3 border border-primary/30 bg-primary/5 p-4">
        <Gift size={18} className="text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-foreground/85 leading-relaxed">
          <span className="text-primary">A bonus gift</span> waits for everyone who completes the nine days.
        </p>
      </div>

      {!compact && (
        <ol className="mt-8 grid grid-cols-3 gap-px bg-primary/20 border border-primary/20">
          {DEVIS.map((d, i) => (
            <li key={d} className="bg-background/90 px-3 py-4 text-center">
              <span className="block text-[10px] tracking-[0.25em] text-muted-foreground">DAY {i + 1}</span>
              <span className="block break-words font-serif text-[11px] sm:text-sm md:text-base text-foreground mt-1">{d}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
