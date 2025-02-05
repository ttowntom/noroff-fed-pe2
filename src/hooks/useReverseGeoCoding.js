import { useState, useEffect } from "react";

import { API_MAPBOX } from "../constants";

/**
 * Custom hook that converts coordinates to address using Mapbox Reverse Geocoding API
 * @function useReverseGeocoding
 * @param {number} lng - Longitude coordinate
 * @param {number} lat - Latitude coordinate
 * @returns {Object} Location data and status
 * @property {LocationData|null} locationData - Resolved address information
 * @property {boolean} isLoading - Loading state
 * @property {Error|null} error - Error object if request failed
 */
export function useReverseGeocoding(lng, lat) {
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getAddress() {
      if (!lng || !lat) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${API_MAPBOX}`
        );
        const data = await response.json();

        if (data.features?.[0]) {
          const feature = data.features[0];
          const context = feature.context || [];

          const address = `${feature.text} ${feature.address}`;
          const city = context.find((item) => item.id.includes("place"))?.text;
          const country = context.find((item) =>
            item.id.includes("country")
          )?.text;
          const postcode = context.find((item) =>
            item.id.includes("postcode")
          )?.text;

          setLocationData({ address, city, country, postcode, lat, lng });
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    getAddress();
  }, [lng, lat]);

  return { locationData, isLoading, error };
}
