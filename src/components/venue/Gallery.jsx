import { NO_VENUE_IMG_URL } from "../../constants";

import GalleryDesktop from "./GalleryDesktop";
import GalleryMobile from "./GalleryMobile";

/**
 * Gallery component that displays venue images in responsive layouts
 * @component
 * @param {Object} props
 * @param {Venue} props.venue - Venue data containing media array
 * @returns {JSX.Element} Responsive gallery with desktop and mobile views
 *
 * @example
 * function VenuePage({ venue }) {
 *   return (
 *     <div className="venue-details">
 *       <Gallery venue={venue} />
 *     </div>
 *   );
 * }
 */
export default function Gallery({ venue }) {
  const numImgs = venue.media.length;

  if (numImgs < 2) {
    return (
      <img
        src={venue.media[0]?.url || NO_VENUE_IMG_URL}
        alt={venue.name}
        className="mb-8 h-96 w-full rounded-lg object-cover"
      />
    );
  }

  return (
    <section>
      <GalleryMobile venue={venue} />
      <GalleryDesktop venue={venue} />
    </section>
  );
}
