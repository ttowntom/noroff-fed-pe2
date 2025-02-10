import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

import { fetchFn } from "../utils/http.js";
import useUserStore from "../store/userStore";
import Notification from "../components/Notification.jsx";
import NotManagerMsg from "../components/venueManager/NotManagerMsg.jsx";
import LinkButton from "../components/LinkButton.jsx";
import VenueOverview from "../components/venueManager/VenueOverview.jsx";
import Loading from "../components/Loading.jsx";

/**
 * Venue manager dashboard displaying user's venues and bookings
 * @component
 * @returns {JSX.Element} Dashboard with venue list and management controls
 *
 * @example
 * function App() {
 *   return (
 *     <Routes>
 *       <Route
 *         path="/venue-manager"
 *         element={
 *           <ProtectedRoute>
 *             <VenueManager />
 *           </ProtectedRoute>
 *         }
 *       />
 *     </Routes>
 *   );
 * }
 */
export default function VenueManager() {
  const user = useUserStore((state) => state.user);
  const [openVenues, setOpenVenues] = useState({});

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      `/holidaze/profiles/${user.name}/venues?_bookings=true`,
      user.token,
    ],
    queryFn: () =>
      fetchFn({
        queryKey: [`/holidaze/profiles/${user.name}/venues?_bookings=true`],
        token: user.token,
      }),
  });

  const toggleVenue = (id) => {
    setOpenVenues((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 text-light-text-primary dark:text-dark-text-primary">
        <div className="space-y-4 text-center">
          <h1 className="font-notoSerif text-4xl font-semibold sm:text-5xl">
            Venue Manager
          </h1>
          <p>View and update your venue listings in one place.</p>
          {isLoading && <Loading />}
          {isError && (
            <Notification type="error">
              <p>{error.message}</p>
            </Notification>
          )}
        </div>
        {!user.venueManager && <NotManagerMsg />}
        {user.venueManager && (
          <div className="mt-6 flex w-full flex-col gap-4">
            {data?.data.map((venue) => (
              <div
                key={venue.id}
                aria-live="polite"
                className="w-full rounded-sm border-t border-light-border-primary dark:border-dark-border-primary"
              >
                <button
                  onClick={() => toggleVenue(venue.id)}
                  className="group mb-6 flex w-full items-center justify-between rounded-md bg-light-bg-secondary p-4 hover:shadow-md dark:bg-dark-bg-secondary"
                >
                  {!openVenues[venue.id] ? (
                    <h2 className="break-words text-left text-xl font-semibold">
                      {venue.name}
                    </h2>
                  ) : (
                    <p className="group-hover:font-medium">
                      Close venue details
                    </p>
                  )}
                  <FontAwesomeIcon
                    icon={
                      byPrefixAndName.fas[
                        openVenues[venue.id]
                          ? "circle-chevron-up"
                          : "circle-chevron-down"
                      ]
                    }
                    className="text-light-link-primary dark:text-dark-link-primary"
                  />
                </button>
                {openVenues[venue.id] && <VenueOverview venue={venue} />}
              </div>
            ))}
          </div>
        )}
      </div>
      {user.venueManager && (
        <div className="mt-12 w-fit">
          <LinkButton to="/venues/new-edit">
            <FontAwesomeIcon
              icon={byPrefixAndName.fas["plus"]}
              className="mr-2 text-light-text-alternate dark:text-dark-text-primary"
            />
            Add new venue
          </LinkButton>
        </div>
      )}
    </>
  );
}
