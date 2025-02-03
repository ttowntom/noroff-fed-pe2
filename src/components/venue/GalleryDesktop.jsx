import { useState } from "react";
import GalleryModal from "./GalleryModal";

export default function GalleryDesktop({ venue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeImageUrl, setActiveImageUrl] = useState(null);

  const numImgs = venue.media.length;

  function handleImageClick(imageUrl) {
    setActiveImageUrl(imageUrl);
    setIsOpen(true);
  }

  return (
    <div className="mb-8 hidden max-h-[600px] gap-4 md:grid md:grid-cols-2">
      <img
        src={venue.media[0].url}
        alt={venue.name}
        onClick={() => handleImageClick(venue.media[0].url)}
        className="h-full max-h-[600px] w-full cursor-pointer rounded-md object-cover"
      />
      <div
        className={`grid max-h-[600px] ${numImgs < 5 && "grid-cols-1"} ${numImgs > 4 && "grid-cols-2"} gap-4`}
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
