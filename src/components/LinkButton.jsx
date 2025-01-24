import { Link } from "react-router-dom";

export default function LinkButton({ to, children }) {
  return (
    <Link
      to={to}
      className="rounded-full bg-light-button-primary p-2 px-4 text-center text-color-neutral-white hover:opacity-85 focus:outline-none focus:ring-1 focus:ring-dark-border-tertiary dark:bg-dark-button-primary dark:text-dark-text-primary dark:focus:ring-dark-border-primary"
    >
      {children}
    </Link>
  );
}
