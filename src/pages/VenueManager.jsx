import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";
import { fetchFn } from "../utils/http.js";
import useUserStore from "../store/userStore";
import Notification from "../components/Notification.jsx";
import NotManagerMsg from "../components/venueManager/NotManagerMsg.jsx";
import LinkButton from "../components/LinkButton.jsx";
import VenueOverview from "../components/venueManager/VenueOverview.jsx";

export default function VenueManager() {
  const user = useUserStore((state) => state.user);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`/holidaze/profiles/${user.name}/venues?_bookings=true`],
    queryFn: () =>
      fetchFn({
        queryKey: [`/holidaze/profiles/${user.name}/venues?_bookings=true`],
        token: user.token,
      }),
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 text-light-text-primary dark:text-dark-text-primary">
        <div className="space-y-4 text-center">
          <h1 className="font-notoSerif text-4xl font-semibold sm:text-5xl">
            Venue Manager
          </h1>
          <p>View and update your venue listings in one place.</p>
        </div>
        {!user.venueManager && <NotManagerMsg />}
        {user.venueManager && (
          <div className="flex flex-col gap-4">
            {data && <VenueOverview venue={data.data[0]} />}
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
