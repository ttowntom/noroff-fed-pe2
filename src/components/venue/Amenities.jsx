import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

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

export default function ({ venue }) {
  return (
    <ul className="grid grid-cols-1 gap-1 text-light-text-primary dark:text-dark-text-primary sm:grid-cols-2">
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
      <Meta meta={venue.meta.wifi} metaKey="WiFi" icon="wifi" iconType="fas" />
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
  );
}
