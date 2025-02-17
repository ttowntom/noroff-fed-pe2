import { useState, lazy, Suspense } from "react";

import Loading from "../Loading";
import LazyImage from "../LazyImage";
const GalleryModal = lazy(() => import("./GalleryModal"));

/**
 * Desktop gallery component with grid layout and modal viewer
 * @component
 * @param {Object} props
 * @param {Venue} props.venue - Venue data containing media array
 * @returns {JSX.Element} Responsive grid gallery with modal viewer
 *
 * @example
 * function VenuePage({ venue }) {
 *   return (
 *     <div className="venue-details">
 *       <GalleryDesktop venue={venue} />
 *     </div>
 *   );
 * }
 */
export default function GalleryDesktop({ venue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeImageUrl, setActiveImageUrl] = useState(null);

  const numImgs = venue.media.length;

  /**
   * Handles image click to open modal viewer
   * @param {string} imageUrl - URL of clicked image
   */
  function handleImageClick(imageUrl) {
    setActiveImageUrl(imageUrl);
    setIsOpen(true);
  }

  return (
    <div className="hidden gap-4 md:grid md:grid-cols-2">
      <LazyImage
        src={venue.media[0].url}
        alt={venue.name}
        className="h-[600px] w-full cursor-pointer rounded-md object-cover"
        onClick={() => handleImageClick(venue.media[0].url)}
      />

      <div
        className={`grid h-[600px] ${numImgs < 5 && "grid-cols-1"} ${numImgs > 3 && "grid-cols-2"} gap-4`}
      >
        {venue.media.slice(1, 5).map((img, idx) => (
          <LazyImage
            key={idx}
            src={img.url}
            alt={venue.name}
            className={`h-full ${numImgs === 2 && "max-h-[600px]"} ${numImgs > 2 && "max-h-[292px]"} w-full cursor-pointer rounded-md object-cover`}
            onClick={() => handleImageClick(img.url)}
          />
        ))}
      </div>
      {numImgs > 4 && (
        <div className="col-span-2 flex w-full flex-wrap gap-4">
          {venue.media.slice(5).map((img, idx) => (
            <LazyImage
              key={idx}
              src={img.url}
              alt={venue.name}
              className={`h-32 w-32 cursor-pointer rounded-md object-cover`}
              onClick={() => handleImageClick(img.url)}
            />
          ))}
        </div>
      )}
      {isOpen && (
        <Suspense fallback={<Loading />}>
          <GalleryModal
            venue={venue}
            onClose={() => setIsOpen(false)}
            activeImageUrl={activeImageUrl}
          >
            <img
              src={activeImageUrl}
              alt={venue.name}
              className="object-cover"
            />
          </GalleryModal>
        </Suspense>
      )}
    </div>
  );
}
