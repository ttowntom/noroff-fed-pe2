import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

/**
 * Rating section component with interactive star selection
 * @component
 * @param {Object} props
 * @param {Function} props.onRatingChange - Callback when rating changes
 * @param {FormData} props.formData - Form data containing rating value
 * @returns {JSX.Element} Rating section with interactive star buttons
 *
 * @example
 * function VenueForm() {
 *   const [formData, setFormData] = useState({ rating: 0 });
 *
 *   const handleRatingChange = (value) => {
 *     setFormData(prev => ({ ...prev, rating: value }));
 *   };
 *
 *   return (
 *     <RatingSection
 *       onRatingChange={handleRatingChange}
 *       formData={formData}
 *     />
 *   );
 * }
 */
export default function RatingSection({ onRatingChange, formData }) {
  const [rating, setRating] = useState(formData.rating || 0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    setRating(formData.rating || 0);
  }, [formData.rating]);

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
