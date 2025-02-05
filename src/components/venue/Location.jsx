import Map, { Marker } from "react-map-gl";

import { API_MAPBOX } from "../../constants.js";
import { useGeocoding } from "../../hooks/useGeocoding.js";
import "mapbox-gl/dist/mapbox-gl.css";

/**
 * Location component that displays address information and an interactive map
 * @component
 * @param {Object} props
 * @param {string} props.address - Street address of the venue
 * @param {string} props.city - City where the venue is located
 * @param {string} props.country - Country where the venue is located
 * @param {string} [props.zip] - Optional postal/ZIP code
 * @param {string} [props.continent] - Optional continent name
 * @param {number} [props.lat] - Optional latitude coordinate
 * @param {number} [props.lng] - Optional longitude coordinate
 * @returns {JSX.Element|null} Returns the location display with map or null if coordinates are missing
 */
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

  const { coordinates, isLoading, error } = useGeocoding(
    address,
    city,
    country
  );

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
        {error && <p>{error}</p>}
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
