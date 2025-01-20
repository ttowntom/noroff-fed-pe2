import { useParams } from "react-router-dom";
import useUserStore from "../store/userStore.js";
import useProfileData from "../hooks/useProfileData.js";
import Notification from "../components/Notification.jsx";
import Bio from "../components/profile/Bio.jsx";

export default function Profile() {
  const { name } = useParams();
  const user = useUserStore((state) => state.user);
  const isSelf = user?.name === name || null;

  // Fetch user data
  const { profile, venues, bookings, isLoading, isError, errors } =
    useProfileData(name, user.token);

  return (
    <>
      <div className="mx-auto flex max-w-[55ch] flex-col items-center gap-4 dark:text-dark-text-primary">
        {isLoading && <div>Loading...</div>}
        {isError && (
          <Notification type="error">{errors[0]?.message}</Notification>
        )}
      </div>
      {profile && (
        <div>
          <Bio data={profile} isSelf={isSelf} />
          <div>
            <h2>Venues</h2>
          </div>
          {isSelf && (
            <div>
              <h2>Bookings</h2>
            </div>
          )}
        </div>
      )}
    </>
  );
}
