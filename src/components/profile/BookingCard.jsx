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

export default function BookingCard({ booking }) {
  const user = useUserStore((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const hasExpired = new Date(booking.dateTo) < new Date();

  const { mutate } = useMutation({
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

  function RenderDate({ date }) {
    const dateObj = new Date(date);

    return (
      <div className="mt-4 flex flex-col items-center gap-1 rounded-md border border-light-border-primary bg-light-bg-primary px-4 py-2 dark:border-dark-border-primary dark:bg-dark-bg-primary">
        <p className="text-center">
          {dateObj.toLocaleDateString("en-GB", { weekday: "short" })}
        </p>
        <p className="text-center font-bold">
          {dateObj.toLocaleDateString("en-GB", { day: "numeric" })}
        </p>
        <p className="text-center">
          {dateObj.toLocaleDateString("en-GB", {
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    );
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
        <div className="flex items-center gap-4">
          <Link
            to={`/venues/${booking.venue.id}`}
            className="text-light-link-primary hover:opacity-80 dark:text-dark-link-primary"
          >
            View venue details
          </Link>
          <FontAwesomeIcon
            icon={byPrefixAndName.fas["chevron-right"]}
            className="text-sm text-light-text-primary dark:text-dark-text-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleClickDelete}
            className="text-sm text-light-text-error dark:text-dark-text-error"
          >
            Delete booking
          </button>
          <FontAwesomeIcon
            icon={byPrefixAndName.fas["chevron-right"]}
            className="text-sm text-light-text-primary dark:text-dark-text-primary"
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <RenderDate date={booking.dateFrom} />
        <FontAwesomeIcon
          icon={byPrefixAndName.fas["horizontal-rule"]}
          className="text-light-text-primary dark:text-dark-text-primary"
        />
        <RenderDate date={booking.dateTo} />
      </div>
      {showModal && (
        <Modal>
          <div className="flex max-w-[65ch] flex-col gap-4">
            <h2 className="text-2xl font-semibold">Confirm Booking Deletion</h2>
            <p>
              Please confirm that you want to delete your booking at{" "}
              <span className="font-semibold">{booking.venue.name}</span>
            </p>
            <div className="flex flex-col gap-4">
              <div className="mt-4 flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="text-light-text-primary hover:underline dark:text-dark-text-primary"
                >
                  Cancel
                </button>
                <Button onClick={handleConfirmDelete}>Delete now</Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
