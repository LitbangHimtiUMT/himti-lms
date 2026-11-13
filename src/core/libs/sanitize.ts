import DOMPurify from "dompurify";

// HTML from the server (module/assignment content written in SunEditor) is
// rendered with dangerouslySetInnerHTML, so it must be sanitized first.
// Default DOMPurify config is enough: it keeps formatting tags and inline
// styles (what SunEditor produces) and strips scripts, event handlers, and
// javascript: URLs. Iframes are NOT allowed on purpose: video embeds are a
// separate youtubeId field rendered by the YoutubeEmbed component, never
// part of this HTML.
export const sanitizeHtml = (dirty: string): string =>
  DOMPurify.sanitize(dirty);
