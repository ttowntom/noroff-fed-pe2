import { useQueries } from "@tanstack/react-query";

import { fetchFn } from "../utils/http";

/**
 * Custom hook that fetches a user's profile data, venues, and bookings
 * @function useProfileData
 * @param {string} name - Username to fetch data for
 * @param {string} token - Authentication token
 * @returns {ProfileData} Combined profile data and status
 */
export default function useProfileData(name, token) {
  const queries = useQueries({
    queries: [
      {
        queryKey: [`/holidaze/profiles/${name}`, token],
        queryFn: () =>
          fetchFn({
            queryKey: [`/holidaze/profiles/${name}`],
            token,
          }),
      },
      {
        queryKey: [`/holidaze/profiles/${name}/venues`, token],
        queryFn: () =>
          fetchFn({
            queryKey: [`/holidaze/profiles/${name}/venues`],
            token,
          }),
      },
      {
        queryKey: ["bookings", name, token],
        queryFn: () =>
          fetchFn({
            queryKey: [
              `/holidaze/profiles/${name}/bookings?_venue=true&sort=dateFrom&sortOrder=asc`,
            ],
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
