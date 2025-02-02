import { useRef } from "react";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll.js";
import { useVenues } from "../hooks/useVenues.js";
import Notification from "../components/Notification.jsx";
import VenueCard from "../components/venue/VenueCard.jsx";
import VenueSearch from "../components/venue/VenueSearch.jsx";
import VenueSorting from "../components/venue/VenueSorting.jsx";
import Cta from "../components/Cta.jsx";
import VenueOfTheMonth from "../components/venue/VenueOfTheMonth.jsx";

export default function Venues() {
  const loadMoreRef = useRef();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    searchInput,
    setSearchInput,
    searchQuery,
    setSearchQuery,
    setSearchParams,
  } = useVenues();

  useInfiniteScroll(loadMoreRef, () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage]);

  // When rendering data, map through pages
  const allVenues =
    data?.pages.flatMap((page, pageIndex) =>
      page.data.map((venue) => ({
        ...venue,
        key: `${venue.id}-${pageIndex}`,
      }))
    ) ?? [];

  const firstVenues = allVenues.slice(0, 8);
  const restOfVenues = allVenues.slice(8);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const handleSearchReset = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  return (
    <>
      <h1 className="text-center font-notoSerif text-4xl font-semibold text-light-text-primary dark:text-dark-text-primary sm:text-5xl">
        Find Your Perfect Getaway
      </h1>
      <VenueSearch
        searchInput={searchInput}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        onSearchReset={handleSearchReset}
        searchQuery={searchQuery}
      />

      {data?.pages[0]?.data?.length > 0 && (
        <VenueSorting
          sortBy={sortBy}
          onSortChange={handleSortChange}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
        />
      )}
      <div className="mx-auto mt-4 flex max-w-[55ch] flex-col items-center gap-4 dark:text-dark-text-primary">
        {isLoading && <div>Loading...</div>}
        {isError && (
          <Notification type="error">
            <p>{error.message}</p>
          </Notification>
        )}
        {data?.pages[0]?.meta?.totalCount === 0 && (
          <div className="mt-12">
            <Notification type="info">
              <p>
                No venues found matching the search criteria. Please try again.
              </p>
            </Notification>
          </div>
        )}
      </div>
      {data && (
        <>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] justify-items-center gap-4 px-4 md:grid-cols-[repeat(auto-fit,minmax(min(100%/4,300px),1fr))]">
            {firstVenues.map((venue) => (
              <VenueCard key={venue.key} venue={venue} />
            ))}
          </div>

          {/* Call to action */}
          <div className="-mx-4 mb-16 mt-12">
            <Cta>
              <VenueOfTheMonth venueId="95ca436a-abe3-4e33-a3ce-5299bd2e78ed" />
            </Cta>
          </div>

          {/* Rest of the venues */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] justify-items-center gap-4 px-4 md:grid-cols-[repeat(auto-fit,minmax(min(100%/4,300px),1fr))]">
            {restOfVenues.map((venue) => (
              <VenueCard key={venue.key} venue={venue} />
            ))}
            {/* Infinite scroll trigger */}
            <div ref={loadMoreRef} className="col-span-full h-10">
              {isFetchingNextPage && <div>Loading more...</div>}
            </div>
          </div>
        </>
      )}
    </>
  );
}
