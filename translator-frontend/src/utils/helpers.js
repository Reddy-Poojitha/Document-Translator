/**
 * Format seconds into mm:ss
 */
export function formatTime(seconds) {
  if (!isFinite(seconds) || isNaN(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

/**
 * Allowed file extensions
 */
export const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.txt']
export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
]

/**
 * Validate file type
 */
export function isValidFile(file) {
  const ext = '.' + file.name.split('.').pop().toLowerCase()
  return ALLOWED_EXTENSIONS.includes(ext)
}

/**
 * Get human-readable file size
 */
export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * Translate mode key to display label
 */
export const MODE_LABELS = {
  translate: 'Translate to Telugu',
  simplify: 'Simplify into easy Telugu',
  both: 'Translate + Explanation',
}
