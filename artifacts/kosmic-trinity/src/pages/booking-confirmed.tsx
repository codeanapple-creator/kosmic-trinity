import { useState, useEffect } from "react";
import { Link } from "wouter";
import { MotionSection } from "@/components/ui/motion-section";
import { CheckCircle, CalendarCheck, Loader2 } from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const API = `${BASE}/api`;

interface Booking {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  serviceName: string;
  paymentAmount: number;
  paymentCurrency: string;
  bookingStatus: string;
  googleCalendarEventLink: string | null;
}

function ProgressBar() {
  const steps = ["Payment", "Birth Details", "Confirmed"];
  return (
    <div className="flex items-center justify-center gap-0 mb-12">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-primary border-primary text-primary-foreground">
              ✓
            </div>
            <span className="text-[10px] uppercase tracking-widest text-primary whitespace-nowrap">
              {label}
            </span>
          </div>
          {i < steps.length - 1 && <div className="w-16 h-px mx-2 mb-4 bg-primary" />}
        </div>
      ))}
    </div>
  );
}

export default function BookingConfirmed() {
  const ref = new URLSearchParams(window.location.search).get("ref") ?? "";
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [calendarPending, setCalendarPending] = useState(false);

  useEffect(() => {
    if (!ref) { setLoading(false); return; }
    fetch(`${API}/booking/ref/${encodeURIComponent(ref)}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setBooking(data);
        if (data.bookingStatus === "birth_details_submitted" && !data.googleCalendarEventLink) {
          setCalendarPending(true);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [ref]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="w-full pt-32 pb-24 relative min-h-screen">
      <div className="star-bg" />
      <div className="container mx-auto px-4 max-w-2xl">

        <ProgressBar />

        <MotionSection className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/30 mb-6 shadow-[0_0_30px_rgba(201,168,76,0.2)]">
            <CalendarCheck className="text-primary" size={40} />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif gold-gradient-text mb-3">
            Your KosmicTrinity Session is Confirmed!
          </h1>
          <p className="text-muted-foreground font-light max-w-md mx-auto">
            Thank you, {booking?.customerName ?? ""}. We have received everything we need to prepare your session.
          </p>
        </MotionSection>

        {/* Status checklist */}
        <MotionSection delay={0.1} className="mb-8">
          <div className="bg-card/40 border border-primary/20 rounded p-6 space-y-4">
            {[
              { label: "Payment Successful", done: true },
              { label: "Birth Details Received", done: true },
              {
                label: calendarPending ? "Calendar Booking — being set up" : "Calendar Booking Created",
                done: !calendarPending,
                pending: calendarPending,
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <CheckCircle
                  size={18}
                  className={item.pending ? "text-muted-foreground" : "text-primary"}
                />
                <span className={`text-sm ${item.pending ? "text-muted-foreground" : "text-foreground"}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </MotionSection>

        {/* Booking ID */}
        {booking && (
          <MotionSection delay={0.15} className="mb-8">
            <div className="bg-card/20 border border-border rounded p-5 space-y-3">
              <div className="flex justify-between flex-wrap gap-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Booking ID</span>
                <span className="font-serif text-primary">{booking.bookingId}</span>
              </div>
              <div className="flex justify-between flex-wrap gap-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Service</span>
                <span className="text-foreground text-sm">{booking.serviceName}</span>
              </div>
              <div className="flex justify-between flex-wrap gap-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Email</span>
                <span className="text-foreground text-sm">{booking.customerEmail}</span>
              </div>
            </div>
          </MotionSection>
        )}

        {/* Calendar CTA or pending message */}
        <MotionSection delay={0.2} className="mb-8">
          {booking?.googleCalendarEventLink ? (
            <a
              href={booking.googleCalendarEventLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-primary text-primary-foreground font-serif tracking-wider uppercase text-sm rounded hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_30px_rgba(201,168,76,0.5)] flex items-center justify-center gap-2"
            >
              <CalendarCheck size={16} />
              Add to Google Calendar
            </a>
          ) : (
            <div className="bg-card/20 border border-primary/20 rounded p-5 text-center">
              <p className="text-sm text-muted-foreground leading-relaxed">
                We've successfully received your birth details and your KosmicTrinity calendar booking is being set up.
                You'll receive a confirmation email with your Google Calendar link shortly.
              </p>
            </div>
          )}
        </MotionSection>

        <MotionSection delay={0.25} className="mb-8 text-center">
          <p className="text-sm text-muted-foreground">
            We've successfully created your KosmicTrinity calendar booking.
            A confirmation email has been sent to{" "}
            <span className="text-primary">{booking?.customerEmail ?? "your email"}</span>.
          </p>
        </MotionSection>

        <MotionSection delay={0.3} className="text-center">
          <Link
            href="/"
            className="text-primary border-b border-primary/30 pb-1 hover:border-primary transition-colors text-sm font-serif"
          >
            ← Return to KosmicTrinity
          </Link>
        </MotionSection>
      </div>
    </div>
  );
}
