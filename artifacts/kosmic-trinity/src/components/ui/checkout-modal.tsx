import React, { useState } from "react";
import { Loader2, X, CreditCard, Smartphone } from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const API = `${BASE}/api`;

export interface CheckoutItem {
  name: string;
  type: "service" | "product";
  amountPaise: number;
  currency?: string;
}

interface Props {
  item: CheckoutItem;
  onClose: () => void;
}

function formatPrice(paise: number, currency: string) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutModal({ item, onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [method, setMethod] = useState<"razorpay" | "stripe">("razorpay");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currency = item.currency ?? "INR";
  const isINR = currency.toUpperCase() === "INR";

  async function handleRazorpay() {
    const loaded = await loadRazorpayScript();
    if (!loaded) { setError("Could not load Razorpay. Please try again."); return; }

    const res = await fetch(`${API}/razorpay/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemName: item.name,
        itemType: item.type,
        amountPaise: item.amountPaise,
        currency,
        clientEmail: form.email,
        clientName: form.name,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Could not create order");

    return new Promise<void>((resolve, reject) => {
      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "The Kosmic Trinity",
        description: item.name,
        prefill: { name: form.name, email: form.email },
        theme: { color: "#C9A84C" },
        handler: async (response: any) => {
          const vRes = await fetch(`${API}/razorpay/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const vData = await vRes.json();
          if (vData.success) {
            window.location.href = `/booking/success?payment=razorpay&item=${encodeURIComponent(item.name)}&name=${encodeURIComponent(form.name)}&email=${encodeURIComponent(form.email)}&amount=${item.amountPaise}&currency=${currency}`;
            resolve();
          } else {
            reject(new Error(vData.error ?? "Payment verification failed"));
          }
        },
        modal: { ondismiss: () => reject(new Error("cancelled")) },
      });
      rzp.open();
    });
  }

  async function handleStripe() {
    const res = await fetch(`${API}/booking/create-checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceName: item.name,
        amount: item.amountPaise,
        currency: currency.toLowerCase(),
        clientEmail: form.email,
        clientName: form.name,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Could not create checkout");
    if (data.url) window.location.href = data.url;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (method === "razorpay") {
        await handleRazorpay();
      } else {
        await handleStripe();
      }
    } catch (err: any) {
      if (err.message !== "cancelled") setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-primary mb-1">
              {item.type === "service" ? "Book Session" : "Order"}
            </p>
            <h2 className="font-serif text-lg text-foreground">{item.name}</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5 block">Your Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full name"
              className="w-full px-4 py-2.5 bg-background border border-border rounded text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5 block">Email Address</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="your@email.com"
              className="w-full px-4 py-2.5 bg-background border border-border rounded text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>

          {isINR && (
            <div>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 block">Payment Method</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod("razorpay")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded border text-sm transition-all ${method === "razorpay" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`}
                >
                  <Smartphone size={14} />
                  UPI / NetBanking
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("stripe")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded border text-sm transition-all ${method === "stripe" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`}
                >
                  <CreditCard size={14} />
                  International Card
                </button>
              </div>
              {method === "razorpay" && (
                <p className="text-[11px] text-muted-foreground mt-1.5">UPI · NetBanking · Indian Debit/Credit Cards</p>
              )}
              {method === "stripe" && (
                <p className="text-[11px] text-muted-foreground mt-1.5">Visa · Mastercard · Amex — all currencies</p>
              )}
            </div>
          )}

          {error && (
            <p className="text-sm text-red-400 bg-red-900/20 border border-red-500/20 rounded px-3 py-2">{error}</p>
          )}

          <div className="pt-1">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-primary-foreground font-serif tracking-wider uppercase text-sm rounded hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(201,168,76,0.2)] hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              {loading ? "Processing…" : `Pay ${formatPrice(item.amountPaise, currency)}`}
            </button>
          </div>

          <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
            Secured by {!isINR || method === "stripe" ? "Stripe" : "Razorpay"}.
            {item.type === "service" ? " A calendar link will be sent after payment." : " We'll confirm your order within 24 hrs."}
          </p>
        </form>
      </div>
    </div>
  );
}
