import { useRef } from "react";

import { useInfiniteScroll } from "../hooks/useInfiniteScroll.js";
import { useVenues } from "../hooks/useVenues.js";
import SEO from "../components/SEO.jsx";
import Notification from "../components/Notification.jsx";
import VenueCard from "../components/venue/VenueCard.jsx";
import VenueSearch from "../components/venue/VenueSearch.jsx";
import VenueSorting from "../components/venue/VenueSorting.jsx";
import Cta from "../components/Cta.jsx";
import VenueOfTheMonth from "../components/venue/VenueOfTheMonth.jsx";
import Loading from "../components/Loading.jsx";

/**
 * Venues listing page with search, sort and infinite scroll
 * @component
 * @returns {JSX.Element} Grid of venue cards with search/sort controls
 *
 * @example
 * function App() {
 *   return (
 *     <Routes>
 *       <Route path="/venues" element={<Venues />} />
 *     </Routes>
 *   );
 * }
 */
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

  /**
   * Handles sort selection change
   * @param {Event} e - Select change event
   */
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  /**
   * Handles search form submission
   * @param {Event} e - Form submission event
   */
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
      <SEO
        title="Find Your Perfect Getaway | Holidaze"
        description="Browse and book from our curated selection of venues across the world. Find hotels, apartments, and unique stays for your next adventure."
        type="website"
        keywords="venues, accommodation, hotels, apartments, booking, travel"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SearchResultsPage",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: data?.pages[0]?.meta?.totalCount || 0,
            itemListElement: firstVenues.map((venue, index) => ({
              "@type": "LodgingBusiness",
              position: index + 1,
              name: venue.name,
              image: venue.media[0]?.url,
              address: {
                "@type": "PostalAddress",
                addressLocality: venue.location.city,
                addressCountry: venue.location.country,
              },
              priceRange: `${venue.price} NOK`,
            })),
          },
        }}
      />
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
        {isLoading && <Loading />}
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
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] justify-items-center gap-4 md:grid-cols-[repeat(auto-fit,minmax(min(100%/4,300px),1fr))] md:px-4">
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
          <div
            aria-live="polite"
            className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] justify-items-center gap-4 md:grid-cols-[repeat(auto-fit,minmax(min(100%/4,300px),1fr))] md:px-4"
          >
            {restOfVenues.map((venue) => (
              <VenueCard key={venue.key} venue={venue} />
            ))}
            {/* Infinite scroll trigger */}
            <div ref={loadMoreRef} className="col-span-full h-10">
              {isFetchingNextPage && <Loading />}
            </div>
          </div>
        </>
      )}
    </>
  );
}
