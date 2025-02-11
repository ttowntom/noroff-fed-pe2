import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import priceFormatter from "../../utils/priceFormatter.js";
import { NO_VENUE_IMG_URL } from "../../constants.js";

import RatingStars from "./RatingStars.jsx";

function Card({ venue }) {
  return (
    <Link to={`/venues/${venue.id}`}>
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
            <span className="font-medium">{priceFormatter(venue.price)}</span>
            /night
          </p>
        ) : (
          <p>
            for{" "}
            <span className="font-medium">{priceFormatter(venue.price)}</span>
            /night
          </p>
        )}
      </div>
    </Link>
  );
}

/**
 * Card component displaying venue preview with image, rating, and price
 * @component
 * @param {Object} props
 * @param {Venue} props.venue - Venue data to display
 * @returns {JSX.Element} Link wrapper containing venue preview card
 *
 * @example
 * const venue = {
 *   id: "123",
 *   name: "Cozy Cabin",
 *   price: 1000,
 *   rating: 4.5,
 *   location: { city: "Oslo" },
 *   media: [{ url: "image.jpg" }]
 * };
 *
 * <VenueCard venue={venue} />
 */
export default function VenueCard({ venue, index = 0, isAnimated = true }) {
  if (!isAnimated) {
    return (
      <div className="group mb-2 flex w-full flex-col gap-1 overflow-hidden text-light-text-primary dark:text-dark-text-primary">
        <Card venue={venue} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group mb-2 flex w-full flex-col gap-1 overflow-hidden text-light-text-primary dark:text-dark-text-primary"
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
    >
      <Card venue={venue} />
    </motion.div>
  );
}
