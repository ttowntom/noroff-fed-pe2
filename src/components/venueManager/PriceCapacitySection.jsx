import InputTextField from "../InputTextField";

/**
 * Section component for managing venue price and capacity inputs
 * @component
 * @param {Object} props
 * @param {FormData} props.formData - Current form values
 * @param {Function} props.handleChange - Input change handler
 * @param {Function} props.handleBlur - Input blur handler
 * @param {FormErrors} props.formErrors - Form validation errors
 *
 * @example
 * function VenueForm() {
 *   const [formData, setFormData] = useState({
 *     price: 0,
 *     maxGuests: 1
 *   });
 *
 *   return (
 *     <PriceCapacitySection
 *       formData={formData}
 *       handleChange={handleChange}
 *       handleBlur={handleBlur}
 *       formErrors={{}}
 *     />
 *   );
 * }
 */
export default function PriceCapacitySection({
  formData,
  handleChange,
  handleBlur,
  formErrors,
}) {
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    handleChange({
      target: {
        name,
        value: Number(value),
      },
    });
  };

  const handleNumberBlur = (e) => {
    const { name, value } = e.target;
    handleBlur({
      target: {
        name,
        value: Number(value),
      },
    });
  };

  return (
    <section className="mb-4 flex flex-col gap-4">
      <h2 className="mt-4 text-xl font-bold sm:text-2xl">Price and capacity</h2>
      <div className="flex flex-col gap-4 sm:flex-row">
        <InputTextField
          label="Price per night ($USD)"
          name="price"
          type="number"
          value={formData.price}
          defaultValue={formData.price}
          onChange={handleNumberChange}
          onBlur={handleNumberBlur}
          error={formErrors.price}
          placeholder="Enter price"
        />
        <InputTextField
          label="Max guests"
          name="maxGuests"
          type="number"
          value={formData.maxGuests}
          defaultValue={formData.maxGuests}
          onChange={handleNumberChange}
          onBlur={handleNumberBlur}
          error={formErrors.maxGuests}
          placeholder="Enter max guests"
        />
      </div>
    </section>
  );
}
