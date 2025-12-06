/**
 * Helper function to format numbers as currency
 * @param {number} value - The number to format
 * @param {string} currency - Currency code (e.g., 'USD', 'INR')
 * @param {string} locale - Locale string (e.g., 'en-US', 'en-IN')
 * @returns {string} Formatted currency string
 */
export function formatMoney(value, currency = "INR", locale = "en-IN") {
  try {
    return value.toLocaleString(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    });
  } catch {
    // Fallback if locale/currency is invalid
    return `${currency} ${Math.round(value)}`;
  }
}