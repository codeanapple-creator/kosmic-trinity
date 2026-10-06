import { useSearch } from "wouter";
import { AlertTriangle } from "lucide-react";
import { useGetNavratriOffer } from "@workspace/api-client-react";
import { NavratriDetails } from "@/components/navratri/navratri-details";
import { EnrollmentForm } from "@/components/navratri/enrollment-form";
import { promoActive } from "@/lib/navratri";

export default function Navratri() {
  const search = useSearch();
  const err = new URLSearchParams(search).get("error");
  const { data: offer } = useGetNavratriOffer();
  const ended = !promoActive();

  const banner =
    err === "cancelled"
      ? "Your payment was cancelled and your place is not yet confirmed. If your bank shows a debit, contact us before paying again."
      : err === "payment_failed"
      ? "Your payment did not go through, so your place is not yet held. Please try again, or use a different payment method."
      : err === "verification_failed"
      ? "We could not verify your payment. Please contact kosmictrinity@gmail.com with your transaction reference before trying again if money was debited."
      : null;

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {banner && (
          <div role="alert" data-testid="banner-payment-error" className="mb-8 flex gap-3 border border-red-500/30 bg-red-900/20 p-4 text-sm text-red-200">
            <AlertTriangle size={18} className="shrink-0 mt-0.5" /> {banner}
          </div>
        )}
        {ended ? (
          <div className="text-center py-24" data-testid="navratri-ended">
            <h1 className="font-serif text-3xl text-foreground">This circle has closed</h1>
            <p className="text-muted-foreground mt-3">Thank you for the devotion. Follow along for the next opening.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-start">
            <div className="min-w-0">
              <h1 className="sr-only">Navratri Circle</h1>
              <NavratriDetails startDate={offer?.startDate} />
              <p className="mt-8 text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/40 pl-4">
                To everyone who has walked a previous nine days with us: thank you. Your presence is what makes this circle a living thing.
              </p>
            </div>
            <div className="min-w-0 lg:sticky lg:top-28 border border-primary/40 bg-card/40 p-5 sm:p-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-4">Enroll in the circle</p>
              <EnrollmentForm idPrefix="page" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
