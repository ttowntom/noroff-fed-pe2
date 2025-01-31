import InputCheckRadio from "../InputCheckRadio";

export default function AmenitiesSection({
  formData,
  handleChange,
  handleBlur,
  formErrors,
}) {
  return (
    <section className="mb-4 flex flex-col gap-4">
      <h2 className="mt-4 text-xl font-bold sm:text-2xl">Amenities</h2>
      <div className="grid max-w-fit grid-cols-1 gap-4 xs:grid-cols-2">
        <InputCheckRadio
          label="Wi-Fi"
          name="wifi"
          type="checkbox"
          value="wifi"
          checked={formData.wifi}
          onChange={handleChange}
          onBlur={handleBlur}
          error={formErrors.wifi}
        />
        <InputCheckRadio
          label="Parking"
          name="parking"
          type="checkbox"
          value="parking"
          checked={formData.parking}
          onChange={handleChange}
          onBlur={handleBlur}
          error={formErrors.parking}
        />
        <InputCheckRadio
          label="Breakfast"
          name="breakfast"
          type="checkbox"
          value="breakfast"
          checked={formData.breakfast}
          onChange={handleChange}
          onBlur={handleBlur}
          error={formErrors.breakfast}
        />
        <InputCheckRadio
          label="Pets allowed"
          name="pets"
          type="checkbox"
          value="pets"
          checked={formData.pets}
          onChange={handleChange}
          onBlur={handleBlur}
          error={formErrors.pets}
        />
      </div>
    </section>
  );
}
