import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

/**
 * Displays a rating as star icons, supporting full and half stars
 * @component
 * @param {Object} props
 * @param {number} props.rating - Rating value between 0 and 5
 * @returns {JSX.Element} Star rating display
 *
 * @example
 * <RatingStar rating={3} />
 */
export default function RatingStar({ rating }) {
  const maxStars = 5;
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxStars - filledStars - (hasHalfStar ? 1 : 0);
  const formattedRating = rating.toFixed(1);

  let content = (
    <div
      className="flex gap-2 text-sm"
      aria-label={`Venue rating: ${formattedRating} out of ${maxStars} stars`}
    >
      <div>
        {[...Array(filledStars)].map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={byPrefixAndName.fas["star"]}
            className="text-yellow-500"
          />
        ))}
        {hasHalfStar && (
          <FontAwesomeIcon
            icon={byPrefixAndName.fas["star-half-alt"]}
            className="text-yellow-500"
          />
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={byPrefixAndName.far["star"]}
            className="text-yellow-500"
          />
        ))}
      </div>
    </div>
  );
  return content;
}
