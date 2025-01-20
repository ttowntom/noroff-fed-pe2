import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "../store/userStore.js";
import { fetchFn } from "../utils/http.js";
import Notification from "../components/Notification.jsx";

export default function Profile() {
  const { name } = useParams();
  const user = useUserStore((state) => state.user);

  const isSelf = user.name === name;

  // Fetch user data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`/holidaze/profiles/${name}`, user.token],
    queryFn: fetchFn,
  });

  return (
    <>
      <div className="mx-auto flex max-w-[55ch] flex-col items-center gap-4 dark:text-dark-text-primary">
        {isLoading && <div>Loading...</div>}
        {isError && <Notification type="error">{error.message}</Notification>}
      </div>
      {data && (
        <div className="flex flex-col items-center gap-4 dark:text-dark-text-primary">
          <div className="flex items-center gap-4">
            <img
              src={data.data.avatar.url}
              alt={data.data.name}
              className="h-16 w-16 rounded-full"
            />
            <h1 className="font-notoSerif text-4xl font-semibold sm:text-5xl">
              {data.data.name}
            </h1>
          </div>
          <p className="font-notoSerif text-lg">
            {data.data.bio
              ? data.data.bio
              : `${data.data.name} hasn't written a bio yet.`}
          </p>
        </div>
      )}
    </>
  );
}
