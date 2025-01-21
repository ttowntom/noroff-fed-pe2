import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";
import { fetchFn } from "../utils/http.js";
import Notification from "../components/Notification.jsx";
import VenueCard from "../components/venue/VenueCard.jsx";

export default function Venues() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "created");
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("order") || "desc"
  );
  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const params = {};
    if (sortBy) params.sort = sortBy;
    if (sortOrder) params.order = sortOrder;
    if (searchQuery) params.q = searchQuery;
    setSearchParams(params);
  }, [sortBy, sortOrder, searchQuery, setSearchParams]);

  const getEndpoint = () => {
    if (searchQuery) {
      return `/holidaze/venues/search?q=${searchQuery}&sort=${sortBy}&sortOrder=${sortOrder}`;
    }
    return `/holidaze/venues?sort=${sortBy}&sortOrder=${sortOrder}`;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [getEndpoint()],
    queryFn: fetchFn,
  });

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
      <div className="mt-8 flex items-center sm:mx-auto sm:my-8 sm:w-[55ch]">
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex w-full items-center justify-center"
        >
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
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
              onClick={handleSearchReset}
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
      {data && data.data.length > 0 && (
        <div className="mt-8 flex items-center justify-end">
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="flex-grow rounded-md border border-light-border-secondary bg-light-bg-primary p-2 text-light-text-primary focus:outline-none focus:ring-1 focus:ring-light-border-primary dark:border-dark-border-primary dark:bg-dark-bg-primary dark:text-dark-text-primary sm:w-48 sm:flex-grow-0"
          >
            <option value="created">Latest</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
          <div className="ml-4 flex flex-col">
            <button
              onClick={() => setSortOrder("asc")}
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
              onClick={() => setSortOrder("desc")}
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
      )}
      <div className="mx-auto mt-4 flex max-w-[55ch] flex-col items-center gap-4 dark:text-dark-text-primary">
        {isLoading && <div>Loading...</div>}
        {isError && <Notification type="error">{error.message}</Notification>}
        {data && data.data.length === 0 && (
          <div className="mt-12">
            <Notification type="info">
              No venues found matching the search criteria. Please try again.
            </Notification>
          </div>
        )}
      </div>
      {data && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] justify-items-center gap-4 px-4 md:grid-cols-[repeat(auto-fit,minmax(min(100%/4,300px),1fr))]">
          {data?.data.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      )}
    </>
  );
}
