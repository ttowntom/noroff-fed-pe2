import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

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
        disabled={guests <= 1}
        className="disabled:opacity-50"
      >
        <FontAwesomeIcon
          icon={byPrefixAndName.fas["circle-minus"]}
          className="text-light-button-primary dark:text-dark-button-primary"
        />
      </button>
      <input type="number" className="hidden" readOnly value={guests} />
      <p className="font-semibold">{guests}</p>
      <button
        type="button"
        onClick={onIncrease}
        disabled={guests >= maxGuests}
        className="disabled:opacity-50"
      >
        <FontAwesomeIcon
          icon={byPrefixAndName.fas["circle-plus"]}
          className="text-light-button-primary dark:text-dark-button-primary"
        />
      </button>
    </div>
  );
}
