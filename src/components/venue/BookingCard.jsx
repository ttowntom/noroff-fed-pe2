import { useState } from "react";
import { getBookedRanges } from "../../utils/bookingLogic";
import useUserStore from "../../store/userStore.js";
import BookingModal from "./BookingModal";
import BookingForm from "./BookingForm.jsx";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker.css";

export default function BookingCard({ venue }) {
  const user = useUserStore((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [guests, setGuests] = useState(1);

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

  function openModal() {
    setIsModalOpen(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    openModal();
  }

  return (
    <>
      <aside className="sticky top-4 mb-6 h-fit w-full rounded-md border border-light-border-secondary bg-light-bg-primary p-4 text-light-text-primary shadow-md dark:border-dark-border-tertiary dark:bg-dark-bg-primary dark:text-dark-text-primary md:mb-0 lg:w-1/3">
        <h2 className="text-xl font-semibold">Reserve your stay</h2>
        <BookingForm
          user={user}
          startDate={startDate}
          endDate={endDate}
          setDateRange={setDateRange}
          guests={guests}
          setGuests={setGuests}
          excludeDates={excludeDates}
          venue={venue}
          handleSubmit={handleSubmit}
        />

        {isModalOpen && (
          <BookingModal
            venue={venue}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            isBookingSuccess={isBookingSuccess}
            setIsBookingSuccess={setIsBookingSuccess}
            dateRange={dateRange}
            setDateRange={setDateRange}
            guests={guests}
            setGuests={setGuests}
          />
        )}
      </aside>
    </>
  );
}
