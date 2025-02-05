import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

/**
 * Sorting controls for venue listings with field selection and order toggle
 * @component
 * @param {Object} props
 * @param {SortByOption} props.sortBy - Current sort field
 * @param {Function} props.onSortChange - Handler for sort field changes
 * @param {SortOrder} props.sortOrder - Current sort direction
 * @param {Function} props.onSortOrderChange - Handler for sort direction changes
 * @returns {JSX.Element} Sorting controls with dropdown and direction buttons
 *
 * @example
 * function VenuesPage() {
 *   const [sortBy, setSortBy] = useState('created');
 *   const [sortOrder, setSortOrder] = useState('desc');
 *
 *   return (
 *     <VenueSorting
 *       sortBy={sortBy}
 *       onSortChange={(e) => setSortBy(e.target.value)}
 *       sortOrder={sortOrder}
 *       onSortOrderChange={setSortOrder}
 *     />
 *   );
 * }
 */
export default function VenueSorting({
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange,
}) {
  return (
    <div className="mt-8 flex items-center justify-end">
      <select
        value={sortBy}
        onChange={onSortChange}
        className="flex-grow rounded-md border border-light-border-secondary bg-light-bg-primary p-2 text-light-text-primary focus:outline-none focus:ring-1 focus:ring-light-border-primary dark:border-dark-border-primary dark:bg-dark-bg-primary dark:text-dark-text-primary sm:w-48 sm:flex-grow-0"
      >
        <option value="created">Latest</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>
      <div className="ml-4 flex flex-col">
        <button
          onClick={() => onSortOrderChange("asc")}
          className="focus:outline-none"
        >
          <FontAwesomeIcon
            icon={byPrefixAndName.fas["chevron-up"]}
            className={`text-light-text-primary dark:text-dark-text-primary ${
              sortOrder === "asc"
                ? "text-primary"
                : "text-light-text-secondary hover:text-light-link-primary dark:text-dark-text-secondary hover:dark:text-dark-link-primary"
            }`}
          />
        </button>
        <button
          onClick={() => onSortOrderChange("desc")}
          className="focus:outline-none"
        >
          <FontAwesomeIcon
            icon={byPrefixAndName.fas["chevron-down"]}
            className={`text-light-text-primary dark:text-dark-text-primary ${
              sortOrder === "desc"
                ? "text-primary"
                : "text-light-text-secondary hover:text-light-link-primary dark:text-dark-text-secondary hover:dark:text-dark-link-primary"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
