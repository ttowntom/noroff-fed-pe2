import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

import { useVenueDetails } from "../../hooks/useVenueDetails.js";
import LinkButton from "../LinkButton.jsx";

/**
 * Featured venue component displaying spotlight venue with details and image
 * @component
 * @param {Object} props
 * @param {string} props.venueId - ID of the featured venue
 * @returns {JSX.Element|null} Featured venue section or null if data not loaded
 *
 * @example
 * function HomePage() {
 *   return (
 *     <main>
 *       <VenueOfTheMonth venueId="featured-123" />
 *     </main>
 *   );
 * }
 */
export default function VenueOfTheMonth({ venueId }) {
  const { data } = useVenueDetails(venueId);

  if (data) {
    return (
      <div className="relative flex flex-col items-center gap-14 text-light-text-alternate dark:text-dark-text-primary md:flex-row">
        <div className="z-20 space-y-8">
          <p className="-mb-6 font-medium">Spotlight</p>
          <h2 className="text-4xl font-bold">
            Discover Our Featured Venue of the Month
          </h2>
          <p>
            Experience unparalleled comfort at{" "}
            <span className="font-semibold">{data.data.name}</span>, our
            highlighted venue this month. Perfectly located, it offers a blend
            of luxury and convenience for all travelers.
          </p>
          <ul className="list-none space-y-2">
            <li className="flex items-center gap-4">
              <FontAwesomeIcon
                icon={byPrefixAndName.fas["fire-flame-curved"]}
                className="text-orange-500"
              />
              Stay in a cozy treetop haven, blending Nordic charm with
              breathtaking canopy views
            </li>
            <li className="flex items-center gap-4">
              <FontAwesomeIcon
                icon={byPrefixAndName.fas["fire-flame-curved"]}
                className="text-orange-500"
              />
              Stunning views and wildlife
            </li>
            <li className="flex items-center gap-4">
              <FontAwesomeIcon
                icon={byPrefixAndName.fas["fire-flame-curved"]}
                className="text-orange-500"
              />
              A lakeside escape perfect for swimming in the summer and ice
              skating in the winter
            </li>
          </ul>

          <div className="w-fit">
            <LinkButton to={`venues/${venueId}`}>View Venue details</LinkButton>
          </div>
        </div>
        <img
          src={data.data.media[0]?.url}
          alt={data.data.name}
          className="max-h-1/4 relative z-10 -mt-6 rounded-md object-cover md:mt-0 md:w-1/2"
        />
      </div>
    );
  }
}
