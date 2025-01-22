import { useEffect, useCallback } from "react";

export function useInfiniteScroll(targetRef, callback, dependencies = []) {
  const handleObserver = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      callback();
    }
  }, dependencies);

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
