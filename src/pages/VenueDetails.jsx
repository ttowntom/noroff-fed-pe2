import { useParams } from "react-router-dom";

import { useVenueDetails } from "../hooks/useVenueDetails";
import priceFormatter from "../utils/priceFormatter";
import RatingStars from "../components/venue/RatingStars";
import Amenities from "../components/venue/Amenities";
import Owner from "../components/venue/Owner";
import Location from "../components/venue/Location";
import BookingCard from "../components/venue/BookingCard";
import Notification from "../components/Notification";
import Gallery from "../components/venue/Gallery";
import Loading from "../components/Loading";

/**
 * Venue details page displaying comprehensive venue information
 * @component
 * @returns {JSX.Element} Detailed venue view with gallery, booking, and info sections
 *
 * @example
 * function App() {
 *   return (
 *     <Routes>
 *       <Route path="/venues/:id" element={<VenueDetails />} />
 *     </Routes>
 *   );
 * }
 */
export default function VenueDetails() {
  const venueId = useParams().id;
  const { data, error, isLoading, isError } = useVenueDetails(venueId);

  if (data) {
    const venue = data.data;

    return (
      <>
        <div className="flex flex-col gap-6 text-light-text-primary dark:text-dark-text-primary">
          {isError && (
            <Notification type="error">
              <p>{error.message}</p>
            </Notification>
          )}
          {isLoading && <Loading />}

          <Gallery venue={venue} />
          <div className="flex flex-col gap-4 overflow-visible md:flex-row md:justify-between md:gap-12 lg:gap-24">
            <div className="w-full lg:w-2/3">
              <h1 className="word-break: mb-4 break-words font-notoSerif text-4xl font-semibold md:text-5xl">
                {venue.name}
              </h1>
              <p>
                <span className="text-xl font-bold">
                  {priceFormatter(venue.price)}
                </span>
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
