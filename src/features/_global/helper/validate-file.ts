// Single source of truth for client-side upload validation. The server
// enforces its own limits; these checks fail fast with a clear message
// instead of uploading a file the server will reject. Content checking
// (magic bytes) stays server-side: browsers report unreliable MIME types
// for some extensions, so the client checks extension + size only.

export const UPLOAD_MAX_SIZE = {
  // Matches the "Max size: 2MB" label shown by the UploadFiles component.
  submission: 2 * 1024 * 1024,
  thumbnail: 2 * 1024 * 1024,
  // No label on the module form; matches the 10 MB per-file limit the
  // API applies to every upload (multer limits).
  moduleFile: 10 * 1024 * 1024,
} as const;

export interface UploadValidation {
  maxSizeBytes: number;
  // Extensions with a leading dot, e.g. [".zip", ".pdf"]. Compared
  // case-insensitively. Empty or omitted means the server decides the
  // type; size is still enforced.
  allowedExtensions?: string[];
}

const formatMaxSize = (maxSizeBytes: number): string => {
  const mb = maxSizeBytes / (1024 * 1024);
  return `${Math.round(mb * 100) / 100} MB`;
};

// Returns an error message when the file must be rejected, null when it
// passes. Callers show the message with toast.error, like the rest of
// the codebase.
export const validateUploadFile = (
  file: File,
  { maxSizeBytes, allowedExtensions = [] }: UploadValidation
): string | null => {
  if (file.size > maxSizeBytes) {
    return `File size must not exceed ${formatMaxSize(maxSizeBytes)}.`;
  }

  const allowed = allowedExtensions
    .map((ext) => ext.trim().toLowerCase())
    .filter(Boolean)
    .map((ext) => (ext.startsWith(".") ? ext : `.${ext}`));

  if (allowed.length > 0) {
    const dot = file.name.lastIndexOf(".");
    const ext = dot >= 0 ? file.name.slice(dot).toLowerCase() : "";
    if (!allowed.includes(ext)) {
      return `File type is not allowed. Allowed types: ${allowed.join(", ")}.`;
    }
  }

  return null;
};
