import Map, { Marker } from "react-map-gl";

import { API_MAPBOX } from "../../constants.js";
import { useGeocoding } from "../../hooks/useGeocoding.js";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Location({ venue }) {
  const { address, city, continent, country, lat, lng, zip } = venue.location;

  const hasCityCountry = city && country;
  const hasLatLong =
    typeof lat === "number" &&
    typeof lng === "number" &&
    !isNaN(lat) &&
    !isNaN(lng) &&
    lat !== 0 &&
    lng !== 0;

  const { coordinates, isLoading } = useGeocoding(address, city, country);

  const mapCoordinates = hasLatLong ? { lng, lat } : coordinates;
  const zoomLevel = address ? 13 : 10;

  if (!mapCoordinates) {
    return null;
  }

  if (hasCityCountry) {
    return (
      <div className="text-light-text-primary dark:text-dark-text-primary">
        <h2 className="mb-2 text-xl font-bold">Location</h2>
        <p>{address}</p>
        <p>
          {zip && `${zip} `}
          {city}
        </p>
        <p>
          {country}
          {continent && `, ${continent}`}
        </p>
        {isLoading && <p>Loading map location...</p>}
        {mapCoordinates && (
          <Map
            initialViewState={{
              longitude: mapCoordinates.lng,
              latitude: mapCoordinates.lat,
              zoom: zoomLevel,
            }}
            style={{
              width: "100%",
              height: "400px",
              borderRadius: "0.5rem",
              marginTop: "1rem",
            }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={API_MAPBOX}
          >
            <Marker
              longitude={mapCoordinates.lng}
              latitude={mapCoordinates.lat}
              color="#FF0000"
            />
          </Map>
        )}
      </div>
    );
  } else {
    return (
      <div className="text-light-text-primary dark:text-dark-text-primary">
        <h2 className="mb-2 text-xl font-bold">Location</h2>
        <p>No location information available</p>
      </div>
    );
  }
}
