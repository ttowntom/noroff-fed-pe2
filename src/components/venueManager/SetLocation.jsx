import { useState, useEffect, useCallback } from "react";
import Map, { Marker } from "react-map-gl";

import { API_MAPBOX } from "../../constants.js";
import { useReverseGeocoding } from "../../hooks/useReverseGeoCoding";
import "mapbox-gl/dist/mapbox-gl.css";

export default function SetLocation({ onLocationSet, initialLat, initialLng }) {
  const [marker, setMarker] = useState(
    initialLat && initialLng
      ? {
          longitude: initialLng,
          latitude: initialLat,
        }
      : null
  );
  const { locationData, isLoading } = useReverseGeocoding(
    marker?.longitude,
    marker?.latitude
  );

  // Only update marker on mount or when initial coords change significantly
  useEffect(() => {
    if (
      initialLat &&
      initialLng &&
      (!marker ||
        marker.latitude !== initialLat ||
        marker.longitude !== initialLng)
    ) {
      setMarker({
        longitude: initialLng,
        latitude: initialLat,
      });
    }
  }, [initialLat, initialLng]);

  // Separate effect for location updates
  useEffect(() => {
    let isMounted = true;
    if (locationData && !isLoading && isMounted) {
      onLocationSet(locationData);
    }
    return () => {
      isMounted = false;
    };
  }, [locationData, isLoading]);

  const handleMapClick = useCallback((event) => {
    const { lng, lat } = event.lngLat;
    setMarker({
      longitude: lng,
      latitude: lat,
    });
  }, []);

  return (
    <div className="text-light-text-primary dark:text-dark-text-primary">
      <Map
        initialViewState={{
          longitude: initialLng || 10.3,
          latitude: initialLat || 63.4,
          zoom: initialLat && initialLng ? 13 : 2,
        }}
        style={{
          width: "100%",
          height: "400px",
          borderRadius: "0.5rem",
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={API_MAPBOX}
        onClick={handleMapClick}
      >
        {marker && (
          <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}
            color="#FF0000"
          />
        )}
      </Map>
    </div>
  );
}
