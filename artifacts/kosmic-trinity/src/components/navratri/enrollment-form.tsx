import { useEffect, useRef, useState } from "react";
import { Loader2, Lock, RefreshCw } from "lucide-react";
import {
  useGetNavratriOffer,
  useQuoteNavratri,
  useInitiateNavratri,
  type NavratriQuote,
} from "@workspace/api-client-react";
import { errorMessage, formatRupees } from "@/lib/navratri";

const field =
  "w-full min-w-0 px-4 py-2.5 bg-background border border-border/60 rounded text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors disabled:opacity-50";
const label = "text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5 block";

const norm = (s: string) => s.trim().toUpperCase();

export function EnrollmentForm({ idPrefix = "nav" }: { idPrefix?: string }) {
  const offerQ = useGetNavratriOffer();
  const quote = useQuoteNavratri();
  const initiate = useInitiateNavratri();

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [couponInput, setCouponInput] = useState("");
  const [applied, setApplied] = useState<NavratriQuote | null>(null);
  const [couponError, setCouponError] = useState("");
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(false);
  const quoteSeq = useRef(0);
  const submitLock = useRef(false);

  const offer = offerQ.data;
  const open = offer?.registrationOpen === true;
  const currency = offer?.currency ?? "INR";
  const total = applied ? applied.amountPaise : offer?.amountPaise;
  const draft = norm(couponInput);
  const draftDiffers = draft !== "" && draft !== norm(applied?.couponCode ?? "");

  // Restore pageshow (back from payment gateway) so the form is usable again.
  useEffect(() => {
    const h = (e: PageTransitionEvent) => {
      if (e.persisted) { submitLock.current = false; setRedirecting(false); }
    };
    window.addEventListener("pageshow", h);
    return () => window.removeEventListener("pageshow", h);
  }, []);

  function onCouponChange(v: string) {
    setCouponInput(v);
    setCouponError("");
    setError("");
    quoteSeq.current++; // invalidate in-flight quotes
    if (v.trim() === "") setApplied(null);
    else if (applied && norm(v) !== norm(applied.couponCode ?? "")) setApplied(null); // never keep stale discount
  }

  async function applyCoupon() {
    if (!draft) return;
    const seq = ++quoteSeq.current;
    setCouponError("");
    setApplied(null);
    try {
      const q = await quote.mutateAsync({ data: { couponCode: couponInput.trim() } });
      if (seq !== quoteSeq.current) return;
      if (!q.couponCode) { setCouponError("That code could not be applied."); return; }
      setApplied(q);
    } catch (e) {
      if (seq !== quoteSeq.current) return;
      setCouponError(errorMessage(e, "Could not check that code. Please try again."));
    }
  }

  function removeCoupon() {
    quoteSeq.current++;
    setCouponInput("");
    setApplied(null);
    setCouponError("");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitLock.current || !open) return;
    setError("");
    if (draftDiffers) {
      setCouponError("Press Apply to use this code, or clear it to pay the full amount.");
      return;
    }
    submitLock.current = true;
    try {
      const couponCode = applied && draft ? applied.couponCode ?? undefined : undefined;
      const pay = await initiate.mutateAsync({
        data: {
          clientName: form.name.trim(),
          clientEmail: form.email.trim(),
          clientPhone: form.phone.trim(),
          ...(couponCode ? { couponCode } : {}),
        },
      });
      setRedirecting(true);
      const f = document.createElement("form");
      f.method = "POST";
      f.action = pay.ccavenueUrl;
      for (const [n, v] of [["encRequest", pay.encryptedData], ["access_code", pay.accessCode]]) {
        const i = document.createElement("input");
        i.type = "hidden"; i.name = n; i.value = v;
        f.appendChild(i);
      }
      document.body.appendChild(f);
      f.submit();
    } catch (err) {
      submitLock.current = false;
      setError(errorMessage(err, "We could not start your payment. Please try again."));
    }
  }

  if (offerQ.isLoading) {
    return (
      <div className="space-y-3" data-testid="enroll-loading" aria-busy="true">
        {[0, 1, 2, 3].map((i) => <div key={i} className="h-11 bg-primary/10 animate-pulse rounded" />)}
      </div>
    );
  }
  if (offerQ.isError || !offer) {
    return (
      <div className="border border-red-500/30 bg-red-900/20 p-4 text-sm" role="alert" data-testid="enroll-offer-error">
        <p className="text-red-300">{errorMessage(offerQ.error, "We could not load the circle details.")}</p>
        <button type="button" onClick={() => offerQ.refetch()} className="mt-3 inline-flex items-center gap-2 text-primary text-xs uppercase tracking-widest" data-testid="button-retry-offer">
          <RefreshCw size={13} /> Try again
        </button>
      </div>
    );
  }
  if (!open) {
    return (
      <div className="border border-primary/30 bg-primary/5 p-5 text-center" data-testid="enroll-closed">
        <p className="font-serif text-lg text-foreground">Registration is closed</p>
        <p className="text-sm text-muted-foreground mt-2">This circle is no longer taking sign-ups. Thank you for your interest and your love.</p>
      </div>
    );
  }

  const busy = initiate.isPending || redirecting;

  return (
    <form onSubmit={submit} className="space-y-4" data-testid="form-navratri-enroll" noValidate={false}>
      <div className="flex items-end justify-between border-b border-primary/30 pb-3">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Nine-day circle</span>
        <span className="text-right">
          {applied && (
            <span className="block text-xs text-muted-foreground line-through">{formatRupees(applied.baseAmountPaise)}</span>
          )}
          <span className="font-serif text-3xl text-primary" data-testid="text-navratri-total">{total !== undefined ? formatRupees(total) : ""}</span>
        </span>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-name`} className={label}>Your name</label>
        <input id={`${idPrefix}-name`} data-testid="input-navratri-name" className={field} required minLength={2} maxLength={100} autoComplete="name" disabled={busy}
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-email`} className={label}>Email</label>
        <input id={`${idPrefix}-email`} data-testid="input-navratri-email" type="email" className={field} required maxLength={254} autoComplete="email" disabled={busy}
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-phone`} className={label}>Phone / WhatsApp</label>
        <input id={`${idPrefix}-phone`} data-testid="input-navratri-phone" type="tel" className={field} required minLength={6} maxLength={30} autoComplete="tel" disabled={busy}
          value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" />
      </div>

      <div>
        <label htmlFor={`${idPrefix}-coupon`} className={label}>Coupon code (optional)</label>
        <div className="flex gap-2">
          <input id={`${idPrefix}-coupon`} data-testid="input-navratri-coupon" className={`${field} uppercase`} maxLength={64} autoComplete="off" disabled={busy}
            value={couponInput} onChange={(e) => onCouponChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void applyCoupon(); } }}
            aria-describedby={`${idPrefix}-coupon-hint`} />
          {applied ? (
            <button type="button" onClick={removeCoupon} disabled={busy} className="px-4 text-xs uppercase tracking-widest border border-border/60 text-muted-foreground hover:text-foreground" data-testid="button-remove-coupon">Remove</button>
          ) : (
            <button type="button" onClick={applyCoupon} disabled={!draft || quote.isPending || busy} className="px-4 text-xs uppercase tracking-widest border border-primary text-primary hover:bg-primary/10 disabled:opacity-40 flex items-center gap-2" data-testid="button-apply-coupon">
              {quote.isPending && <Loader2 size={12} className="animate-spin" />} Apply
            </button>
          )}
        </div>
        <p id={`${idPrefix}-coupon-hint`} className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
          Completed both previous nine-day circles? Share your experience in the comments of the circle announcement to receive your returning-participant code.
        </p>
        <div aria-live="polite">
          {applied && !draftDiffers && (
            <p className="text-xs text-primary mt-2" data-testid="text-coupon-applied">
              Code applied: {applied.discountPercent}% off. You pay {formatRupees(applied.amountPaise)}.
            </p>
          )}
          {draftDiffers && !couponError && !quote.isPending && (
            <p className="text-xs text-muted-foreground mt-2">Press Apply to check this code.</p>
          )}
          {couponError && <p className="text-xs text-red-300 mt-2" role="alert" data-testid="text-coupon-error">{couponError}</p>}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-300 bg-red-900/20 border border-red-500/20 rounded px-3 py-2" role="alert" data-testid="text-enroll-error">{error}</p>
      )}

      <button type="submit" disabled={busy} data-testid="button-navratri-pay"
        className="w-full py-3.5 bg-primary text-primary-foreground font-serif tracking-wider uppercase text-sm rounded hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
        {busy && <Loader2 size={14} className="animate-spin" />}
        {redirecting ? "Taking you to secure payment" : initiate.isPending ? "Preparing payment" : `Enroll and pay ${total !== undefined ? formatRupees(total) : ""}`}
      </button>
      <p className="text-[11px] text-muted-foreground text-center leading-relaxed flex items-center justify-center gap-1.5">
        <Lock size={11} /> Paid securely on CCAvenue ({currency}). After payment you will get the WhatsApp circle link here.
      </p>
    </form>
  );
}
