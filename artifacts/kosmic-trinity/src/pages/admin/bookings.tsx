import { useState, useEffect } from "react";
import { Loader2, RefreshCw, Send, CalendarClock, XCircle, ExternalLink } from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const API = `${BASE}/api`;
const TOKEN_KEY = "kt_admin_token";

interface Booking {
  id: number;
  bookingId: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  phone: string | null;
  serviceName: string;
  paymentStatus: string;
  paymentAmount: number;
  paymentCurrency: string;
  paymentTransactionId: string | null;
  paymentDate: string | null;
  dateOfBirth: string | null;
  birthTime: string | null;
  birthPlace: string | null;
  sessionDate: string | null;
  sessionDuration: number | null;
  sessionTimezone: string | null;
  googleCalendarEventId: string | null;
  googleCalendarEventLink: string | null;
  calendarRetryCount: number | null;
  calendarLastError: string | null;
  bookingStatus: string;
  createdAt: string;
  updatedAt: string;
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    pending_birth_details: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    birth_details_submitted: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    confirmed: "bg-green-500/10 text-green-400 border-green-500/20",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  const label: Record<string, string> = {
    pending_birth_details: "Pending Details",
    birth_details_submitted: "Details Received",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
  };
  const cls = map[status] ?? "bg-muted text-muted-foreground border-border";
  return (
    <span className={`px-2 py-0.5 rounded border text-[10px] uppercase tracking-widest ${cls}`}>
      {label[status] ?? status}
    </span>
  );
}

function fmt(paise: number, currency: string) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export default function AdminBookings() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) ?? "");
  const [tokenInput, setTokenInput] = useState("");
  const [authed, setAuthed] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [sessionForm, setSessionForm] = useState({ sessionDate: "", sessionDuration: "60", sessionTimezone: "Asia/Kolkata" });
  const [sessionLoading, setSessionLoading] = useState(false);

  async function apiFetch(path: string, opts: RequestInit = {}) {
    return fetch(`${API}${path}`, {
      ...opts,
      headers: { "Content-Type": "application/json", "x-admin-token": token, ...(opts.headers ?? {}) },
    });
  }

  async function loadBookings() {
    setLoading(true);
    setError("");
    try {
      const r = await apiFetch("/admin/bookings");
      if (r.status === 401) { setAuthed(false); setError("Invalid token."); return; }
      const data = await r.json();
      if (data.error) throw new Error(data.error);
      setBookings(data);
      setAuthed(true);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setToken(tokenInput);
    sessionStorage.setItem(TOKEN_KEY, tokenInput);
  }

  useEffect(() => { if (token) loadBookings(); }, [token]);

  async function doAction(bookingId: string, path: string, method = "POST", body?: object) {
    setActionLoading((p) => ({ ...p, [bookingId + path]: true }));
    try {
      const r = await apiFetch(`/admin/bookings/${bookingId}${path}`, {
        method,
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await r.json();
      if (data.error) throw new Error(data.error);
      await loadBookings();
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    } finally {
      setActionLoading((p) => ({ ...p, [bookingId + path]: false }));
    }
  }

  async function handleSetSession(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedBooking) return;
    setSessionLoading(true);
    try {
      await doAction(selectedBooking.bookingId, "/session", "PUT", {
        sessionDate: sessionForm.sessionDate,
        sessionDuration: parseInt(sessionForm.sessionDuration),
        sessionTimezone: sessionForm.sessionTimezone,
      });
      setSelectedBooking(null);
    } finally {
      setSessionLoading(false);
    }
  }

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-sm">
          <h1 className="font-serif text-2xl gold-gradient-text text-center mb-8">Admin · KosmicTrinity</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin token"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="w-full px-4 py-3 bg-card border border-border rounded text-foreground focus:outline-none focus:border-primary/60"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-serif uppercase tracking-wider rounded hover:bg-primary/90 transition-colors">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.bookingStatus === "confirmed").length,
    pending: bookings.filter((b) => b.bookingStatus === "pending_birth_details").length,
    noCalendar: bookings.filter((b) => b.dateOfBirth && !b.googleCalendarEventLink).length,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="font-serif text-xl gold-gradient-text">KosmicTrinity · Admin Bookings</h1>
        <button onClick={loadBookings} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Bookings", value: stats.total },
            { label: "Confirmed", value: stats.confirmed },
            { label: "Pending Details", value: stats.pending },
            { label: "Calendar Pending", value: stats.noCalendar },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded p-4">
              <p className="text-2xl font-serif text-primary">{s.value}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {loading && <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={28} /></div>}

        {!loading && bookings.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No bookings yet.</p>
        )}

        {!loading && bookings.length > 0 && (
          <div className="overflow-x-auto rounded border border-border">
            <table className="w-full text-sm">
              <thead className="bg-card border-b border-border">
                <tr>
                  {["Booking ID", "Customer", "Service", "Amount", "Birth Details", "Calendar", "Status", "Date", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-card/50 transition-colors">
                    <td className="px-4 py-3 font-serif text-primary whitespace-nowrap">{b.bookingId}</td>
                    <td className="px-4 py-3">
                      <div>{b.customerName}</div>
                      <div className="text-xs text-muted-foreground">{b.customerEmail}</div>
                    </td>
                    <td className="px-4 py-3 max-w-[180px]">
                      <span className="text-xs leading-relaxed">{b.serviceName}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-primary font-serif">
                      {fmt(b.paymentAmount, b.paymentCurrency)}
                    </td>
                    <td className="px-4 py-3">
                      {b.dateOfBirth ? (
                        <div className="text-xs space-y-0.5">
                          <div>{b.dateOfBirth}</div>
                          <div className="text-muted-foreground">{b.birthTime}</div>
                          <div className="text-muted-foreground">{b.birthPlace}</div>
                        </div>
                      ) : <span className="text-muted-foreground text-xs">Not yet</span>}
                    </td>
                    <td className="px-4 py-3">
                      {b.googleCalendarEventLink ? (
                        <a href={b.googleCalendarEventLink} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary text-xs hover:underline">
                          View <ExternalLink size={10} />
                        </a>
                      ) : (
                        <span className="text-muted-foreground text-xs">
                          {b.calendarLastError ? "⚠ Failed" : "—"}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">{statusBadge(b.bookingStatus)}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(b.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Set session time */}
                        <button
                          title="Set session time"
                          onClick={() => { setSelectedBooking(b); setSessionForm({ sessionDate: "", sessionDuration: String(b.sessionDuration ?? 60), sessionTimezone: b.sessionTimezone ?? "Asia/Kolkata" }); }}
                          className="p-1.5 rounded border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <CalendarClock size={13} />
                        </button>
                        {/* Retry calendar */}
                        {b.dateOfBirth && !b.googleCalendarEventLink && (
                          <button
                            title="Retry calendar"
                            disabled={actionLoading[b.bookingId + "/retry-calendar"]}
                            onClick={() => doAction(b.bookingId, "/retry-calendar")}
                            className="p-1.5 rounded border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-colors disabled:opacity-40"
                          >
                            {actionLoading[b.bookingId + "/retry-calendar"] ? <Loader2 size={13} className="animate-spin" /> : <RefreshCw size={13} />}
                          </button>
                        )}
                        {/* Resend email */}
                        <button
                          title="Resend confirmation email"
                          disabled={actionLoading[b.bookingId + "/resend-email"]}
                          onClick={() => doAction(b.bookingId, "/resend-email")}
                          className="p-1.5 rounded border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-colors disabled:opacity-40"
                        >
                          {actionLoading[b.bookingId + "/resend-email"] ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
                        </button>
                        {/* Cancel */}
                        {b.bookingStatus !== "cancelled" && (
                          <button
                            title="Cancel booking"
                            disabled={actionLoading[b.bookingId + ""]}
                            onClick={() => { if (confirm(`Cancel booking ${b.bookingId}?`)) doAction(b.bookingId, "", "DELETE"); }}
                            className="p-1.5 rounded border border-border hover:border-red-500/50 text-muted-foreground hover:text-red-400 transition-colors disabled:opacity-40"
                          >
                            <XCircle size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Set session time modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSelectedBooking(null)} />
          <div className="relative bg-card border border-border rounded w-full max-w-sm p-6 shadow-2xl">
            <h3 className="font-serif text-lg mb-1">Set Session Time</h3>
            <p className="text-xs text-muted-foreground mb-4">{selectedBooking.bookingId} · {selectedBooking.customerName}</p>
            <form onSubmit={handleSetSession} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 block">Session Date & Time</label>
                <input type="datetime-local" required value={sessionForm.sessionDate}
                  onChange={(e) => setSessionForm({ ...sessionForm, sessionDate: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:border-primary/60" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 block">Duration (minutes)</label>
                <input type="number" value={sessionForm.sessionDuration} min={15} max={240}
                  onChange={(e) => setSessionForm({ ...sessionForm, sessionDuration: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:border-primary/60" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 block">Timezone</label>
                <input type="text" value={sessionForm.sessionTimezone}
                  onChange={(e) => setSessionForm({ ...sessionForm, sessionTimezone: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:border-primary/60" />
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setSelectedBooking(null)}
                  className="flex-1 py-2 border border-border rounded text-sm text-muted-foreground hover:border-primary/40 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={sessionLoading}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded text-sm font-serif uppercase tracking-wider hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {sessionLoading && <Loader2 size={12} className="animate-spin" />}
                  Save & Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
