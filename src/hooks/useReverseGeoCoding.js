import { useState, useEffect } from "react";
import { API_MAPBOX } from "../constants";

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

        if (data) {
        }

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
