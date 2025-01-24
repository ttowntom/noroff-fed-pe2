import { useState } from "react";
import { differenceInDays } from "date-fns";
import BookingModal from "./BookingModal";
import { getBookedRanges } from "../../utils/bookingLogic";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker.css";

export default function BookingCard({ venue }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [guests, setGuests] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  const nights =
    startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const bookedRanges = getBookedRanges(venue.bookings);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <aside className="sticky top-4 mb-6 w-full rounded-md border border-light-border-secondary bg-light-bg-primary p-4 text-light-text-primary shadow-md dark:border-dark-border-tertiary dark:bg-dark-bg-primary dark:text-dark-text-primary sm:mb-0 lg:w-1/3">
      <h2 className="text-xl font-semibold">Reserve your stay</h2>
      <BookingForm
        startDate={startDate}
        endDate={endDate}
        setDateRange={setDateRange}
        guests={guests}
        setGuests={setGuests}
        nights={nights}
        venue={venue}
        openModal={openModal}
        bookedRanges={bookedRanges}
      />
      {isModalOpen && (
        <BookingModal
          venue={venue}
          guests={guests}
          startDate={startDate}
          endDate={endDate}
          isBookingSuccess={isBookingSuccess}
          closeModal={closeModal}
          setIsBookingSuccess={setIsBookingSuccess}
        />
      )}
    </aside>
  );
}
