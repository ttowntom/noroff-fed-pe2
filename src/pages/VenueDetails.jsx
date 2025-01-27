import { useParams } from "react-router-dom";
import { useVenueDetails } from "../hooks/useVenueDetails";
import RatingStars from "../components/venue/RatingStars";
import Amenities from "../components/venue/Amenities";
import Owner from "../components/venue/Owner";
import Location from "../components/venue/Location";
import BookingCard from "../components/venue/BookingCard";
import Notification from "../components/Notification";

export default function VenueDetails() {
  const venueId = useParams().id;
  const { data, error, isLoading, isError } = useVenueDetails(venueId);

  if (data) {
    const venue = data.data;

    return (
      <>
        <div className="text-light-text-primary dark:text-dark-text-primary">
          {isError && <Notification message={error.message} />}
          {isLoading && <p>Loading...</p>}
          <img
            src={venue.media[0]?.url}
            alt={venue.name}
            className="mb-8 h-96 w-full rounded-lg object-cover"
          />
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-12 lg:gap-24">
            <div className="w-full lg:w-2/3">
              <h1 className="mb-4 font-notoSerif text-4xl font-semibold md:text-5xl">
                {venue.name}
              </h1>
              <p>
                <span className="text-xl font-bold">{`$${venue.price}`}</span>
                /night
              </p>
              <div className="flex items-center gap-2">
                <RatingStars rating={venue.rating} />
                <p className="text-sm">{`(${venue.rating} stars)`}</p>
              </div>
              <p className="my-6">{venue.description}</p>
              <Amenities venue={venue} />
              <Owner venue={venue} />
            </div>
            <BookingCard venue={venue} />
          </div>
          <Location venue={venue} />
        </div>
      </>
    );
  }
}
