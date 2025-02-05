import { useState, useEffect } from "react";

import { API_MAPBOX } from "../constants";

/**
 * Custom hook that converts address information into geographic coordinates using Mapbox API
 *
 * @param {string} address - Street address to geocode (optional)
 * @param {string} city - City name (required)
 * @param {string} country - Country name (required)
 *
 * @returns {Object} Geocoding result object
 * @property {Object|null} coordinates - The latitude and longitude coordinates
 * @property {number} coordinates.lat - Latitude coordinate
 * @property {number} coordinates.lng - Longitude coordinate
 * @property {boolean} isLoading - Indicates if geocoding request is in progress
 * @property {string|null} error - Error message if geocoding failed, null otherwise
 *
 * @example
 * const MyComponent = () => {
 *   const { coordinates, isLoading, error } = useGeocoding(
 *     "123 Main St",
 *     "Oslo",
 *     "Norway"
 *   );
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *   if (coordinates) {
 *     return (
 *       <div>
 *         Location: {coordinates.lat}, {coordinates.lng}
 *       </div>
 *     );
 *   }
 * };
 */
export function useGeocoding(address, city, country) {
  const [coordinates, setCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCoordinates() {
      if (!city || !country) return;

      setIsLoading(true);
      setError(null);
      const searchQuery = address
        ? `${address}, ${city}, ${country}`
        : `${city}, ${country}`;

      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            searchQuery
          )}.json?access_token=${API_MAPBOX}`
        );
        const data = await response.json();

        if (data.features?.[0]) {
          const [lng, lat] = data.features[0].center;
          setCoordinates({ lng, lat });
        }
      } catch (error) {
        setError(error.message || "Failed to get location coordinates");
        setCoordinates(null);
      } finally {
        setIsLoading(false);
      }
    }

    getCoordinates();
  }, [address, city, country]);

  return { coordinates, isLoading, error };
}
