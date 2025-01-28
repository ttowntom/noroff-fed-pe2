import { useQuery } from "@tanstack/react-query";
import { fetchFn } from "../utils/http.js";

export function useVenueDetails(venueId) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`/holidaze/venues/${venueId}?_owner=true&_bookings=true`],
    queryFn: fetchFn,
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
}
