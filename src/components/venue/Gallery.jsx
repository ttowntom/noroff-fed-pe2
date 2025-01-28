import { NO_VENUE_IMG_URL } from "../../constants";
import GalleryDesktop from "./GalleryDesktop";
import GalleryMobile from "./GalleryMobile";

export default function Gallery({ venue }) {
  const numImgs = venue.media.length;

  if (numImgs < 2) {
    return (
      <img
        src={venue.media[0]?.url || NO_VENUE_IMG_URL}
        alt={venue.name}
        onClick={() => handleImageClick(venue.media[0]?.url)}
        className="mb-8 h-96 w-full rounded-lg object-cover"
      />
    );
  }

  return (
    <section className={`${numImgs > 5 && "xl:mb-12"}`}>
      <GalleryMobile venue={venue} />
      <GalleryDesktop venue={venue} />
    </section>
  );
}
