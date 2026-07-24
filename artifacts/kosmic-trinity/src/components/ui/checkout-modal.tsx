import React, { useState } from "react";
import { Loader2, X, CreditCard, IndianRupee } from "lucide-react";

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

async function handleCCAvenue(
  item: CheckoutItem,
  formData: { name: string; email: string; phone: string },
  currency: string
) {
  const res = await fetch(`${API}/ccavenue/initiate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      serviceName: item.name,
      amount: item.amountPaise,
      currency,
      clientEmail: formData.email,
      clientName: formData.name,
      clientPhone: formData.phone,
      itemType: item.type,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Could not initiate payment");

  // Build and auto-submit a hidden form to CCAvenue's hosted payment page
  const payForm = document.createElement("form");
  payForm.method = "POST";
  payForm.action = data.ccavenueUrl;

  const encInput = document.createElement("input");
  encInput.type = "hidden";
  encInput.name = "encRequest";
  encInput.value = data.encryptedData;
  payForm.appendChild(encInput);

  const accInput = document.createElement("input");
  accInput.type = "hidden";
  accInput.name = "access_code";
  accInput.value = data.accessCode;
  payForm.appendChild(accInput);

  document.body.appendChild(payForm);
  payForm.submit();
}

async function handleStripe(
  item: CheckoutItem,
  formData: { name: string; email: string; phone: string },
  currency: string
) {
  const res = await fetch(`${API}/booking/create-checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      serviceName: item.name,
      amount: item.amountPaise,
      currency: currency.toLowerCase(),
      clientEmail: formData.email,
      clientName: formData.name,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Could not create checkout");
  if (data.url) window.location.href = data.url;
}

export default function CheckoutModal({ item, onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [method, setMethod] = useState<"ccavenue" | "stripe">("ccavenue");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currency = item.currency ?? "INR";
  const isINR = currency.toUpperCase() === "INR";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (method === "ccavenue") {
        await handleCCAvenue(item, form, currency);
      } else {
        await handleStripe(item, form, currency);
      }
    } catch (err: any) {
      setError(err.message);
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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

          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5 block">Phone Number</label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-2.5 bg-background border border-border rounded text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>

          {isINR && (
            <div>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 block">Payment Method</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod("ccavenue")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded border text-sm transition-all ${method === "ccavenue" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`}
                >
                  <IndianRupee size={14} />
                  UPI / Cards
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("stripe")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded border text-sm transition-all ${method === "stripe" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`}
                >
                  <CreditCard size={14} />
                  International
                </button>
              </div>
              {method === "ccavenue" && (
                <p className="text-[11px] text-muted-foreground mt-1.5">UPI · NetBanking · Credit / Debit Cards · Wallets</p>
              )}
              {method === "stripe" && (
                <p className="text-[11px] text-muted-foreground mt-1.5">Visa · Mastercard · Amex - all currencies</p>
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
            Secured by {!isINR || method === "stripe" ? "Stripe" : "CCAvenue"}.
            {item.type === "service" ? " A calendar link will be sent after payment." : " We'll confirm your order within 24 hrs."}
          </p>
        </form>
      </div>
    </div>
  );
}
