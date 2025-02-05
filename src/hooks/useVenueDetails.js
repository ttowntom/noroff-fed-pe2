import { useQuery } from "@tanstack/react-query";

import { fetchFn } from "../utils/http.js";

/**
 * Custom hook to fetch detailed venue information including owner and bookings
 * @function useVenueDetails
 * @param {string} venueId - Unique identifier of the venue
 * @returns {Object} Query result object
 * @property {VenueDetails} data - Venue data if successful
 * @property {boolean} isLoading - Loading state
 * @property {boolean} isError - Error state
 * @property {Error} error - Error object if query failed
 */
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
