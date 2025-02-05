/**
 * Formats a number as USD currency string without decimals
 * @param {number} int - Number to format as currency
 * @returns {string} Formatted price string
 *
 * @example
 * priceFormatter(1000); // "$1,000"
 * priceFormatter(50); // "$50"
 * priceFormatter(1234567); // "$1,234,567"
 */
export default function priceFormatter(int) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(int);
}
