/**
 * Loading animation component with bouncing dots
 * @component
 * @returns {JSX.Element} Centered loading dots animation
 *
 * @example
 * // Basic usage
 * function DataComponent() {
 *   const { data, isLoading } = useQuery(...);
 *
 *   if (isLoading) {
 *     return <Loading />;
 *   }
 *
 *   return <div>{data}</div>;
 * }
 */
export default function Loading() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-row gap-2">
        <div className="h-4 w-4 animate-bounce rounded-full bg-light-button-primary [animation-delay:.7s] dark:bg-dark-button-primary"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-light-button-primary [animation-delay:.3s] dark:bg-dark-button-primary"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-light-button-primary [animation-delay:.7s] dark:bg-dark-button-primary"></div>
      </div>
    </div>
  );
}
