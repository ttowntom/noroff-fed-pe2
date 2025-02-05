/**
 * Call-to-action component with angled background styling
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to display in CTA section
 * @returns {JSX.Element} Section with angled gradient background
 *
 * @example
 * // Basic usage
 * <Cta>
 *   <h2>Special Offer!</h2>
 *   <p>Book now and save 20%</p>
 * </Cta>
 *
 * // With nested components
 * <Cta>
 *   <VenueHighlight />
 *   <BookingButton />
 * </Cta>
 */
export default function Cta({ children }) {
  return (
    <div className="relative z-10 my-8 bg-light-bg-alternate dark:bg-dark-bg-secondary">
      {/* Top angle */}
      <div className="sm:h-62 -z-1 absolute inset-x-0 -top-4 h-44 skew-y-[3deg] transform bg-gradient-to-r from-light-bg-alternate to-light-bg-alternate dark:from-dark-bg-secondary dark:to-dark-bg-secondary sm:-top-6 sm:-skew-y-[1deg]" />

      {/* Content */}
      <div className="relative z-10 mx-auto bg-light-bg-alternate px-4 py-6 dark:bg-dark-bg-secondary">
        {children}
      </div>

      {/* Bottom angle */}
      <div className="sm:h-62 -z-1 absolute inset-x-0 -bottom-4 h-44 skew-y-[-3deg] transform bg-gradient-to-r from-light-bg-alternate to-light-bg-alternate dark:from-dark-bg-secondary dark:to-dark-bg-secondary sm:-bottom-6 sm:-skew-y-[-1deg]" />
    </div>
  );
}
