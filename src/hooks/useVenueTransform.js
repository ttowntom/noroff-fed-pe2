export function useVenueTransform() {
  function transformToApiFormat(formData) {
    return {
      name: formData.venueName,
      description: formData.description,
      media: formData.images.map((url) => ({
        url,
        alt: `Image of ${formData.venueName}`,
      })),
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      rating: Number(formData.rating),
      meta: {
        wifi: Boolean(formData.wifi),
        parking: Boolean(formData.parking),
        breakfast: Boolean(formData.breakfast),
        pets: Boolean(formData.pets),
      },
      location: {
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
        country: formData.country,
        continent: "Europe",
        lat: Number(formData.lat),
        lng: Number(formData.lng),
      },
    };
  }

  return { transformToApiFormat };
}
