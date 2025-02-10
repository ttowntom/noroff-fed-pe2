import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

import { deleteFn } from "../../utils/http";
import { queryClient } from "../../utils/http";
import useUserStore from "../../store/userStore";
import priceFormatter from "../../utils/priceFormatter";
import GalleryMobile from "../venue/GalleryMobile";
import RatingStars from "../venue/RatingStars";
import Amenities from "../venue/Amenities";
import BookingCard from "../venueManager/BookingCard";
import Notification from "../Notification";
import Modal from "../Modal";
import Button from "../Button";
import Loading from "../Loading";

/**
 * Venue overview component displaying venue details and booking management
 * @component
 * @param {Object} props
 * @param {Venue} props.venue - Venue data to display
 * @returns {JSX.Element} Venue overview with gallery, details and booking management
 *
 * @example
 * function VenueManagerPage() {
 *   const { venue } = useVenue(venueId);
 *
 *   return (
 *     <div className="venue-manager">
 *       <VenueOverview venue={venue} />
 *     </div>
 *   );
 * }
 */
export default function VenueOverview({ venue }) {
  const user = useUserStore((state) => state.user);
  const [showExpired, setShowExpired] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () =>
      deleteFn({ url: `/holidaze/venues/${venue.id}`, token: user.token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`/holidaze/profiles/${user.name}/venues?_bookings=true`],
      });
    },
  });

  function handleDeleteVenue() {
    mutate();
  }

  function handleToggleModal() {
    setShowModal((prev) => !prev);
  }

  function handleToggleExpired() {
    setShowExpired((prev) => !prev);
  }

  let hasPastBookings = false;
  const filteredBookings = venue.bookings
    .filter((booking) => {
      const hasExpired = new Date(booking.dateTo) < new Date();
      hasPastBookings = hasExpired || hasPastBookings;
      return showExpired ? hasExpired : !hasExpired;
    })
    .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

  return (
    <>
      <section className="flex flex-col gap-6 md:flex-row">
        <div className="w-full md:w-1/2">
          <GalleryMobile venue={venue} desktopHidden="false" />
        </div>
        <div className="w-full md:w-1/2">
          <div className="mb-4 flex max-w-80 items-center justify-between gap-4 text-color-system-error-red">
            <button
              onClick={handleToggleModal}
              className="group flex items-center gap-2"
            >
              <FontAwesomeIcon icon={byPrefixAndName.fas["trash"]} />
              <p className="group-hover:underline">Delete venue</p>
            </button>
            <Link
              to={`/venues/new-edit/${venue.id}`}
              className="group flex items-center gap-4 text-light-link-primary dark:text-dark-link-primary"
            >
              <p className="group-hover:underline">Edit venue</p>
              <FontAwesomeIcon icon={byPrefixAndName.fas["chevron-right"]} />
            </Link>
          </div>
          <h2 className="mb-2 text-3xl font-bold">{venue.name}</h2>
          <p>{venue.description}</p>
          <div className="my-6">
            <p>
              <span className="text-xl font-bold">
                {priceFormatter(venue.price)}
              </span>{" "}
              /night
            </p>
            <div className="flex gap-2">
              <RatingStars rating={venue.rating} />
              <p className="text-sm">({venue.rating} stars)</p>
            </div>
          </div>
          <div>
            <Amenities venue={venue} />
          </div>
          <div className="my-4 flex flex-col">
            <h3 className="mb-2 text-xl font-bold">Location</h3>
            <p>{venue.location.address}</p>
            <p>
              {venue.location.zip} {venue.location.city}
            </p>
            <p>{venue.location.country}</p>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 sm:gap-4">
          <h3 className="mb-2 min-w-fit text-left text-3xl font-bold">
            Bookings{" "}
            <span className="text-2xl font-normal">
              ({filteredBookings.length})
            </span>
          </h3>
          {hasPastBookings && (
            <div className="flex w-full gap-2 sm:flex-row">
              <button
                aria-label="Toggle previous bookings"
                onClick={handleToggleExpired}
              >
                {showExpired ? (
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas["toggle-on"]}
                    className="text-2xl"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fat["toggle-off"]}
                    className="text-2xl"
                  />
                )}
              </button>
              <p className="text-sm">Show past bookings</p>
            </div>
          )}
        </div>
        {venue.bookings.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <Notification type="info">
            <p>This venue has no bookings yet.</p>
          </Notification>
        )}
        {showModal && (
          <Modal onClose={handleToggleModal}>
            <div className="flex max-w-[65ch] flex-col gap-4">
              <h2 className="text-2xl font-semibold">Delete venue</h2>
              <p>
                Are you sure you want to delete{" "}
                <span className="font-semibold">{venue.name}</span> and all
                it&apos;s content?
              </p>
              <div className="flex flex-col gap-4">
                {isError && (
                  <Notification type="error">
                    <p>{error?.message}</p>
                  </Notification>
                )}
                <div className="mt-4 flex justify-end gap-4">
                  <button
                    onClick={handleToggleModal}
                    className="text-light-text-primary hover:underline dark:text-dark-text-primary"
                  >
                    No, don&apos;t delete
                  </button>
                  {!isPending ? (
                    <Button
                      variant="danger"
                      onClick={handleDeleteVenue}
                      disabled={isPending}
                    >
                      Delete
                    </Button>
                  ) : (
                    <Loading />
                  )}
                </div>
              </div>
            </div>
          </Modal>
        )}
      </section>
    </>
  );
}
