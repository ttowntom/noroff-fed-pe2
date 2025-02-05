import { useState } from "react";

import GalleryModal from "./GalleryModal";

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
      <img
        src={venue.media[0].url}
        alt={venue.name}
        onClick={() => handleImageClick(venue.media[0].url)}
        className="h-[600px] w-full cursor-pointer rounded-md object-cover"
      />
      <div
        className={`grid h-[600px] ${numImgs < 5 && "grid-cols-1"} ${numImgs > 3 && "grid-cols-2"} gap-4`}
      >
        {venue.media.slice(1, 5).map((img, idx) => (
          <img
            key={idx}
            src={img.url}
            alt={venue.name}
            onClick={() => handleImageClick(img.url)}
            className={`h-full ${numImgs > 2 && "max-h-[292px]"} w-full cursor-pointer rounded-md object-cover`}
          />
        ))}
      </div>
      {numImgs > 4 && (
        <div className="col-span-2 flex w-full flex-wrap gap-4">
          {venue.media.slice(5).map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt={venue.name}
              onClick={() => handleImageClick(img.url)}
              className={`h-32 w-32 cursor-pointer rounded-md object-cover`}
            />
          ))}
        </div>
      )}
      {isOpen && (
        <GalleryModal
          venue={venue}
          onClose={() => setIsOpen(false)}
          activeImageUrl={activeImageUrl}
        >
          <img src={activeImageUrl} alt={venue.name} className="object-cover" />
        </GalleryModal>
      )}
    </div>
  );
}
