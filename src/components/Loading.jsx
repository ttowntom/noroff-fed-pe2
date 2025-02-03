export default function Loading() {
  return (
    <div className="flex justify-center">
      <div class="flex flex-row gap-2">
        <div class="h-4 w-4 animate-bounce rounded-full bg-light-button-primary [animation-delay:.7s] dark:bg-dark-button-primary"></div>
        <div class="h-4 w-4 animate-bounce rounded-full bg-light-button-primary [animation-delay:.3s] dark:bg-dark-button-primary"></div>
        <div class="h-4 w-4 animate-bounce rounded-full bg-light-button-primary [animation-delay:.7s] dark:bg-dark-button-primary"></div>
      </div>
    </div>
  );
}
