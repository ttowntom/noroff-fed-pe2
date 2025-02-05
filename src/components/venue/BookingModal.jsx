import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { postFn, queryClient } from "../../utils/http";
import Button from "../Button";
import LinkButton from "../LinkButton";
import Modal from "../Modal";
import Notification from "../Notification";
import useUserStore from "../../store/userStore.js";
import Loading from "../Loading.jsx";

/**
 * BookingModal component for handling venue booking confirmation and submission
 * @component
 * @param {Object} props
 * @param {Venue} props.venue - Venue being booked
 * @param {boolean} props.isModalOpen - Modal visibility state
 * @param {Function} props.setIsModalOpen - Function to update modal visibility
 * @param {boolean} props.isBookingSuccess - Booking success state
 * @param {Function} props.setIsBookingSuccess - Function to update booking success
 * @param {Array<Date|null>} props.dateRange - Selected date range [startDate, endDate]
 * @param {Function} props.setDateRange - Function to update date range
 * @param {number} props.guests - Number of guests
 * @param {Function} props.setGuests - Function to update guest count
 *
 * @example
 * function VenuePage({ venue }) {
 *   const [isModalOpen, setIsModalOpen] = useState(false);
 *   const [dateRange, setDateRange] = useState([null, null]);
 *   const [guests, setGuests] = useState(1);
 *
 *   return (
 *     <BookingModal
 *       venue={venue}
 *       isModalOpen={isModalOpen}
 *       setIsModalOpen={setIsModalOpen}
 *       dateRange={dateRange}
 *       setDateRange={setDateRange}
 *       guests={guests}
 *       setGuests={setGuests}
 *     />
 *   );
 * }
 */
export default function BookingModal({
  venue,
  isModalOpen,
  setIsModalOpen,
  isBookingSuccess,
  setIsBookingSuccess,
  dateRange,
  setDateRange,
  guests,
  setGuests,
}) {
  const user = useUserStore((state) => state.user);
  const [startDate, endDate] = dateRange;

  // React Query mutation
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

  function closeModal() {
    setIsModalOpen(false);
  }

  function closeConfirm() {
    setIsBookingSuccess(false);
    setDateRange([null, null]);
    setGuests(1);
    closeModal();
  }

  function handleConfirm() {
    const dateFrom = format(startDate, "yyyy-MM-dd");
    const dateTo = format(endDate, "yyyy-MM-dd");
    mutate({ dateFrom, dateTo, guests, venueId: venue.id, token: user?.token });
    setIsBookingSuccess(false);
  }

  if (!isModalOpen) return null;

  return (
    <Modal onClose={closeModal}>
      {!isBookingSuccess ? (
        <div className="flex max-w-[65ch] flex-col gap-4">
          <h2 className="text-2xl font-semibold">Confirm Booking</h2>
          <p>
            Please confirm your booking at{" "}
            <span className="font-semibold">{venue.name}</span> for{" "}
            <span className="font-semibold">{guests} guests</span> from{" "}
            <span className="font-semibold">
              {format(startDate, "MMM dd, yyyy")} to{" "}
              {format(endDate, "MMM dd, yyyy")}
            </span>
          </p>
          <div className="flex flex-col gap-4">
            {isError && (
              <Notification type="error">
                <p>{error?.message}</p>
              </Notification>
            )}
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="text-light-text-primary hover:underline dark:text-dark-text-primary"
              >
                Cancel booking
              </button>
              {!isPending ? (
                <Button onClick={handleConfirm} disabled={isPending}>
                  Book now
                </Button>
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex max-w-[65ch] flex-col gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold">Booking Successful!</h2>
            <FontAwesomeIcon
              icon={byPrefixAndName.fas["party-horn"]}
              className="text-light-button-primary dark:text-dark-button-primary"
            />
          </div>
          <p>
            Congratulations! Your booking at{" "}
            <span className="font-semibold">{venue.name}</span> is confirmed.
          </p>
          <div className="mt-4 flex justify-end gap-4">
            <button
              onClick={closeConfirm}
              className="text-light-text-primary hover:underline dark:text-dark-text-primary"
            >
              Close
            </button>
            <LinkButton to={`/profile/${user.name}/bookings`}>
              View bookings
            </LinkButton>
          </div>
        </div>
      )}
    </Modal>
  );
}
