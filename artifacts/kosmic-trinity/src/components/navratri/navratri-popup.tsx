import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { X, Sparkles } from "lucide-react";
import { useOverlay } from "@/contexts/overlay-context";
import { NAVRATRI_SESSION_KEY, promoActive } from "@/lib/navratri";
import { useGetNavratriOffer, getGetNavratriOfferQueryKey } from "@workspace/api-client-react";
import { NavratriDetails } from "./navratri-details";
import { EnrollmentForm } from "./enrollment-form";
import { Mandala } from "./mandala";

const EXCLUDED = ["/admin", "/navratri", "/booking/success", "/thank-you", "/booking-confirmed"];
const isExcluded = (p: string) => EXCLUDED.some((x) => p === x || p.startsWith(x + "/"));

function PopupBody({ onClose }: { onClose: () => void }) {
  const { data: offer } = useGetNavratriOffer();
  const [, setLocation] = useLocation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); onClose(); return; }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const els = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])'));
      if (!els.length) return;
      const first = els[0], last = els[els.length - 1];
      const active = document.activeElement;
      if (!dialogRef.current.contains(active)) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto overscroll-contain" data-testid="navratri-popup">
      <div className="fixed inset-0 bg-[#0D0508]/85" onClick={onClose} aria-hidden="true" />
      <div className="relative min-h-full flex items-start sm:items-center justify-center p-3 sm:p-6 pointer-events-none">
        <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="navratri-popup-title"
          className="pointer-events-auto relative w-full max-w-4xl my-3 overflow-hidden bg-background border border-primary/50 shadow-2xl">
          <Mandala className="absolute -top-16 -right-16 w-56 h-56 opacity-20 pointer-events-none" />
          <button ref={closeRef} onClick={onClose} aria-label="Close Navratri Circle invitation" data-testid="button-close-navratri-popup"
            className="absolute top-3 right-3 z-10 p-2 text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <X size={20} />
          </button>
          <div className="grid md:grid-cols-[1.1fr_1fr]">
            <div className="p-5 sm:p-8 md:border-r border-primary/20">
              <h2 id="navratri-popup-title" className="sr-only">Navratri Circle enrollment</h2>
              <NavratriDetails startDate={offer?.startDate} compact />
            </div>
            <div className="p-5 sm:p-8 border-t md:border-t-0 border-primary/20 bg-card/30">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-4">Hold your place</p>
              <EnrollmentForm idPrefix="popup" />
              <button type="button" onClick={() => { onClose(); setLocation("/navratri"); }} className="block w-full text-center text-[11px] text-muted-foreground hover:text-primary mt-4 underline underline-offset-4" data-testid="link-navratri-page">
                Open the full page to read or share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NavratriPromotion() {
  const [location] = useLocation();
  const { activeOverlay, openOverlay, closeOverlay } = useOverlay();
  const [active] = useState(promoActive);
  const open = activeOverlay === "promo";
  const excluded = isExcluded(location);
  const triggered = useRef(false);

  useEffect(() => {
    if (!active || location !== "/" || triggered.current) return;
    try { if (sessionStorage.getItem(NAVRATRI_SESSION_KEY)) return; } catch { /* storage blocked */ }
    triggered.current = true;
    const t = window.setTimeout(() => {
      try { sessionStorage.setItem(NAVRATRI_SESSION_KEY, "1"); } catch { /* ignore */ }
      openOverlay("promo");
    }, 1000);
    return () => { window.clearTimeout(t); triggered.current = false; };
  }, [active, location, openOverlay]);

  // Close if user navigates to an excluded page while open.
  useEffect(() => { if (open && excluded) closeOverlay(); }, [open, excluded, closeOverlay]);

  const close = useCallback(() => {
    try { sessionStorage.setItem(NAVRATRI_SESSION_KEY, "1"); } catch { /* ignore */ }
    closeOverlay();
  }, [closeOverlay]);

  const { data: offer } = useGetNavratriOffer({ query: { enabled: active && !excluded, queryKey: getGetNavratriOfferQueryKey(), staleTime: 60000 } });

  if (!active || excluded) return null;

  return (
    <>
      {open && <PopupBody onClose={close} />}
      {!open && offer?.registrationOpen !== false && (
        <button onClick={() => openOverlay("promo")} data-testid="button-reopen-navratri"
          className="fixed bottom-6 left-4 z-40 flex items-center gap-2 pl-3 pr-4 py-2.5 bg-background/95 border border-primary/60 text-primary text-[11px] uppercase tracking-widest hover:bg-primary/10 transition-colors shadow-lg">
          <Sparkles size={13} /> Navratri Circle
        </button>
      )}
    </>
  );
}
