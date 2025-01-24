import { useState } from "react";
import DatePicker from "react-datepicker";
import { enGB } from "date-fns/locale";
import { differenceInDays } from "date-fns";
import { getBookedRanges, isDateBooked } from "../../utils/bookingLogic";
import Button from "../Button";
import GuestCounter from "./GuestCounter";
import BookingPriceSummary from "./BookingPriceSummary";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker.css";

export default function BookingCard({ venue }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [guests, setGuests] = useState(1);

  const nights =
    startDate && endDate ? differenceInDays(endDate, startDate) : 0;

  const bookedRanges = getBookedRanges(venue.bookings);
  const excludeDates = bookedRanges.flatMap((range) => {
    const dates = [];
    let current = new Date(range.start);
    while (current <= range.end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  });

  return (
    <aside className="sticky top-4 mb-6 h-fit w-full rounded-md border border-light-border-secondary bg-light-bg-primary p-4 text-light-text-primary shadow-md dark:border-dark-border-tertiary dark:bg-dark-bg-primary dark:text-dark-text-primary md:mb-0 lg:w-1/3">
      <h2 className="text-xl font-semibold">Reserve your stay</h2>
      <form className="flex flex-col gap-4">
        <label htmlFor="dates" className="-mb-2 mt-4 font-medium">
          Select dates
        </label>
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={setDateRange}
          placeholderText="Select dates"
          dateFormat="MMM dd, yyyy"
          minDate={new Date()}
          excludeDates={excludeDates}
          locale={enGB}
          monthsShown={1}
          showIcon
          // calendarClassName="custom-datepicker"
          dayClassName={(date) =>
            isDateBooked(date, bookedRanges) ? "booked-date" : undefined
          }
        />

        <label htmlFor="guests" className="-mb-2 font-medium">
          Number of Guests
        </label>
        <GuestCounter
          guests={guests}
          maxGuests={venue.maxGuests}
          onIncrease={() =>
            setGuests((prev) => Math.min(prev + 1, venue.maxGuests))
          }
          onDecrease={() => setGuests((prev) => Math.max(prev - 1, 1))}
        />

        <BookingPriceSummary nights={nights} pricePerNight={venue.price} />

        <Button disabled={!startDate || !endDate}>Book Now</Button>
      </form>
    </aside>
  );
}
