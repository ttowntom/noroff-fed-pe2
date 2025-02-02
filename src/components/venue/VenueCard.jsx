import { Link } from "react-router-dom";

import { NO_VENUE_IMG_URL } from "../../constants.js";
import RatingStars from "./RatingStars.jsx";

export default function VenueCard({ venue }) {
  return (
    <Link
      to={`/venues/${venue.id}`}
      className="group mb-2 flex w-full flex-col gap-1 overflow-hidden text-light-text-primary dark:text-dark-text-primary"
    >
      <div className="overflow-hidden rounded-lg">
        <img
          src={venue.media[0]?.url || NO_VENUE_IMG_URL}
          alt={venue.name}
          className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-110 md:h-64"
        />
      </div>
      <RatingStars rating={venue.rating} />
      <div className="flex flex-col">
        <h2 className="text-lg font-medium">{venue.name}</h2>
        {venue.location.city ? (
          <p>
            in <span className="font-medium">{venue.location.city}</span> for{" "}
            <span className="font-medium">${venue.price}</span>/night
          </p>
        ) : (
          <p>
            for <span className="font-medium">${venue.price}</span>/night
          </p>
        )}
      </div>
    </Link>
  );
}
