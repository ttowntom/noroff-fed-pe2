import { useQueries } from "@tanstack/react-query";
import { fetchFn } from "../utils/http";

export default function useProfileData(name, token) {
  const queries = useQueries({
    queries: [
      {
        queryKey: [`/holidaze/profiles/${name}`],
        queryFn: () =>
          fetchFn({
            queryKey: [`/holidaze/profiles/${name}`],
            token,
          }),
      },
      {
        queryKey: [`/holidaze/profiles/${name}/venues`],
        queryFn: () =>
          fetchFn({
            queryKey: [`/holidaze/profiles/${name}/venues`],
            token,
          }),
      },
      {
        queryKey: [`/holidaze/profiles/${name}/bookings`],
        queryFn: () =>
          fetchFn({
            queryKey: [`/holidaze/profiles/${name}/bookings`],
            token,
          }),
      },
    ],
  });

  const [profile, venues, bookings] = queries;
  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);
  const errors = queries.map((query) => query.error).filter(Boolean);

  return {
    profile: profile.data,
    venues: venues.data,
    bookings: bookings.data,
    isLoading,
    isError,
    errors,
  };
}
