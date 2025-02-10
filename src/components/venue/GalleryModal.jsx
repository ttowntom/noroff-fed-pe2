import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/swiperSlider.css";

/**
 * Modal component for displaying venue images in a fullscreen swiper gallery
 * @component
 * @param {Object} props
 * @param {Venue} props.venue - Venue data containing media array
 * @param {number} props.activeImageUrl - Index of initial slide to display
 * @param {Function} [props.onClose] - Optional callback when modal closes
 * @returns {ReactPortal} Portal containing modal dialog with swiper gallery
 *
 * @example
 * function Gallery({ venue }) {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const [activeSlide, setActiveSlide] = useState(0);
 *
 *   return (
 *     <>
 *       {isOpen && (
 *         <GalleryModal
 *           venue={venue}
 *           activeImageUrl={activeSlide}
 *           onClose={() => setIsOpen(false)}
 *         />
 *       )}
 *     </>
 *   );
 * }
 */
export default function GalleryModal({ venue, activeImageUrl, onClose }) {
  const dialog = useRef();
  const swiperRef = useRef();

  // Find the index of the active image
  const initialSlide = venue.media.findIndex(
    (img) => img.url === activeImageUrl
  );

  useEffect(() => {
    const modal = dialog.current;
    modal.showModal();

    return () => {
      modal.close();
    };
  }, []);

  /**
   * Handles closing the modal dialog
   * @private
   */
  const handleClose = () => {
    dialog.current.close();
    if (onClose) {
      onClose();
    }
  };

  /**
   * Handles clicks on the modal backdrop
   * @private
   * @param {MouseEvent} e - Click event
   */
  const handleBackdropClick = (e) => {
    if (e.target === dialog.current) {
      handleClose();
    }
  };

  return createPortal(
    <dialog
      ref={dialog}
      onClose={handleClose}
      onClick={handleBackdropClick}
      aria-modal="true"
      aria-label="Gallery Modal"
      className="relative max-h-[90vh] min-w-[90%] max-w-[95%] rounded-lg bg-light-bg-primary backdrop:bg-black/50 dark:bg-dark-bg-primary"
    >
      <FontAwesomeIcon
        icon={byPrefixAndName.fas["circle-xmark"]}
        onClick={handleClose}
        className="absolute right-2 top-2 z-50 cursor-pointer text-3xl text-light-link-primary hover:opacity-80 dark:text-dark-link-primary"
      />
      <div className="flex items-center justify-center overflow-hidden">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          initialSlide={initialSlide}
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          navigation={false}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet my-custom-bullet",
            bulletActiveClass:
              "swiper-pagination-bullet-active my-custom-bullet-active",
          }}
          className="h-[80vh] w-full"
        >
          {venue.media.map((image, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
              <img
                src={image.url}
                alt={`${venue.name} - Image ${index + 1}`}
                className="h-full w-full object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous slide"
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
          aria-label="Next slide"
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-light-bg-primary p-2 shadow-md dark:bg-dark-bg-primary"
        >
          <div className="flex h-4 w-4 items-center justify-center gap-1">
            <FontAwesomeIcon
              icon={byPrefixAndName.fas["chevron-right"]}
              className="text-lg text-light-text-primary dark:text-dark-text-primary"
            />
          </div>
        </button>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
