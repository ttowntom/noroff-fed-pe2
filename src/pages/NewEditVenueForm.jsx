import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";
import InputTextField from "../components/InputTextField";
import InputTextArea from "../components/InputTextArea";
import InputCheckRadio from "../components/InputCheckRadio";
import SetLocation from "../components/venueManager/SetLocation";
import Button from "../components/Button";

export default function NewEditVenueForm() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    country: "",
    zip: "",
    lat: 0,
    lng: 0,
  });

  function handleLocationSet(locationData) {
    setFormData({
      address: locationData.address || "",
      city: locationData.city || "",
      country: locationData.country || "",
      zip: locationData.postcode || "",
      lat: locationData.lat,
      lng: locationData.lng,
    });
  }

  function handleCancel() {
    navigate(-1);
  }

  function handleImageAdd() {
    const imageUrl = document.querySelector('input[name="imageUrl"]').value;
    if (imageUrl) {
      setImages((prev) => [...prev, imageUrl]);
    }
    // Reset the input field
    document.querySelector('input[name="imageUrl"]').value = "";
  }

  function handleImageDelete(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col justify-center gap-6 text-light-text-primary dark:text-dark-text-primary">
      <div className="space-y-4 text-center">
        <h1 className="font-notoSerif text-4xl font-semibold sm:text-5xl">
          Add a new venue
        </h1>
        <p>
          Enter the details below to list a new venue on the Holidaze platform.
        </p>
      </div>
      <form className="mx-auto mt-6 flex w-full max-w-[65ch] flex-col gap-4">
        <section className="mb-4 flex flex-col gap-4">
          <h2 className="text-xl font-bold sm:text-2xl">Venue details</h2>
          <InputTextField
            label="Venue name"
            name="venueName"
            type="text"
            placeholder="Enter venue name"
            required
          />
          <InputTextArea
            label="Description"
            name="description"
            placeholder="Enter a description"
            required
          />
        </section>
        <section className="mb-4 flex flex-col gap-4">
          <h2 className="mt-4 text-xl font-bold sm:text-2xl">Location</h2>
          <p className="-mb-2 text-sm">
            Click on the map to set the location of the venue.
          </p>
          <SetLocation onLocationSet={handleLocationSet} />
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-grow">
              <InputTextField
                label="Address"
                name="address"
                type="text"
                placeholder="Enter address"
                value={formData.address}
                defaultValue={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
              />
            </div>
            <InputTextField
              label="Country"
              name="country"
              type="text"
              placeholder="Enter country"
              value={formData.country}
              defaultValue={formData.country}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, country: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <InputTextField
              label="Zip code"
              name="zip"
              type="text"
              placeholder="Enter zip code"
              value={formData.zip}
              defaultValue={formData.zip}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, zip: e.target.value }))
              }
            />
            <div className="flex-grow">
              <InputTextField
                label="City"
                name="city"
                type="text"
                placeholder="Enter city"
                value={formData.city}
                defaultValue={formData.city}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, city: e.target.value }))
                }
              />
            </div>
          </div>
        </section>
        <section className="mb-4 flex flex-col gap-4">
          <h2 className="mt-4 text-xl font-bold sm:text-2xl">
            Price and capacity
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <InputTextField
              label="Price per night"
              name="price"
              type="number"
              placeholder="Enter price"
            />
            <InputTextField
              label="Max guests"
              name="maxGuests"
              type="number"
              placeholder="Enter max guests"
            />
          </div>
        </section>
        <section className="mb-4 flex flex-col gap-4">
          <h2 className="mt-4 text-xl font-bold sm:text-2xl">Amenities</h2>
          <div className="grid max-w-fit grid-cols-1 gap-4 xs:grid-cols-2">
            <InputCheckRadio
              label="Wi-Fi"
              name="wifi"
              type="checkbox"
              value="wifi"
            />
            <InputCheckRadio
              label="Parking"
              name="parking"
              type="checkbox"
              value="parking"
            />
            <InputCheckRadio
              label="Breakfast"
              name="breakfast"
              type="checkbox"
              value="breakfast"
            />
            <InputCheckRadio
              label="Pets allowed"
              name="pets"
              type="checkbox"
              value="pets"
            />
          </div>
        </section>
        <section className="mb-4 flex flex-col gap-4">
          <h2 className="mt-4 text-xl font-bold sm:text-2xl">Rating</h2>
          <div className="flex items-center gap-1">
            {rating > 0 && (
              <button onClick={() => setRating(0)} className="text-xl">
                <FontAwesomeIcon
                  icon={byPrefixAndName.fas["star-exclamation"]}
                  className="mr-2 text-xl text-light-text-error dark:text-dark-text-error"
                />
              </button>
            )}
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="text-xl"
              >
                <FontAwesomeIcon
                  icon={
                    star <= (hover || rating)
                      ? byPrefixAndName.fas["star"]
                      : byPrefixAndName.far["star"]
                  }
                  className="text-light-text-warning dark:text-dark-text-warning"
                />
              </button>
            ))}
            <p>({rating} stars)</p>
          </div>
        </section>
        <section className="mb-4 flex flex-col gap-4">
          <h2 className="mt-4 text-xl font-bold sm:text-2xl">Images</h2>
          <div className="grid grid-cols-1 gap-4 xs:grid-cols-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="h-40 w-full rounded-md object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(index)}
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
            <div class="flex-grow">
              <InputTextField
                label="Image URL"
                name="imageUrl"
                type="url"
                placeholder="Enter image URL"
              />
            </div>
            <button
              type="button"
              onClick={handleImageAdd}
              className="rounded-md bg-light-button-primary px-4 py-2 text-light-text-alternate hover:opacity-80 dark:bg-dark-button-primary dark:text-dark-text-primary"
            >
              + Add image
            </button>
          </div>
        </section>
        <section className="mt-12 flex flex-col gap-4">
          <Button type="submit">Add venue</Button>
          <Button type="button" variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </section>
      </form>
    </div>
  );
}
