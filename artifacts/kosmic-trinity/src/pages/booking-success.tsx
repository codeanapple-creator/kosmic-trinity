import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import { MotionSection } from "@/components/ui/motion-section";
import { CheckCircle, Loader2, ExternalLink, Calendar, Package } from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const API = `${BASE}/api`;
const GOOGLE_CALENDAR_BOOKING_URL = "https://calendar.google.com/calendar/appointments";

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(amount / 100);
}

export default function BookingSuccess() {
  const search = useSearch();
  const params = new URLSearchParams(search);

  const stripeSessionId = params.get("session_id");
  const isRazorpay = params.get("payment") === "razorpay";

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [data, setData] = useState<{
    itemName?: string;
    itemType?: string;
    clientName?: string;
    clientEmail?: string;
    calendarLink?: string;
    amountPaid?: number;
    currency?: string;
  }>({});

  useEffect(() => {
    if (isRazorpay) {
      setData({
        itemName: params.get("item") ?? undefined,
        itemType: "service",
        clientName: params.get("name") ?? undefined,
        clientEmail: params.get("email") ?? undefined,
        amountPaid: Number(params.get("amount") ?? 0),
        currency: params.get("currency") ?? "INR",
        calendarLink: GOOGLE_CALENDAR_BOOKING_URL,
      });
      setStatus("success");
      return;
    }

    if (!stripeSessionId) {
      setStatus("error");
      return;
    }

    fetch(`${API}/booking/verify?session_id=${stripeSessionId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setData({
            itemName: d.serviceName,
            itemType: "service",
            clientName: d.clientName,
            clientEmail: d.clientEmail,
            calendarLink: d.calendarLink ?? GOOGLE_CALENDAR_BOOKING_URL,
            amountPaid: d.amountPaid,
            currency: d.currency,
          });
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  const isService = data.itemType !== "product";

  return (
    <div className="w-full pt-32 pb-24 relative min-h-screen flex items-center">
      <div className="star-bg" />
      <div className="container mx-auto px-4 max-w-xl text-center">
        {status === "loading" && (
          <MotionSection className="space-y-4">
            <Loader2 size={40} className="animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground font-serif text-lg">Verifying your payment…</p>
          </MotionSection>
        )}

        {status === "success" && (
          <MotionSection className="space-y-8">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full animate-pulse-glow" />
                <CheckCircle size={64} className="text-primary relative z-10" />
              </div>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-serif gold-gradient-text mb-3">
                {isService ? "Booking Confirmed ✦" : "Order Received ✦"}
              </h1>
              <p className="text-muted-foreground">
                Thank you, <span className="text-foreground font-semibold">{data.clientName}</span>.{" "}
                {isService ? "Your cosmic journey begins." : "We'll be in touch within 24 hours."}
              </p>
            </div>

            <div className="border border-primary/20 bg-card/30 backdrop-blur rounded p-6 text-left space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{isService ? "Service" : "Item"}</span>
                <span className="text-foreground font-serif">{data.itemName}</span>
              </div>
              {data.amountPaid != null && data.currency && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount Paid</span>
                  <span className="text-primary font-serif">{formatPrice(data.amountPaid, data.currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Confirmation sent to</span>
                <span className="text-foreground">{data.clientEmail}</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {isService
                  ? "A confirmation email has been sent with a calendar booking link to choose your session date and time."
                  : "A confirmation email has been sent. We'll reach out within 24 hours to arrange delivery."}
              </p>
              {isService && (
                <a
                  href={data.calendarLink ?? GOOGLE_CALENDAR_BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-primary-foreground font-serif tracking-wider uppercase text-sm rounded hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(201,168,76,0.3)]"
                >
                  <Calendar size={16} />
                  Book Your Date & Time
                  <ExternalLink size={14} />
                </a>
              )}
              {!isService && (
                <Link
                  href="/storefront"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-primary-foreground font-serif tracking-wider uppercase text-sm rounded hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(201,168,76,0.3)]"
                >
                  <Package size={16} />
                  Back to the Soul Store
                </Link>
              )}
            </div>

            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              ← Return to Home
            </Link>
          </MotionSection>
        )}

        {status === "error" && (
          <MotionSection className="space-y-6">
            <h1 className="text-3xl font-serif text-foreground">Something went wrong</h1>
            <p className="text-muted-foreground">
              We couldn't verify your payment. If you were charged, please contact us at{" "}
              <a href="mailto:kosmictrinity@gmail.com" className="text-primary hover:underline">
                kosmictrinity@gmail.com
              </a>
            </p>
            <Link
              href="/booking"
              className="px-6 py-3 bg-primary text-primary-foreground font-serif tracking-wider uppercase text-xs rounded hover:bg-primary/90 transition-colors inline-block"
            >
              Try Again
            </Link>
          </MotionSection>
        )}
      </div>
    </div>
  );
}
