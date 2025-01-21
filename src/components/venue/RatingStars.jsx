import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

export default function RatingStar({ rating }) {
  const maxStars = 5;
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxStars - filledStars - (hasHalfStar ? 1 : 0);

  let content = (
    <div className="flex gap-2 text-sm">
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
