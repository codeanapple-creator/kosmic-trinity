import { Link, useSearch } from "wouter";
import { CheckCircle2, Clock, XCircle, RefreshCw, MessageCircle, AlertTriangle } from "lucide-react";
import { useGetNavratriEnrollment, getGetNavratriEnrollmentQueryKey } from "@workspace/api-client-react";
import { errorMessage, formatLongDate, formatRupees, isNotFound } from "@/lib/navratri";

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-32 pb-24 px-4">
      <div className="max-w-xl mx-auto border border-primary/40 bg-card/40 p-6 sm:p-10 text-center">{children}</div>
    </div>
  );
}
const btn = "inline-flex items-center justify-center gap-2 px-6 py-3 text-xs uppercase tracking-widest font-serif";

export default function NavratriSuccess() {
  const ref = new URLSearchParams(useSearch()).get("ref")?.trim() ?? "";
  const q = useGetNavratriEnrollment(ref, {
    query: {
      enabled: !!ref,
      queryKey: getGetNavratriEnrollmentQueryKey(ref),
      retry: false,
      refetchInterval: (query) => (query.state.data?.status === "pending" ? 4000 : false),
    },
  });
  const data = q.data;

  if (!ref) {
    return (
      <Shell>
        <AlertTriangle className="mx-auto text-primary" />
        <h1 className="font-serif text-2xl mt-4">No payment reference</h1>
        <p className="text-muted-foreground mt-3 text-sm">We cannot confirm an enrollment without a payment reference.</p>
        <Link href="/navratri" className={`${btn} mt-6 bg-primary text-primary-foreground`}>Go to the circle</Link>
      </Shell>
    );
  }
  if (q.isLoading) {
    return (
      <Shell>
        <div className="space-y-3" aria-busy="true" data-testid="success-loading">
          <div className="h-8 w-2/3 mx-auto bg-primary/10 animate-pulse" />
          <div className="h-4 bg-primary/10 animate-pulse" />
          <div className="h-12 bg-primary/10 animate-pulse" />
        </div>
      </Shell>
    );
  }
  if (q.isError || !data) {
    const nf = isNotFound(q.error);
    return (
      <Shell>
        <AlertTriangle className="mx-auto text-primary" />
        <h1 className="font-serif text-2xl mt-4">{nf ? "We could not find this payment" : "We could not check your payment"}</h1>
        <p className="text-muted-foreground mt-3 text-sm" data-testid="text-success-error">
          {nf ? "This reference does not match any enrollment. Please check your link, or write to us with your payment receipt."
              : errorMessage(q.error, "Something went wrong while checking.")}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          {!nf && (
            <button onClick={() => q.refetch()} disabled={q.isFetching} className={`${btn} bg-primary text-primary-foreground disabled:opacity-60`} data-testid="button-retry-status">
              <RefreshCw size={13} className={q.isFetching ? "animate-spin" : ""} /> Check again
            </button>
          )}
          <Link href="/navratri" className={`${btn} border border-primary text-primary`}>Back to the circle</Link>
        </div>
      </Shell>
    );
  }

  if (data.status === "paid") {
    return (
      <Shell>
        <CheckCircle2 size={40} className="mx-auto text-primary" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary mt-5" data-testid="status-payment">Payment confirmed</p>
        <h1 className="font-serif text-3xl mt-2">You are in the circle</h1>
        <p className="text-foreground/80 mt-4 text-sm leading-relaxed">
          {data.eventName} opens on {formatLongDate(data.startDate)}. We received {formatRupees(data.amountPaise)}. Join the WhatsApp group so we can begin together.
        </p>
        {data.whatsappUrl ? (
          <a href={data.whatsappUrl} target="_blank" rel="noopener noreferrer" data-testid="link-join-whatsapp" className={`${btn} mt-7 bg-primary text-primary-foreground w-full sm:w-auto`}>
            <MessageCircle size={15} /> Join the WhatsApp circle
          </a>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">Your group link is not available yet. Refresh in a moment.</p>
        )}
      </Shell>
    );
  }
  if (data.status === "pending") {
    return (
      <Shell>
        <Clock size={36} className="mx-auto text-primary" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary mt-5" data-testid="status-payment">Payment pending</p>
        <h1 className="font-serif text-2xl mt-2">Waiting for the bank to confirm</h1>
        <p className="text-muted-foreground mt-3 text-sm">We are checking automatically. This can take a minute. Your link appears here only once payment is confirmed.</p>
        <button onClick={() => q.refetch()} disabled={q.isFetching} className={`${btn} mt-6 border border-primary text-primary disabled:opacity-60`} data-testid="button-refresh-status">
          <RefreshCw size={13} className={q.isFetching ? "animate-spin" : ""} /> Refresh status
        </button>
      </Shell>
    );
  }
  return (
    <Shell>
      <XCircle size={36} className="mx-auto text-red-300" />
      <p className="text-[10px] uppercase tracking-[0.3em] text-red-300 mt-5" data-testid="status-payment">Payment not completed</p>
      <h1 className="font-serif text-2xl mt-2">Your place is not held yet</h1>
      <p className="text-muted-foreground mt-3 text-sm">The payment did not go through, and no group link has been released.</p>
      <Link href="/navratri?error=payment_failed" className={`${btn} mt-6 bg-primary text-primary-foreground`} data-testid="link-retry-payment">Try again</Link>
    </Shell>
  );
}
