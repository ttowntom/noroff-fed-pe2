import priceFormatter from "../../utils/priceFormatter";

/**
 * Component that calculates and displays booking price summary with VAT
 * @component
 * @param {Object} props
 * @param {number} [props.nights=0] - Number of nights booked
 * @param {number} props.pricePerNight - Price per night in USD
 * @returns {JSX.Element} Price summary display with nights, VAT and total
 *
 * @example
 * function BookingForm() {
 *   return (
 *     <BookingPriceSummary
 *       nights={3}
 *       pricePerNight={1000}
 *     />
 *   );
 * }
 */
export default function BookingPriceSummary({ nights = 0, pricePerNight }) {
  const beforeVat = nights * pricePerNight;
  const vat = beforeVat * 0.25;
  const total = beforeVat + vat;

  return (
    <div className="border-t border-light-border-secondary pt-3 dark:border-dark-border-secondary">
      <p className="flex justify-between">
        <span>Nights</span>
        <span>{nights}</span>
      </p>

      <p className="flex justify-between">
        <span>VAT (25%)</span>
        <span>{priceFormatter(vat)}</span>
      </p>
      <p className="flex justify-between font-semibold">
        <span>Total</span>
        <span>{priceFormatter(total)}</span>
      </p>
    </div>
  );
}
