import { useEffect, useCallback } from "react";

/**
 * Custom hook for implementing infinite scroll functionality using Intersection Observer
 * @param {React.RefObject} targetRef - Reference to the target element to observe
 * @param {Function} callback - Function to call when target becomes visible
 * @param {Array} [deps=[]] - Optional dependency array for the callback
 */
export function useInfiniteScroll(targetRef, callback, deps = []) {
  /**
   * Intersection Observer callback that triggers when target element becomes visible
   * @param {IntersectionObserverEntry[]} entries - Array of intersection entries
   * @private
   */
  const handleObserver = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        callback();
      }
    },
    [callback, ...deps]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    });

    const currentTarget = targetRef.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [targetRef, handleObserver]);
}
