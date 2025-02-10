import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

import InputTextField from "../InputTextField";

/**
 * Section component for managing venue images in a form
 * @component
 * @param {Object} props
 * @param {Array<string>} props.images - Array of image URLs
 * @param {Function} props.onImageAdd - Handler for adding new image
 * @param {Function} props.onImageDelete - Handler for deleting image by index
 * @param {Function} props.handleChange - Input change handler
 * @param {Function} props.handleBlur - Input blur handler
 * @param {FormErrors} props.formErrors - Form validation errors
 *
 * @example
 * function VenueForm() {
 *   const [images, setImages] = useState([]);
 *
 *   const handleImageAdd = (url) => {
 *     setImages([...images, url]);
 *   };
 *
 *   return (
 *     <ImagesSection
 *       images={images}
 *       onImageAdd={handleImageAdd}
 *       onImageDelete={(index) => {
 *         const newImages = images.filter((_, i) => i !== index);
 *         setImages(newImages);
 *       }}
 *       handleChange={handleChange}
 *       handleBlur={handleBlur}
 *       formErrors={{}}
 *     />
 *   );
 * }
 */
export default function ImagesSection({
  images,
  onImageAdd,
  onImageDelete,
  handleChange,
  handleBlur,
  formErrors,
}) {
  return (
    <section className="mb-4 flex flex-col gap-4">
      <h2 className="mt-4 text-xl font-bold sm:text-2xl">Images</h2>
      <div className="flex flex-wrap gap-4" aria-live="polite">
        {images.map((imageUrl, index) => (
          <div key={index} className="relative">
            <img
              src={imageUrl}
              alt={`Venue image ${index + 1}`}
              className="h-32 w-32 rounded-md object-cover"
            />
            <button
              type="button"
              onClick={() => onImageDelete(index)}
              aria-label="Delete image"
              className="absolute -right-2 -top-2 flex items-center justify-center rounded-full bg-color-neutral-white hover:opacity-80"
            >
              <FontAwesomeIcon
                icon={byPrefixAndName.fas["circle-xmark"]}
                className="text-xl text-light-text-error dark:text-dark-text-error"
              />
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex-grow">
          <InputTextField
            label="Image URL"
            name="imageUrl"
            type="url"
            onChange={handleChange}
            onBlur={handleBlur}
            error={formErrors.images}
            placeholder="Enter image URL"
          />
        </div>
        <button
          type="button"
          onClick={onImageAdd}
          className="rounded-md bg-light-button-primary px-4 py-2 text-light-text-alternate hover:opacity-80 dark:bg-dark-button-primary dark:text-dark-text-primary"
        >
          + Add image
        </button>
      </div>
    </section>
  );
}
