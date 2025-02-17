import { useState } from "react";

export default function LazyImage({ src, alt, className = "", ...props }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative h-full w-full">
      {/* Skeleton loader */}
      <div
        className={`absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700 ${
          !isLoading && "hidden"
        }`}
      />
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        {...props}
        className={`${className} ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
