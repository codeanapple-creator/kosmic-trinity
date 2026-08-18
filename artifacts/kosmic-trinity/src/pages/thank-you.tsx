import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { MotionSection } from "@/components/ui/motion-section";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const API = `${BASE}/api`;

interface Booking {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  serviceName: string;
  paymentStatus: string;
  paymentAmount: number;
  paymentCurrency: string;
  bookingStatus: string;
  dateOfBirth: string | null;
  birthTime: string | null;
  birthPlace: string | null;
  googleCalendarEventLink: string | null;
}

function formatPrice(paise: number, currency: string) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

function ProgressBar({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { label: "Payment", n: 1 },
    { label: "Birth Details", n: 2 },
    { label: "Confirmed", n: 3 },
  ];
  return (
    <div className="flex items-center justify-center gap-0 mb-12">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border transition-all ${
                s.n < step
                  ? "bg-primary border-primary text-primary-foreground"
                  : s.n === step
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-muted-foreground"
              }`}
            >
              {s.n < step ? "✓" : s.n}
            </div>
            <span
              className={`text-[10px] uppercase tracking-widest whitespace-nowrap ${
                s.n <= step ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-16 h-px mx-2 mb-4 ${s.n < step ? "bg-primary" : "bg-border"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function ThankYou() {
  const [searchStr] = useLocation();
  const ref = new URLSearchParams(window.location.search).get("ref") ?? "";

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loadError, setLoadError] = useState("");
  const [loadingBooking, setLoadingBooking] = useState(true);

  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    birthTime: "",
    birthPlace: "",
  });
  const [birthTimeUnknown, setBirthTimeUnknown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!ref) {
      setLoadError("No booking reference found in the URL.");
      setLoadingBooking(false);
      return;
    }
    fetch(`${API}/booking/ref/${encodeURIComponent(ref)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setLoadError(data.error); return; }
        setBooking(data);
        setForm((f) => ({ ...f, fullName: data.customerName ?? "" }));
        // If already confirmed, go straight to confirmed page
        if (data.bookingStatus === "confirmed" && data.googleCalendarEventLink) {
          setLocation(`/booking-confirmed?ref=${encodeURIComponent(ref)}`);
        }
      })
      .catch(() => setLoadError("Could not load your booking. Please refresh or contact us."))
      .finally(() => setLoadingBooking(false));
  }, [ref]);

  const today = new Date().toISOString().split("T")[0];

  function validate() {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Please enter your full name.";
    if (!form.dateOfBirth) e.dateOfBirth = "Please enter your date of birth.";
    else if (form.dateOfBirth > today) e.dateOfBirth = "Date of birth cannot be in the future.";
    if (!birthTimeUnknown && !form.birthTime) e.birthTime = "Please enter your birth time, or tick 'I don't know'.";
    if (!form.birthPlace.trim()) e.birthPlace = "Please enter your place of birth.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || !booking) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/booking/birth-details`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: booking.bookingId,
          ...form,
          birthTime: birthTimeUnknown ? "Unknown" : form.birthTime,
          birthTimeUnknown,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Submission failed");
      setLocation(`/booking-confirmed?ref=${encodeURIComponent(booking.bookingId)}`);
    } catch (err: any) {
      setErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingBooking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <AlertCircle className="mx-auto text-red-400 mb-4" size={40} />
          <p className="text-muted-foreground">{loadError}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Contact us at <a href="mailto:kosmictrinity@gmail.com" className="text-primary">kosmictrinity@gmail.com</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pt-32 pb-24 relative min-h-screen">
      <div className="star-bg" />
      <div className="container mx-auto px-4 max-w-2xl">

        <ProgressBar step={2} />

        <MotionSection className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <CheckCircle className="text-primary" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif gold-gradient-text mb-3">
            Thank You for Your Booking!
          </h1>
          <p className="text-muted-foreground font-light">
            Your payment has been received successfully.
          </p>
        </MotionSection>

        {/* Payment summary */}
        {booking && (
          <MotionSection delay={0.1} className="mb-8">
            <div className="bg-card/40 border border-primary/20 rounded p-6 space-y-3">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Booking ID</span>
                <span className="font-serif text-primary">{booking.bookingId}</span>
              </div>
              <div className="w-full h-px bg-border" />
              <div className="flex justify-between flex-wrap gap-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Name</span>
                <span className="text-foreground text-sm">{booking.customerName}</span>
              </div>
              <div className="flex justify-between flex-wrap gap-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Email</span>
                <span className="text-foreground text-sm">{booking.customerEmail}</span>
              </div>
              <div className="flex justify-between flex-wrap gap-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Service</span>
                <span className="text-foreground text-sm">{booking.serviceName}</span>
              </div>
              <div className="flex justify-between flex-wrap gap-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Amount Paid</span>
                <span className="text-primary font-serif">
                  {formatPrice(booking.paymentAmount, booking.paymentCurrency)}
                </span>
              </div>
              <div className="flex justify-between flex-wrap gap-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Payment</span>
                <span className="text-green-400 text-sm font-semibold">✓ Successful</span>
              </div>
            </div>
          </MotionSection>
        )}

        {/* Birth details form */}
        <MotionSection delay={0.2}>
          <div className="bg-card/30 border border-border rounded p-8">
            <h2 className="font-serif text-xl text-foreground mb-2">Enter Your Birth Details</h2>
            <p className="text-muted-foreground text-sm font-light mb-6">
              To prepare your KosmicTrinity session, please enter your birth details below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5 block">
                  Full Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="As per birth records"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                />
                {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5 block">
                  Date of Birth <span className="text-primary">*</span>
                </label>
                <input
                  type="date"
                  value={form.dateOfBirth}
                  max={today}
                  onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors"
                />
                {errors.dateOfBirth && <p className="text-red-400 text-xs mt-1">{errors.dateOfBirth}</p>}
              </div>

              {/* Birth Time */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5 block">
                  Birth Time <span className="text-primary">*</span>
                </label>
                <input
                  type="time"
                  value={form.birthTime}
                  disabled={birthTimeUnknown}
                  onChange={(e) => setForm({ ...form, birthTime: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                />
                {/* "I don't know" toggle */}
                <label className="flex items-center gap-2 mt-2 cursor-pointer select-none group">
                  <input
                    type="checkbox"
                    checked={birthTimeUnknown}
                    onChange={(e) => {
                      setBirthTimeUnknown(e.target.checked);
                      if (e.target.checked) setForm((f) => ({ ...f, birthTime: "" }));
                      setErrors((err) => ({ ...err, birthTime: "" }));
                    }}
                    className="w-3.5 h-3.5 accent-primary"
                  />
                  <span className="text-[11px] text-muted-foreground group-hover:text-foreground transition-colors">
                    I don't know my exact birth time
                  </span>
                </label>
                {!birthTimeUnknown && (
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Enter as accurately as possible — even an approximate hour helps.
                  </p>
                )}
                {birthTimeUnknown && (
                  <p className="text-[11px] text-primary/70 mt-1">
                    No problem — your astrologer will work with what's available.
                  </p>
                )}
                {errors.birthTime && <p className="text-red-400 text-xs mt-1">{errors.birthTime}</p>}
              </div>

              {/* Birth Place */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5 block">
                  Birth Place <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={form.birthPlace}
                  onChange={(e) => setForm({ ...form, birthPlace: e.target.value })}
                  placeholder="e.g. Jaipur, Rajasthan, India"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                />
                <p className="text-[11px] text-muted-foreground mt-1">Include city, state, and country.</p>
                {errors.birthPlace && <p className="text-red-400 text-xs mt-1">{errors.birthPlace}</p>}
              </div>

              {errors.submit && (
                <div className="flex items-start gap-2 p-3 bg-red-900/20 border border-red-500/20 rounded">
                  <AlertCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-red-400">{errors.submit}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-primary text-primary-foreground font-serif tracking-wider uppercase text-sm rounded hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(201,168,76,0.2)] hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              >
                {submitting && <Loader2 size={14} className="animate-spin" />}
                {submitting ? "Saving…" : "Submit Birth Details →"}
              </button>
            </form>
          </div>
        </MotionSection>

        <MotionSection delay={0.3} className="mt-8 text-center">
          <p className="text-[11px] text-muted-foreground">
            Having trouble? Email us at{" "}
            <a href="mailto:kosmictrinity@gmail.com" className="text-primary">
              kosmictrinity@gmail.com
            </a>{" "}
            with your Booking ID <span className="text-primary">{ref}</span>.
          </p>
        </MotionSection>
      </div>
    </div>
  );
}
