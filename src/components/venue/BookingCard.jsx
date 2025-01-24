import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { differenceInDays } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";
import { queryClient } from "../../utils/http";
import { getBookedRanges } from "../../utils/bookingLogic";
import { postFn } from "../../utils/http.js";
import Button from "../Button";
import GuestCounter from "./GuestCounter";
import useUserStore from "../../store/userStore.js";
import BookingPriceSummary from "./BookingPriceSummary";
import LinkButton from "../LinkButton";
import Modal from "../Modal";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker.css";

export default function BookingCard({ venue }) {
  const user = useUserStore((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
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

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function closeConfirm() {
    setIsBookingSuccess(false);
    setDateRange([null, null]);
    closeModal();
  }

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ dateFrom, dateTo, guests, venueId, token }) =>
      postFn({
        url: `/holidaze/bookings`,
        body: { dateFrom, dateTo, guests, venueId },
        token,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`/holidaze/venues/${venue.id}?_owner=true&_bookings=true`],
      });
      setIsBookingSuccess(true);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    openModal();
  }

  function handleConfirm() {
    const dateFrom = format(startDate, "yyyy-MM-dd");
    const dateTo = format(endDate, "yyyy-MM-dd");

    mutate({ dateFrom, dateTo, guests, venueId: venue.id, token: user.token });
    setIsBookingSuccess(false);
  }

  return (
    <>
      <aside className="sticky top-4 mb-6 h-fit w-full rounded-md border border-light-border-secondary bg-light-bg-primary p-4 text-light-text-primary shadow-md dark:border-dark-border-tertiary dark:bg-dark-bg-primary dark:text-dark-text-primary md:mb-0 lg:w-1/3">
        <h2 className="text-xl font-semibold">Reserve your stay</h2>
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

          <BookingPriceSummary nights={nights} pricePerNight={venue.price} />

          {user && (
            <Button type="submit" disabled={!startDate || !endDate}>
              Book Now
            </Button>
          )}

          {!user && <LinkButton to="/login">Log in to book</LinkButton>}
        </form>
      </aside>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {!isBookingSuccess && (
            <div className="flex max-w-[65ch] flex-col gap-4">
              <h2 className="text-2xl font-semibold">Confirm Booking</h2>
              <p>
                Please confirm your booking at{" "}
                <span className="font-semibold">{venue.name}</span> for{" "}
                <span className="font-semibold">{guests} guests</span> at{" "}
                <span className="font-semibold">
                  {format(startDate, "MMM dd, yyyy")} -{" "}
                  {format(endDate, "MMM dd, yyyy")}
                </span>
              </p>
              <div className="flex flex-col gap-4">
                {isError && (
                  <Notification type="error">{error.message}</Notification>
                )}
                <div className="mt-4 flex justify-end gap-4">
                  <button
                    onClick={closeModal}
                    className="text-light-text-primary hover:underline dark:text-dark-text-primary"
                  >
                    Cancel booking
                  </button>
                  <Button
                    type="submit"
                    onClick={handleConfirm}
                    disabled={isPending}
                  >
                    Book now
                  </Button>
                </div>
              </div>
            </div>
          )}

          {isBookingSuccess && (
            <div className="flex max-w-[65ch] flex-col gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-semibold">Booking Successful!</h2>
                <FontAwesomeIcon
                  icon={byPrefixAndName.fas["party-horn"]}
                  className="text-2xl text-light-text-success dark:text-dark-text-success"
                />
              </div>
              <p>
                Your booking at{" "}
                <span className="font-semibold">{venue.name}</span> for{" "}
                <span className="font-semibold">{guests} guests</span> at{" "}
                <span className="font-semibold">
                  {format(startDate, "MMM dd, yyyy")} -{" "}
                  {format(endDate, "MMM dd, yyyy")}
                </span>{" "}
                has been confirmed.
              </p>
              <div className="mt-4 flex justify-end gap-4">
                <button
                  onClick={closeConfirm}
                  className="text-light-text-primary hover:underline dark:text-dark-text-primary"
                >
                  Close
                </button>
                <LinkButton to="/profile/bookings">View bookings</LinkButton>
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
