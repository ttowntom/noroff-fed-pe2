import { useState } from "react";

import SetLocation from "./SetLocation";
import InputTextField from "../InputTextField";

export default function LocationSection({
  formErrors,
  handleBlur,
  handleChange,
}) {
  const [locationData, setLocationData] = useState({
    address: "",
    city: "",
    country: "",
    zip: "",
    lat: 0,
    lng: 0,
  });

  function handleLocationSet(location) {
    // Update local state
    setLocationData({
      address: location.address || "",
      city: location.city || "",
      country: location.country || "",
      zip: location.postcode || "",
      lat: location.lat,
      lng: location.lng,
    });

    // Update parent state by simulating change events
    ["address", "city", "country", "zip"].forEach((field) => {
      const value = field === "zip" ? location.postcode : location[field];
      handleChange({
        target: { name: field, value: value || "" },
      });
    });

    // Update lat/lng in parent
    handleChange({ target: { name: "lat", value: location.lat } });
    handleChange({ target: { name: "lng", value: location.lng } });
  }

  function handleCombinedChange(e) {
    // Handle form validation
    handleChange(e);

    // Handle local state
    const { name, value } = e.target;
    setLocationData((prev) => ({ ...prev, [name]: value }));
  }

  return (
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
            onBlur={handleBlur}
            error={formErrors.address}
            placeholder="Enter address"
            value={locationData.address}
            defaultValue={locationData.address}
            onChange={handleCombinedChange}
          />
        </div>
        <InputTextField
          label="Country"
          name="country"
          type="text"
          onBlur={handleBlur}
          error={formErrors.country}
          placeholder="Enter country"
          value={locationData.country}
          defaultValue={locationData.country}
          onChange={handleCombinedChange}
        />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <InputTextField
          label="Zip code"
          name="zip"
          type="text"
          onBlur={handleBlur}
          error={formErrors.zip}
          placeholder="Enter zip code"
          value={locationData.zip}
          defaultValue={locationData.zip}
          onChange={handleCombinedChange}
        />
        <div className="flex-grow">
          <InputTextField
            label="City"
            name="city"
            type="text"
            onBlur={handleBlur}
            error={formErrors.city}
            placeholder="Enter city"
            value={locationData.city}
            defaultValue={locationData.city}
            onChange={handleCombinedChange}
          />
        </div>
      </div>
    </section>
  );
}
