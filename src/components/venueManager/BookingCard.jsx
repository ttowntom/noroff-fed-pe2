import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

import DateBox from "../DateBox";

/**
 * Card component for displaying booking information in venue manager dashboard
 * @component
 * @param {Object} props
 * @param {Booking} props.booking - Booking information to display
 * @returns {JSX.Element} Article containing booking details
 *
 * @example
 * const booking = {
 *   dateFrom: "2024-03-20",
 *   dateTo: "2024-03-25",
 *   customer: {
 *     name: "John Doe",
 *     email: "john@example.com"
 *   }
 * };
 *
 * <BookingCard booking={booking} />
 */
export default function BookingCard({ booking }) {
  const isPastBooking = new Date(booking.dateTo) < new Date();

  return (
    <article
      className={`flex flex-grow flex-col items-center justify-center gap-2 rounded-lg border bg-light-bg-secondary p-2 shadow-md dark:bg-dark-bg-secondary sm:px-6 sm:py-4 md:max-w-[30vw] ${isPastBooking ? "border-light-border-error" : "border-light-border-primary dark:border-dark-border-primary"}`}
    >
      <Link
        to={`/profile/${booking.customer.name}`}
        className="hover:underline"
      >
        <h4 className="-mb-2 text-lg font-bold">{booking.customer.name}</h4>
      </Link>
      <p>{booking.customer.email}</p>
      <div className="flex flex-col items-center justify-center gap-2 xs:flex-row">
        <DateBox date={booking.dateFrom} />
        <FontAwesomeIcon
          icon={byPrefixAndName.fas["horizontal-rule"]}
          className="text-light-text-primary dark:text-dark-text-primary"
        />
        <DateBox date={booking.dateTo} />
      </div>
    </article>
  );
}
