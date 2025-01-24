import DatePicker from "react-datepicker";
import { enGB } from "date-fns/locale";
import Button from "../../Button";
import GuestCounter from "./GuestCounter";
import PriceSummary from "./PriceSummary";
import { isDateBooked } from "../../../utils/bookingUtils";

export default function BookingForm({
  startDate,
  endDate,
  setDateRange,
  guests,
  setGuests,
  nights,
  venue,
  openModal,
  bookedRanges,
}) {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        openModal();
      }}
    >
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
        excludeDates={bookedRanges.flatMap((range) => {
          const dates = [];
          let currentDate = new Date(range.start);
          while (currentDate <= range.end) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
          return dates;
        })}
        locale={enGB}
        monthsShown={1}
        showIcon
        calendarClassName="custom-datepicker"
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

      {nights > 0 && (
        <PriceSummary nights={nights} pricePerNight={venue.price} />
      )}

      <Button disabled={!startDate || !endDate}>Book Now</Button>
    </form>
  );
}
