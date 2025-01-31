import { useState, useEffect } from "react";
import { API_MAPBOX } from "../../constants.js";
import Map, { Marker } from "react-map-gl";
import { useReverseGeocoding } from "../../hooks/useReverseGeocoding";
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

  useEffect(() => {
    if (
      initialLat &&
      initialLng &&
      (marker?.latitude !== initialLat || marker?.longitude !== initialLng)
    ) {
      setMarker({
        longitude: initialLng,
        latitude: initialLat,
      });
    }
  }, [initialLat, initialLng]);

  function handleMapClick(event) {
    const { lng, lat } = event.lngLat;
    setMarker({
      longitude: lng,
      latitude: lat,
    });
  }

  useEffect(() => {
    if (locationData && !isLoading) {
      onLocationSet(locationData);
    }
  }, [locationData, isLoading]);

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
