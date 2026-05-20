// Lightweight client-side validation. Server-side validation in supabase/functions/server
// is the authoritative check; these helpers exist to give fast UI feedback and to keep
// obviously malformed input from ever leaving the browser.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTROL_CHAR_RE = new RegExp("[\\u0000-\\u001F\\u007F]", "g");

export function validateEmail(
  raw: string,
): { ok: true; value: string } | { ok: false; error: string } {
  const value = raw.trim().toLowerCase();
  if (!value) return { ok: false, error: "Email is required" };
  if (value.length > 254) return { ok: false, error: "Email is too long" };
  if (!EMAIL_RE.test(value)) return { ok: false, error: "Enter a valid email address" };
  return { ok: true, value };
}

export function validatePassword(
  raw: string,
): { ok: true; value: string } | { ok: false; error: string } {
  if (!raw) return { ok: false, error: "Password is required" };
  if (raw.length < 8) return { ok: false, error: "Password must be at least 8 characters" };
  if (raw.length > 256) return { ok: false, error: "Password is too long" };
  if (!/[A-Za-z]/.test(raw) || !/[0-9]/.test(raw)) {
    return { ok: false, error: "Password must contain a letter and a number" };
  }
  return { ok: true, value: raw };
}

// Strip ASCII control characters and cap length. Use on free-text fields before sending.
export function sanitizeText(raw: string, maxLength = 200): string {
  return raw.replace(CONTROL_CHAR_RE, "").slice(0, maxLength).trim();
}
