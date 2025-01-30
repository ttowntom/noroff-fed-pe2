import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

export default function RatingSection({ onRatingChange }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
    onRatingChange(value);
  };

  return (
    <section className="mb-4 flex flex-col gap-4">
      <h2 className="mt-4 text-xl font-bold sm:text-2xl">Rating</h2>
      <div className="flex items-center gap-2">
        {rating > 0 && (
          <button onClick={() => setRating(0)} className="text-xl">
            <FontAwesomeIcon
              icon={byPrefixAndName.fas["star-exclamation"]}
              className="mr-2 text-xl text-light-text-error dark:text-dark-text-error"
            />
          </button>
        )}
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => handleRatingChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="text-xl"
          >
            <FontAwesomeIcon
              icon={
                star <= (hover || rating)
                  ? byPrefixAndName.fas["star"]
                  : byPrefixAndName.far["star"]
              }
              className="text-light-text-warning dark:text-dark-text-warning"
            />
          </button>
        ))}
        <p>({rating} stars)</p>
      </div>
    </section>
  );
}
