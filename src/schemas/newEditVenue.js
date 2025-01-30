import { z } from "zod";

const newEditVenueSchema = z.object({
  venueName: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),
  price: z
    .number()
    .min(1, "Price must be greater than 0")
    .max(10000, "Price cannot exceed $10 000"),
  maxGuests: z
    .number()
    .min(1, "Must accommodate at least 1 guest")
    .max(100, "Cannot exceed 100 guests"),
  rating: z
    .number()
    .min(0, "Rating must be between 0 and 5")
    .max(5, "Rating must be between 0 and 5"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image is required"),
});

export default newEditVenueSchema;
