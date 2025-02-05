import { enGB } from "date-fns/locale";
import DatePicker from "react-datepicker";

import Button from "../Button";
import LinkButton from "../LinkButton";

import GuestCounter from "./GuestCounter";
import BookingPriceSummary from "./BookingPriceSummary";

/**
 * BookingForm component that handles venue reservation inputs
 * @component
 * @param {Object} props
 * @param {User} props.user - Currently logged in user
 * @param {Date|null} props.startDate - Selected start date
 * @param {Date|null} props.endDate - Selected end date
 * @param {Function} props.setDateRange - Function to update date range
 * @param {number} props.guests - Number of guests
 * @param {Function} props.setGuests - Function to update guest count
 * @param {Array<Date>} props.excludeDates - Array of unavailable dates
 * @param {Function} props.handleSubmit - Form submission handler
 * @param {Venue} props.venue - Venue data
 *
 * @example
 * function BookingCard({ venue }) {
 *   const [dateRange, setDateRange] = useState([null, null]);
 *   const [guests, setGuests] = useState(1);
 *
 *   return (
 *     <BookingForm
 *       user={user}
 *       startDate={dateRange[0]}
 *       endDate={dateRange[1]}
 *       setDateRange={setDateRange}
 *       guests={guests}
 *       setGuests={setGuests}
 *       excludeDates={excludeDates}
 *       handleSubmit={handleSubmit}
 *       venue={venue}
 *     />
 *   );
 * }
 */
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
