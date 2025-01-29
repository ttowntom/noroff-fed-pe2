import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";
import useUserStore from "../store/userStore";
import Notification from "../components/Notification.jsx";
import NotManagerMsg from "../components/venueManager/NotManagerMsg.jsx";

export default function VenueManager() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="flex flex-col items-center justify-center gap-6 text-light-text-primary dark:text-dark-text-primary">
      <div className="space-y-4 text-center">
        <h1 className="font-notoSerif text-4xl font-semibold sm:text-5xl">
          Venue Manager
        </h1>
        <p>View and update your venue listings in one place.</p>
      </div>
      {!user.venueManager && <NotManagerMsg />}
    </div>
  );
}
