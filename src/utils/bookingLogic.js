/**
 * Converts booking dates to Date objects for range checking
 * @param {Array<Booking>} bookings - Array of booking objects
 * @returns {Array<DateRange>} Array of date ranges
 */
export function getBookedRanges(bookings) {
  return bookings.map(({ dateFrom, dateTo }) => ({
    start: new Date(dateFrom),
    end: new Date(dateTo),
  }));
}

/**
 * Checks if a date falls within any booked ranges
 * @param {Date} date - Date to check
 * @param {Array<DateRange>} ranges - Array of booked date ranges
 * @returns {boolean} True if date is booked
 */
export function isDateBooked(date, ranges) {
  return ranges.some((range) => date >= range.start && date <= range.end);
}
