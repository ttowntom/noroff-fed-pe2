import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

/**
 * Counter component for selecting number of guests with increment/decrement buttons
 * @component
 * @param {Object} props
 * @param {number} props.guests - Current number of guests selected
 * @param {number} props.maxGuests - Maximum number of guests allowed
 * @param {Function} props.onIncrease - Handler for increasing guest count
 * @param {Function} props.onDecrease - Handler for decreasing guest count
 * @returns {JSX.Element} Guest counter with +/- buttons
 *
 * @example
 * function BookingForm() {
 *   const [guests, setGuests] = useState(1);
 *   const maxGuests = 4;
 *
 *   return (
 *     <GuestCounter
 *       guests={guests}
 *       maxGuests={maxGuests}
 *       onIncrease={() => setGuests(prev => Math.min(prev + 1, maxGuests))}
 *       onDecrease={() => setGuests(prev => Math.max(prev - 1, 1))}
 *     />
 *   );
 * }
 */
export default function GuestCounter({
  guests,
  maxGuests,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onDecrease}
        aria-label="Decrease guests"
        disabled={guests <= 1}
        className="disabled:opacity-50"
      >
        <FontAwesomeIcon
          icon={byPrefixAndName.fas["circle-minus"]}
          aria-hidden="true"
          className="text-light-button-primary dark:text-dark-button-primary"
        />
      </button>

      <input
        id="guests"
        type="number"
        name="guests"
        className="hidden"
        readOnly
        value={guests}
      />
      <p aria-live="polite" className="font-semibold">
        {guests}
      </p>
      <button
        type="button"
        aria-label="Increase guests"
        onClick={onIncrease}
        disabled={guests >= maxGuests}
        className="disabled:opacity-50"
      >
        <FontAwesomeIcon
          icon={byPrefixAndName.fas["circle-plus"]}
          aria-hidden="true"
          className="text-light-button-primary dark:text-dark-button-primary"
        />
      </button>
    </div>
  );
}
