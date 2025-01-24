import { format } from "date-fns";
import Button from "../../Button";
import Modal from "../../Modal";
import Notification from "../../Notification";
import { useMutation } from "@tanstack/react-query";
import { postFn, queryClient } from "../../../utils/http";
import { venueKeys } from "../../../utils/queryKeys";

export default function BookingModal({
  venue,
  guests,
  startDate,
  endDate,
  isBookingSuccess,
  closeModal,
  setIsBookingSuccess,
}) {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ dateFrom, dateTo, guests, venueId, token }) =>
      postFn({
        url: `/holidaze/bookings`,
        body: { dateFrom, dateTo, guests, venueId },
        token,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: venueKeys.details(venue.id),
      });
      setIsBookingSuccess(true);
    },
  });

  function handleConfirm() {
    const dateFrom = format(startDate, "yyyy-MM-dd");
    const dateTo = format(endDate, "yyyy-MM-dd");

    mutate({ dateFrom, dateTo, guests, venueId: venue.id, token: user.token });
    setIsBookingSuccess(false);
  }

  return (
    <Modal onClose={closeModal}>
      {!isBookingSuccess && (
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
              className="text-light-button-primary dark:text-dark-button-primary"
            />
          </div>
          <p>
            Your booking at <span className="font-semibold">{venue.name}</span>{" "}
            for <span className="font-semibold">{guests} guests</span> from{" "}
            <span className="font-semibold">
              {format(startDate, "MMM dd, yyyy")} to{" "}
              {format(endDate, "MMM dd, yyyy")}
            </span>{" "}
            has been confirmed.
          </p>
          <Button onClick={closeModal}>Close</Button>
        </div>
      )}
    </Modal>
  );
}
