export const NAVRATRI_SESSION_KEY = "kt-navratri-popup-seen";
// Promotion hides after the end of 19 October 2026 IST.
export const NAVRATRI_PROMO_END_MS = Date.parse("2026-10-20T00:00:00+05:30");

export function promoActive(): boolean {
  return Date.now() < NAVRATRI_PROMO_END_MS;
}

export function formatRupees(paise: number): string {
  const r = paise / 100;
  return `\u20B9${Number.isInteger(r) ? r.toLocaleString("en-IN") : r.toFixed(2)}`;
}

export function formatLongDate(iso: string | undefined, fallback = "11 October 2026"): string {
  if (!iso) return fallback;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return fallback;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
}

export function errorMessage(e: unknown, fallback: string): string {
  const anyE = e as { data?: { error?: unknown } | null; message?: string } | null;
  const apiMsg = anyE?.data?.error;
  if (typeof apiMsg === "string" && apiMsg) return apiMsg;
  if (e instanceof TypeError) return "We could not reach the server. Check your connection and try again.";
  return fallback;
}

export function isNotFound(e: unknown): boolean {
  return (e as { status?: number } | null)?.status === 404;
}

export const DEVIS = [
  "Shailaputri", "Brahmacharini", "Chandraghanta", "Kushmanda", "Skandamata",
  "Katyayani", "Kalaratri", "Mahagauri", "Siddhidatri",
];

export const INCLUDES = [
  "Daily activities and meditations",
  "Intuitive Tarot guidance",
  "Rituals for each Devi",
  "Hand-holding through all nine days for integration",
];
