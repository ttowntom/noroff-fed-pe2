import { useState, useEffect } from "react";
import { API_MAPBOX } from "../../constants.js";
import Map, { Marker } from "react-map-gl";
import { useReverseGeocoding } from "../../hooks/useReverseGeocoding";
import "mapbox-gl/dist/mapbox-gl.css";

export default function SetLocation({ onLocationSet }) {
  const [marker, setMarker] = useState(null);
  const { locationData, isLoading } = useReverseGeocoding(
    marker?.longitude,
    marker?.latitude
  );

  function handleMapClick(event) {
    const { lng, lat } = event.lngLat;
    setMarker({
      longitude: lng,
      latitude: lat,
    });
  }

  // When location data is received, pass it up to parent
  useEffect(() => {
    if (locationData && !isLoading) {
      onLocationSet(locationData);
    }
  }, [locationData, isLoading]);

  return (
    <div className="text-light-text-primary dark:text-dark-text-primary">
      <Map
        initialViewState={{
          longitude: 10.3,
          latitude: 63.4,
          zoom: 2,
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
