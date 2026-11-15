// One place that turns whatever a failed request throws into a message
// worth showing. createRequest throws the raw response body, which can be
// a JSON error object, a plain string, or null — and a network failure
// throws a TypeError before any response exists. Reading `.message` off
// those shapes gives empty toasts, raw 502 HTML, or "Failed to fetch",
// so every onError toast goes through here.

const FALLBACK_MESSAGE = "Terjadi kesalahan. Silakan coba lagi.";
const NETWORK_MESSAGE =
  "Tidak dapat terhubung ke server. Periksa koneksi internet Anda lalu coba lagi.";

// Messages browsers use when fetch itself fails. Matched case-insensitively
// so a TypeError never surfaces its raw technical text.
const NETWORK_PATTERNS = [
  "failed to fetch",
  "networkerror",
  "network request failed",
  "load failed",
  "network error",
];

const looksLikeHtml = (text: string): boolean =>
  text.startsWith("<") ||
  /<!doctype html/i.test(text) ||
  /<html[\s>]/i.test(text);

// Returns the text when it is safe to show, null when the caller must
// fall back: empty, HTML, or a network failure (which gets its own message).
const presentable = (text: string): string | null => {
  const trimmed = text.trim();
  if (!trimmed) return null;
  if (looksLikeHtml(trimmed)) return null;
  if (
    NETWORK_PATTERNS.some((pattern) =>
      trimmed.toLowerCase().includes(pattern)
    )
  ) {
    return NETWORK_MESSAGE;
  }
  return trimmed;
};

export const getErrorMessage = (err: unknown): string => {
  if (typeof err === "string") {
    return presentable(err) ?? FALLBACK_MESSAGE;
  }
  if (err instanceof Error) {
    return presentable(err.message) ?? FALLBACK_MESSAGE;
  }
  if (err !== null && typeof err === "object") {
    const record = err as Record<string, unknown>;
    if (typeof record.message === "string") {
      return presentable(record.message) ?? FALLBACK_MESSAGE;
    }
    if (typeof record.code === "string" && record.code.trim()) {
      return record.code.trim();
    }
  }
  return FALLBACK_MESSAGE;
};
