import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

import { NO_VENUE_IMG_URL } from "../../constants.js";
import useUserStore from "../../store/userStore.js";
import { deleteFn, queryClient } from "../../utils/http.js";
import Modal from "../Modal.jsx";
import Button from "../Button.jsx";
import DateBox from "../DateBox.jsx";
import Loading from "../Loading.jsx";
import Notification from "../Notification.jsx";

export default function BookingCard({ booking }) {
  const user = useUserStore((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const hasExpired = new Date(booking.dateTo) < new Date();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () =>
      deleteFn({ url: `/holidaze/bookings/${booking.id}`, token: user?.token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`/holidaze/profiles/${user.name}/bookings`],
      });
      window.location.reload();
    },
  });

  function handleClickDelete() {
    setShowModal(true);
  }

  function handleConfirmDelete() {
    mutate();
  }

  return (
    <div
      className={`${hasExpired && "border border-light-border-error bg-light-bg-error dark:bg-dark-bg-primary"} ${!hasExpired && "bg-light-bg-secondary dark:bg-dark-bg-secondary"} group flex w-full flex-col gap-2 rounded-md border p-4 text-light-text-primary hover:shadow-md dark:text-dark-text-primary`}
    >
      <div className="overflow-hidden rounded-sm">
        <img
          src={booking.venue.media[0]?.url || NO_VENUE_IMG_URL}
          alt={booking.venue.name}
          className="h-48 w-full rounded-sm object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h2 className="text-xl font-bold">{booking.venue.name}</h2>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to={`/venues/${booking.venue.id}`}
          className="flex items-center gap-2 text-light-link-primary hover:underline dark:text-dark-link-primary"
        >
          View venue details
          <FontAwesomeIcon
            icon={byPrefixAndName.fas["chevron-right"]}
            className="text-sm text-light-text-primary dark:text-dark-text-primary"
          />
        </Link>
        {!hasExpired && (
          <button
            onClick={handleClickDelete}
            className="flex items-center gap-2 text-sm text-light-text-error hover:underline dark:text-dark-text-error"
          >
            Delete booking
            <FontAwesomeIcon
              icon={byPrefixAndName.fas["cancel"]}
              className="text-sm text-color-system-error-red dark:text-color-system-error-red"
            />
          </button>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-2 xs:flex-row">
        <DateBox date={booking.dateFrom} />
        <FontAwesomeIcon
          icon={byPrefixAndName.fas["horizontal-rule"]}
          className="text-light-text-primary dark:text-dark-text-primary"
        />
        <DateBox date={booking.dateTo} />
      </div>
      {showModal && (
        <Modal>
          <div className="flex max-w-[65ch] flex-col gap-4">
            <h2 className="text-2xl font-semibold">Confirm Booking Deletion</h2>
            <p>
              Please confirm that you want to delete your booking at{" "}
              <span className="font-semibold">{booking.venue.name}</span>
            </p>
            {isError && (
              <Notification type="error">
                <p>{error?.message || "Could not delete booking"}</p>
              </Notification>
            )}
            <div className="flex flex-col gap-4">
              <div className="mt-4 flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="text-light-text-primary hover:underline dark:text-dark-text-primary"
                >
                  Cancel
                </button>
                {!isPending ? (
                  <Button variant="danger" onClick={handleConfirmDelete}>
                    Delete now
                  </Button>
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
