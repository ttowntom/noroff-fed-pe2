import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { postFn, queryClient } from "../../utils/http";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";
import LinkButton from "../LinkButton";
import Modal from "../Modal";
import Notification from "../Notification";
import useUserStore from "../../store/userStore.js";

export default function BookingModal({
  venue,
  isModalOpen,
  setIsModalOpen,
  isBookingSuccess,
  setIsBookingSuccess,
  dateRange,
  setDateRange,
  guests,
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
      // Re-fetch or invalidate queries
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
              <Notification type="error">{error?.message}</Notification>
            )}
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="text-light-text-primary hover:underline dark:text-dark-text-primary"
              >
                Cancel booking
              </button>
              <Button onClick={handleConfirm} disabled={isPending}>
                Book now
              </Button>
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
            <LinkButton to="/profile/bookings">View bookings</LinkButton>
          </div>
        </div>
      )}
    </Modal>
  );
}
