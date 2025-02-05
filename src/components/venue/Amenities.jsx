import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

/**
 * Meta component that displays a single amenity with an icon and text
 * @component
 * @param {Object} props
 * @param {boolean} props.meta - Whether the amenity is available
 * @param {string} props.metaKey - The name of the amenity
 * @param {string} props.icon - The icon name for the amenity
 * @param {string} props.iconType - The icon type (e.g., "fas", "fad")
 * @returns {JSX.Element} List item displaying the amenity
 */
function Meta({ meta, metaKey, icon, iconType }) {
  const text = meta ? "Yes" : "No";

  if (meta) {
    return (
      <li className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={byPrefixAndName[iconType][icon]}
          className="text-light-border-success dark:text-dark-border-success"
        />
        <p>
          <span className="font-semibold">{metaKey}: </span>
          {text}
        </p>
      </li>
    );
  } else {
    return (
      <li className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={byPrefixAndName[iconType][icon]}
          className="dark:text-dark-border-error text-light-border-error"
        />
        <p>
          <span className="font-semibold">{metaKey}: </span>
          {text}
        </p>
      </li>
    );
  }
}

/**
 * Amenities component that displays a list of venue amenities
 * @component
 * @param {Object} props
 * @param {Venue} props.venue - Venue data containing amenities information
 * @returns {JSX.Element} Section displaying the venue amenities
 *
 * @example
 * function VenueDetails({ venue }) {
 *   return (
 *     <div>
 *       <h2>Amenities</h2>
 *       <Amenities venue={venue} />
 *     </div>
 *   );
 * }
 */
export default function Amenities({ venue }) {
  return (
    <section>
      <ul className="grid w-fit grid-cols-1 gap-1 text-light-text-primary dark:text-dark-text-primary sm:grid-cols-2 sm:gap-x-12">
        <li className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={
              byPrefixAndName.fad[
                venue.maxGuests > 1 ? "user-group-simple" : "user"
              ]
            }
            className="text-light-border-success dark:text-dark-border-success"
          />
          <p>
            <span className="font-semibold">Max Guests: </span>
            {venue.maxGuests}
          </p>
        </li>
        <Meta
          meta={venue.meta.wifi}
          metaKey="WiFi"
          icon="wifi"
          iconType="fas"
        />
        <Meta
          meta={venue.meta.parking}
          metaKey="Parking"
          icon="parking"
          iconType="fas"
        />
        <Meta
          meta={venue.meta.breakfast}
          metaKey="Breakfast"
          icon="egg-fried"
          iconType="fas"
        />
        <Meta meta={venue.meta.pets} metaKey="Pets" icon="paw" iconType="fas" />
      </ul>
    </section>
  );
}
