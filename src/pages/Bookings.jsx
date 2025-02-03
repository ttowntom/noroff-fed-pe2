import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";
import { fetchFn } from "../utils/http.js";
import useUserStore from "../store/userStore";
import Notification from "../components/Notification.jsx";
import BookingCard from "../components/profile/BookingCard.jsx";
import Loading from "../components/Loading.jsx";

export default function Bookings() {
  const { name } = useParams();
  const [showExpired, setShowExpired] = useState(false);
  const user = useUserStore((state) => state.user);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["bookings", name],
    queryFn: () =>
      fetchFn({
        queryKey: [
          `/holidaze/profiles/${name}/bookings?_venue=true&sort=dateFrom&sortOrder=asc`,
        ],
        token: user?.token,
      }),
    enabled: !!user?.token, // Only run query if token exists
  });

  function handleToggleExpired() {
    setShowExpired((prev) => !prev);
  }

  let hasPastBookings = false;
  const filteredBookings = data?.data
    ?.filter((booking) => {
      const hasExpired = new Date(booking.dateTo) < new Date();
      hasPastBookings = hasExpired || hasPastBookings;
      return showExpired ? hasExpired : !hasExpired;
    })
    .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

  return (
    <div className="flex flex-col items-center justify-center gap-6 text-light-text-primary dark:text-dark-text-primary">
      <div className="space-y-4 text-center">
        <h1 className="font-notoSerif text-4xl font-semibold sm:text-5xl">
          Bookings
        </h1>
        <p>Here’s a quick look at your upcoming bookings.</p>
      </div>

      {data && data.data.length > 0 && (
        <div className="mt-4 w-full space-y-2">
          {hasPastBookings && (
            <div className="flex w-full items-center gap-2 sm:flex-row-reverse">
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      )}

      {data?.data?.length === 0 && (
        <Notification type="info">
          <p>You have no bookings.</p>
        </Notification>
      )}

      {isLoading && <Loading />}
      {isError && (
        <Notification type="error">
          <p>{error?.message || "Could not load booking data"}</p>
        </Notification>
      )}
    </div>
  );
}
