export default function Button({
  onClick,
  children,
  type = "button",
  disabled = false,
  variant = "primary",
}) {
  const globalStyle = "rounded-full p-2 px-4 hover:opacity-80 ";
  const style = {
    primary:
      "bg-light-button-primary text-light-text-alternate focus:outline-none focus:ring-1 focus:ring-dark-border-tertiary dark:bg-dark-button-primary dark:text-dark-text-primary dark:focus:ring-dark-border-primary",
    secondary:
      "border border-light-link-primary bg-light-bg-primary text-light-link-primary dark:border-dark-link-primary dark:bg-dark-bg-primary dark:text-dark-link-primary hover:font-semibold",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${globalStyle} ${style[variant]}`}
    >
      {children}
    </button>
  );
}
