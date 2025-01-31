import InputTextField from "../InputTextField";
import InputTextArea from "../InputTextArea";

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
