export function getBookedRanges(bookings) {
  return bookings.map(({ dateFrom, dateTo }) => ({
    start: new Date(dateFrom),
    end: new Date(dateTo),
  }));
}

export function isDateBooked(date, ranges) {
  return ranges.some((range) => date >= range.start && date <= range.end);
}
