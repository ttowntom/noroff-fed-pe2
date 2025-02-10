import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

import GalleryModal from "./GalleryModal";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/swiperSlider.css";

/**
 * Mobile-friendly gallery component with swiper functionality
 * @component
 * @param {Object} props
 * @param {Venue} props.venue - Venue data containing media array
 * @param {boolean} [props.desktopHidden=true] - Whether to hide on desktop viewports
 * @returns {JSX.Element} Swiper-based mobile gallery with modal viewer
 *
 * @example
 * function VenuePage({ venue }) {
 *   return (
 *     <div className="venue-details">
 *       <GalleryMobile
 *         venue={venue}
 *         desktopHidden={true}
 *       />
 *     </div>
 *   );
 * }
 */
export default function GalleryMobile({ venue, desktopHidden = true }) {
  const swiperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeImageUrl, setActiveImageUrl] = useState(null);

  /**
   * Opens modal with selected image
   * @param {string} imageUrl - URL of clicked image
   */
  function handleImageClick(imageUrl) {
    setActiveImageUrl(imageUrl);
    setIsOpen(true);
  }

  /**
   * Closes modal and resets active image
   */
  function handleClose() {
    setIsOpen(false);
    setActiveImageUrl(null);
  }

  return (
    <div
      className={`relative w-full ${desktopHidden === true ? "md:hidden" : ""}`}
    >
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet my-custom-bullet",
          bulletActiveClass:
            "swiper-pagination-bullet-active my-custom-bullet-active",
        }}
        className="h-96 w-full"
      >
        {venue.media.map((image, index) => (
          <SwiperSlide key={image.url} className="h-full !w-full">
            <img
              src={image.url}
              alt={`${venue.name} - Image ${index + 1}`}
              onClick={() => handleImageClick(image.url)}
              className="h-full w-full rounded-md object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous image"
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-light-bg-primary p-2 shadow-md dark:bg-dark-bg-primary"
      >
        <div className="flex h-4 w-4 items-center justify-center gap-1">
          <FontAwesomeIcon
            icon={byPrefixAndName.fas["chevron-left"]}
            className="text-lg text-light-text-primary dark:text-dark-text-primary"
          />
        </div>
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next image"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-light-bg-primary p-2 shadow-md dark:bg-dark-bg-primary"
      >
        <div className="flex h-4 w-4 items-center justify-center gap-1">
          <FontAwesomeIcon
            icon={byPrefixAndName.fas["chevron-right"]}
            className="text-lg text-light-text-primary dark:text-dark-text-primary"
          />
        </div>
      </button>
      {isOpen && (
        <GalleryModal
          venue={venue}
          onClose={handleClose}
          activeImageUrl={activeImageUrl}
        />
      )}
    </div>
  );
}
