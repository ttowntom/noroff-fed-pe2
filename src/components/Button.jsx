export default function Button({ onClick, children, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="rounded-full bg-light-button-primary p-2 px-4 text-color-neutral-white focus:outline-none focus:ring-1 focus:ring-dark-border-tertiary dark:bg-dark-button-primary dark:text-dark-text-primary dark:focus:ring-dark-border-primary"
    >
      {children}
    </button>
  );
}
