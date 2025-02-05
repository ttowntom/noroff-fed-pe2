import InputTextField from "../InputTextField";
import InputTextArea from "../InputTextArea";

/**
 * Section component for managing venue name and description inputs
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
 *     venueName: '',
 *     description: ''
 *   });
 *
 *   return (
 *     <VenueDetailsSection
 *       formData={formData}
 *       handleChange={handleChange}
 *       handleBlur={handleBlur}
 *       formErrors={{}}
 *     />
 *   );
 * }
 */
export default function VenueDetailsSection({
  formData,
  handleChange,
  handleBlur,
  formErrors,
}) {
  return (
    <section className="mb-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold sm:text-2xl">Venue details</h2>
      <InputTextField
        label="Venue name"
        name="venueName"
        type="text"
        value={formData.venueName}
        defaultValue={formData.venueName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={formErrors.venueName}
        placeholder="Enter venue name"
        required
      />
      <InputTextArea
        label="Description"
        name="description"
        value={formData.description}
        defaultValue={formData.description}
        onChange={handleChange}
        onBlur={handleBlur}
        error={formErrors.description}
        placeholder="Enter a description"
        required
      />
    </section>
  );
}
