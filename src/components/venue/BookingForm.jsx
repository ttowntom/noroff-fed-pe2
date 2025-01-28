import { enGB } from "date-fns/locale";
import DatePicker from "react-datepicker";
import Button from "../Button";
import GuestCounter from "./GuestCounter";
import BookingPriceSummary from "./BookingPriceSummary";
import LinkButton from "../LinkButton";

export default function BookingForm({
  user,

  startDate,
  endDate,
  setDateRange,
  guests,
  setGuests,
  excludeDates,
  handleSubmit,
  venue,
}) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label htmlFor="dates" className="-mb-2 mt-4 font-medium">
        Select dates
      </label>
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        name="dates"
        onChange={setDateRange}
        placeholderText="Select dates"
        dateFormat="MMM dd, yyyy"
        minDate={new Date()}
        excludeDates={excludeDates}
        locale={enGB}
        monthsShown={1}
        showIcon
        toggleCalendarOnIconClick
      />

      {user && (
        <>
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
        </>
      )}

      <BookingPriceSummary
        nights={
          startDate && endDate
            ? (endDate - startDate) / (1000 * 60 * 60 * 24)
            : 0
        }
        pricePerNight={venue.price}
      />

      {user ? (
        <Button type="submit" disabled={!startDate || !endDate}>
          Book Now
        </Button>
      ) : (
        <LinkButton to="/login">Log in to book</LinkButton>
      )}
    </form>
  );
}
