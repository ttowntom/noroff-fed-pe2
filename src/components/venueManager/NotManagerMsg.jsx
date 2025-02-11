import { useMutation } from "@tanstack/react-query";

import { saveLocal } from "../../utils/localStorage.js";
import useUserStore from "../../store/userStore";
import { putFn, queryClient } from "../../utils/http.js";
import Notification from "../../components/Notification.jsx";
import Button from "../../components/Button.jsx";

/**
 * Message component displayed when non-manager users attempt to access manager features
 * @component
 * @returns {JSX.Element} Notification with  button and instructions
 *
 * @example
 * function VenueManagerPage() {
 *   const { isVenueManager } = useUserStore();
 *
 *   if (!isVenueManager) {
 *     return <NotManagerMsg />;
 *   }
 *
 *   return <VenueManagerDashboard />;
 * }
 */
export default function NotManagerMsg() {
  const { user } = useUserStore();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ token }) =>
      putFn({
        url: `/holidaze/profiles/${user.name}`,
        body: { venueManager: true },
        token,
      }),
    onSuccess: () => {
      saveLocal("user", { ...user, venueManager: true });
      user.venueManager = true;
      queryClient.invalidateQueries({
        queryKey: [`/holidaze/profiles/${user.name}/venues?_bookings=true`],
      });
      window.location.reload();
    },
  });

  function becomeManager() {
    mutate({ token: user.token });
  }

  return (
    <div className="mt-2 w-full max-w-[65ch] sm:mt-6">
      {!isError && (
        <Notification type="info">
          <div className="ml-4 flex flex-col gap-4">
            <h2 className="text-2xl font-bold">
              You are not signed up as a venue manager
            </h2>
            <p>
              To access venue management features, you need to become a venue
              manager.
            </p>
            <Button disabled={isPending} onClick={becomeManager}>
              Become a venue manager now!
            </Button>
          </div>
        </Notification>
      )}

      {isError && (
        <Notification type="error">
          <p>{error.message}</p>
        </Notification>
      )}
    </div>
  );
}
