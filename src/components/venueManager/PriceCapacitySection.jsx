import InputTextField from "../InputTextField";

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
          label="Price per night"
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
