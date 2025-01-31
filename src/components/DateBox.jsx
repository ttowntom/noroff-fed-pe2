export default function RenderDate({ date }) {
  const dateObj = new Date(date);

  return (
    <div className="mt-4 flex flex-col items-center gap-1 rounded-md border border-light-border-primary bg-light-bg-primary px-4 py-2 dark:border-dark-border-primary dark:bg-dark-bg-primary">
      <p className="text-center">
        {dateObj.toLocaleDateString("en-GB", { weekday: "short" })}
      </p>
      <p className="text-center font-bold">
        {dateObj.toLocaleDateString("en-GB", { day: "numeric" })}
      </p>
      <p className="text-center">
        {dateObj.toLocaleDateString("en-GB", {
          month: "short",
          year: "numeric",
        })}
      </p>
    </div>
  );
}
