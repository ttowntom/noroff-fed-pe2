import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

/**
 * Search component for filtering venues by name
 * @component
 * @param {Object} props
 * @param {string} props.searchInput - Current search input value
 * @param {Function} props.onSearchChange - Handler for search input changes
 * @param {Function} props.onSearchSubmit - Handler for search form submission
 * @param {Function} props.onSearchReset - Handler for clearing search
 * @param {string|null} props.searchQuery - Active search query
 * @returns {JSX.Element} Search form with input and submit/reset buttons
 *
 * @example
 * function VenuesPage() {
 *   const [searchInput, setSearchInput] = useState("");
 *   const [searchQuery, setSearchQuery] = useState(null);
 *
 *   return (
 *     <VenueSearch
 *       searchInput={searchInput}
 *       onSearchChange={(e) => setSearchInput(e.target.value)}
 *       onSearchSubmit={(e) => {
 *         e.preventDefault();
 *         setSearchQuery(searchInput);
 *       }}
 *       onSearchReset={() => {
 *         setSearchInput("");
 *         setSearchQuery(null);
 *       }}
 *       searchQuery={searchQuery}
 *     />
 *   );
 * }
 */
export default function VenueSearch({
  searchInput,
  onSearchChange,
  onSearchSubmit,
  onSearchReset,
  searchQuery,
}) {
  return (
    <div className="mt-8 flex items-center sm:mx-auto sm:my-8 sm:w-[55ch]">
      <form
        onSubmit={onSearchSubmit}
        className="relative flex w-full items-center justify-center"
      >
        <input
          type="text"
          value={searchInput}
          onChange={onSearchChange}
          placeholder="Search venues..."
          className="w-full rounded-full border border-light-border-secondary bg-light-bg-primary px-4 py-2 text-light-text-primary focus:outline-none focus:ring-1 focus:ring-light-border-primary dark:border-dark-border-primary dark:bg-dark-bg-primary dark:text-dark-text-primary"
        />
        {!searchQuery && (
          <button
            type="submit"
            className="-ml-20 w-20 rounded-full border border-light-border-secondary bg-light-button-primary px-4 py-2 text-light-text-alternate hover:opacity-80 dark:border-dark-border-primary dark:bg-dark-button-primary dark:text-dark-text-primary"
          >
            Search
          </button>
        )}
        {searchQuery && (
          <button
            type="button"
            onClick={onSearchReset}
            className="text-light-text-error dark:text-dark-text-error"
          >
            <FontAwesomeIcon
              icon={byPrefixAndName.fas["circle-x"]}
              className="-ml-10 text-3xl"
            />
          </button>
        )}
      </form>
    </div>
  );
}
