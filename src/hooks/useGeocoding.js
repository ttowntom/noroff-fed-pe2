import { useState, useEffect } from "react";

import { API_MAPBOX } from "../constants";

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
