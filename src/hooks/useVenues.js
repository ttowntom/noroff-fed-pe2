import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchFn } from "../utils/http";

export function useVenues() {
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

  const getEndpoint = (pageParam = 1) => {
    const baseUrl = `/holidaze/venues${searchQuery ? "/search" : ""}`;
    const queryParams = new URLSearchParams({
      ...(searchQuery && { q: searchQuery }),
      sort: sortBy,
      sortOrder: sortOrder,
      limit: "50",
      page: pageParam.toString(),
    });
    return `${baseUrl}?${queryParams.toString()}`;
  };

  const query = useInfiniteQuery({
    queryKey: ["venues", sortBy, sortOrder, searchQuery],
    queryFn: ({ pageParam = 1 }) =>
      fetchFn({ queryKey: [getEndpoint(pageParam)] }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.isLastPage ? undefined : lastPage.meta.nextPage,
  });

  return {
    ...query,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    searchInput,
    setSearchInput,
    searchQuery,
    setSearchQuery,
    setSearchParams,
  };
}
