import { useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";
import useUserStore from "../store/userStore.js";
import useProfileData from "../hooks/useProfileData.js";
import Notification from "../components/Notification.jsx";
import Bio from "../components/profile/Bio.jsx";
import BookingCard from "../components/profile/BookingCard.jsx";
import VenueCard from "../components/venue/VenueCard.jsx";
import Loading from "../components/Loading.jsx";

export default function Profile() {
  const { name } = useParams();
  const [showExpired, setShowExpired] = useState(false);
  const user = useUserStore((state) => state.user);
  const isSelf = user?.name === name || null;

  // Fetch user data
  const { profile, venues, bookings, isLoading, isError, errors } =
    useProfileData(name, user.token);

  function handleToggleExpired() {
    setShowExpired((prev) => !prev);
  }

  let hasPastBookings = false;
  const filteredBookings = bookings?.data?.filter((booking) => {
    const hasExpired = new Date(booking.dateTo) < new Date();
    hasPastBookings = hasExpired || hasPastBookings;
    return showExpired ? hasExpired : !hasExpired;
  });

  return (
    <>
      <div className="mx-auto flex max-w-[55ch] flex-col items-center gap-4 dark:text-dark-text-primary">
        {isLoading && <Loading />}
        {isError && (
          <Notification type="error">
            <p>{errors[0]?.message}</p>
          </Notification>
        )}
      </div>
      {profile && (
        <div>
          <Bio data={profile} isSelf={isSelf} />
          {venues?.data?.length > 0 && (
            <section>
              <div className="mt-12 flex flex-wrap justify-between gap-2">
                <h2 className="mb-2 text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">
                  Venues
                </h2>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] justify-items-center gap-4 md:grid-cols-[repeat(auto-fit,minmax(min(100%/4,300px),1fr))]">
                {venues?.data?.map((venue) => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
              </div>
            </section>
          )}
          {isSelf && bookings?.data?.length > 0 && (
            <section>
              <div className="mt-12 flex flex-wrap justify-between gap-2">
                <h2 className="mb-2 text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">
                  Your Bookings
                </h2>
                {hasPastBookings && (
                  <div className="mb-2 flex w-full items-center gap-2 sm:flex-row-reverse">
                    <button onClick={handleToggleExpired}>
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

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );
}
