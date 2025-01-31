import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postFn, fetchFn, putFn } from "../utils/http";
import { useFormValidation } from "../hooks/useFormValidation";
import { useVenueTransform } from "../hooks/useVenueTransform";
import useUserStore from "../store/userStore";
import newEditVenueSchema from "../schemas/newEditVenue";
import Button from "../components/Button";
import Notification from "../components/Notification";
import ImagesSection from "../components/venueManager/ImagesSection";
import RatingSection from "../components/venueManager/RatingSection";
import AmenitiesSection from "../components/venueManager/AmenitiesSection";
import LocationSection from "../components/venueManager/LocationSection";
import VenueDetailsSection from "../components/venueManager/VenueDetailsSection";
import PriceCapacitySection from "../components/venueManager/PriceCapacitySection";

export default function NewEditVenueForm() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [formIsValid, setFormIsValid] = useState(undefined);
  const { transformToApiFormat } = useVenueTransform();

  // Fetch existing venue data if editing
  const { data: venueData, isLoading } = useQuery({
    queryKey: [`/holidaze/venues/${id}?_owner=true`],
    queryFn: fetchFn,
    enabled: isEditing, // Only fetch if editing
  });

  const {
    formData,
    formErrors,
    setFormData,
    setFormErrors,
    handleBlur,
    handleChange,
  } = useFormValidation(
    {
      venueName: "",
      description: "",
      price: "",
      maxGuests: "",
      rating: 0,
      address: "",
      city: "",
      country: "",
      zip: "",
      lat: 0,
      lng: 0,
      images: [],
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    newEditVenueSchema
  );

  // Populate form when editing and data is loaded
  useEffect(() => {
    if (isEditing && venueData) {
      const venue = venueData.data;
      setFormData({
        venueName: venue.name,
        description: venue.description,
        price: venue.price,
        maxGuests: venue.maxGuests,
        rating: venue.rating,
        address: venue.location.address,
        city: venue.location.city,
        country: venue.location.country,
        zip: venue.location.zip,
        lat: venue.location.lat,
        lng: venue.location.lng,
        images: venue.media.map((img) => img.url),
        wifi: venue.meta.wifi,
        parking: venue.meta.parking,
        breakfast: venue.meta.breakfast,
        pets: venue.meta.pets,
      });
    }
  }, [isEditing, venueData, setFormData]);

  function handleCancel() {
    navigate(-1);
  }

  function handleImageAdd() {
    const imageUrl = document.querySelector('input[name="imageUrl"]').value;
    if (imageUrl) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl],
      }));
      // Reset input
      document.querySelector('input[name="imageUrl"]').value = "";
    }
  }

  function handleImageDelete(index) {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  }

  // const { mutate, isPending, isError, error } = useMutation({
  //   mutationFn: ({ venueData, token }) =>
  //     postFn({
  //       url: "/holidaze/venues",
  //       body: venueData,
  //       token,
  //     }),
  //   onSuccess: (data) => {
  //     navigate(`/venues/${data.data.id}`);
  //   },
  // });

  // Use mutation for either creating or updating
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ venueData, token }) => {
      if (isEditing) {
        return putFn({
          url: `/holidaze/venues/${id}`,
          body: venueData,
          token,
        });
      }
      return postFn({
        url: "/holidaze/venues",
        body: venueData,
        token,
      });
    },
    onSuccess: (data) => {
      navigate(`/venues/${data.data.id}`);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    try {
      newEditVenueSchema.parse({
        ...formData,
        price: Number(formData.price),
        maxGuests: Number(formData.maxGuests),
        rating: Number(formData.rating),
        images: formData.images,
      });
      const venueData = transformToApiFormat(formData);
      setFormIsValid(true);
      mutate({ venueData, token: user.token });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorObj = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setFormErrors(errorObj);
        setFormIsValid(false);
      }
    }
  }

  return (
    <div className="flex flex-col justify-center gap-6 text-light-text-primary dark:text-dark-text-primary">
      <div className="space-y-4 text-center">
        <h1 className="font-notoSerif text-4xl font-semibold sm:text-5xl">
          {isEditing ? "Edit venue" : "Add new venue"}
        </h1>
        <p>
          {isEditing
            ? "Edit the details below to make changes to your venue listing."
            : "Enter the details below to list a new venue on the Holidaze platform."}
        </p>
      </div>
      {isEditing && isLoading ? (
        <p>Loading...</p>
      ) : (
        <form className="mx-auto mt-6 flex w-full max-w-[65ch] flex-col gap-4">
          <VenueDetailsSection
            formData={formData}
            formErrors={formErrors}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          <LocationSection
            formData={formData}
            formErrors={formErrors}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <PriceCapacitySection
            formData={formData}
            handleChange={handleChange}
            handleBlur={handleBlur}
            formErrors={formErrors}
          />

          <AmenitiesSection
            formData={formData}
            handleChange={handleChange}
            handleBlur={handleBlur}
            formErrors={formErrors}
          />

          <RatingSection
            formData={formData}
            onRatingChange={(value) =>
              setFormData((prev) => ({ ...prev, rating: value }))
            }
          />
          <ImagesSection
            images={formData.images}
            onImageAdd={handleImageAdd}
            onImageDelete={handleImageDelete}
            handleChange={handleChange}
            handleBlur={handleBlur}
            formErrors={formErrors}
          />

          <section className="mt-12 flex flex-col gap-4">
            {formIsValid === false && (
              <Notification type="error">
                Please fix the errors in the form before submitting.
              </Notification>
            )}
            {isError && (
              <Notification type="error">{error.message}</Notification>
            )}
            <Button onClick={handleSubmit} type="submit">
              {isEditing ? "Edit venue" : "Add venue"}
            </Button>
            <Button
              type="button"
              disabled={isPending}
              variant="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </section>
        </form>
      )}
    </div>
  );
}
