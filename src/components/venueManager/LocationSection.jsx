import InputTextField from "../InputTextField";

import SetLocation from "./SetLocation";

/**
 * Section component for managing venue location in a form
 * @component
 * @param {Object} props
 * @param {FormData} props.formData - Current form values
 * @param {FormErrors} props.formErrors - Form validation errors
 * @param {Function} props.handleBlur - Input blur handler
 * @param {Function} props.handleChange - Input change handler
 *
 * @example
 * function VenueForm() {
 *   const [formData, setFormData] = useState({
 *     address: '',
 *     city: '',
 *     country: '',
 *     zip: '',
 *     lat: 0,
 *     lng: 0
 *   });
 *
 *   return (
 *     <LocationSection
 *       formData={formData}
 *       formErrors={{}}
 *       handleBlur={handleBlur}
 *       handleChange={handleChange}
 *     />
 *   );
 * }
 */
export default function LocationSection({
  formData,
  formErrors,
  handleBlur,
  handleChange,
}) {
  function handleLocationSet(location) {
    // Update parent form state with location data
    ["address", "city", "country", "zip"].forEach((field) => {
      const value = field === "zip" ? location.postcode : location[field];
      handleChange({
        target: { name: field, value: value || "" },
      });
    });

    // Update coordinates
    handleChange({ target: { name: "lat", value: location.lat } });
    handleChange({ target: { name: "lng", value: location.lng } });
  }

  return (
    <section className="mb-4 flex flex-col gap-4">
      <h2 className="mt-4 text-xl font-bold sm:text-2xl">Location</h2>
      <p className="-mb-2 text-sm">
        Click on the map to set the venue location.
      </p>

      <SetLocation
        onLocationSet={handleLocationSet}
        initialLat={formData.lat}
        initialLng={formData.lng}
      />

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-grow">
          <InputTextField
            label="Address"
            name="address"
            type="text"
            value={formData.address}
            defaultValue={formData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formErrors.address}
            placeholder="Enter address"
          />
        </div>
        <InputTextField
          label="Country"
          name="country"
          type="text"
          value={formData.country}
          defaultValue={formData.country}
          onChange={handleChange}
          onBlur={handleBlur}
          error={formErrors.country}
          placeholder="Enter country"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <InputTextField
          label="City"
          name="city"
          type="text"
          defaultValue={formData.city}
          value={formData.city}
          onChange={handleChange}
          onBlur={handleBlur}
          error={formErrors.city}
          placeholder="Enter city"
        />
        <InputTextField
          label="ZIP"
          name="zip"
          type="text"
          defaultValue={formData.zip}
          value={formData.zip}
          onChange={handleChange}
          onBlur={handleBlur}
          error={formErrors.zip}
          placeholder="Enter ZIP code"
        />
      </div>
    </section>
  );
}
