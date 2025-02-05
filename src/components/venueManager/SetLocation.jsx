import { useState, useEffect, useCallback } from "react";
import Map, { Marker } from "react-map-gl";

import { API_MAPBOX } from "../../constants.js";
import { useReverseGeocoding } from "../../hooks/useReverseGeoCoding";
import "mapbox-gl/dist/mapbox-gl.css";

/**
 * Interactive map component for setting venue location
 * @component
 * @param {Object} props
 * @param {Function} props.onLocationSet - Callback with location data when marker placed
 * @param {number} [props.initialLat] - Initial latitude coordinate
 * @param {number} [props.initialLng] - Initial longitude coordinate
 * @returns {JSX.Element} Mapbox map with marker placement
 *
 * @example
 * function VenueForm() {
 *   const handleLocationSet = (location) => {
 *     setFormData(prev => ({
 *       ...prev,
 *       address: location.address,
 *       city: location.city,
 *       country: location.country,
 *       lat: location.lat,
 *       lng: location.lng
 *     }));
 *   };
 *
 *   return (
 *     <SetLocation
 *       onLocationSet={handleLocationSet}
 *       initialLat={59.9139}
 *       initialLng={10.7522}
 *     />
 *   );
 * }
 */
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
