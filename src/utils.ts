/**
 * High-performance email extraction optimized for bulk datasets (100,000+ emails).
 * Runs completely in client-side memory without external requests.
 */
export const extractEmails = (text: string): string[] => {
  if (!text || text.length === 0) return [];

  // Fast optimized regex
  const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = text.match(regex);
  if (!matches) return [];

  return matches;
};

/**
 * Validates a single email format
 */
export const isValidEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

/**
 * Fast deduplication
 */
export const deduplicateArray = (items: string[]): string[] => {
  return Array.from(new Set(items));
};

/**
 * Utility to conditionally merge class names
 */
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
