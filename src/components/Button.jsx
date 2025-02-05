/**
 * Reusable button component with configurable styles
 * @component
 * @param {Object} props
 * @param {Function} [props.onClick] - Click event handler
 * @param {React.ReactNode} props.children - Button content
 * @param {'button'|'submit'|'reset'} [props.type='button'] - Button type attribute
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {ButtonVariant} [props.variant='primary'] - Visual style variant
 * @returns {JSX.Element} Styled button element
 *
 * @example
 * // Primary button (default)
 * <Button onClick={() => console.log('clicked')}>Click me</Button>
 *
 * // Secondary button
 * <Button variant="secondary">Cancel</Button>
 *
 * // Danger button
 * <Button variant="danger" onClick={handleDelete}>Delete</Button>
 *
 * // Submit button
 * <Button type="submit">Save Changes</Button>
 */
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
    danger:
      "bg-color-system-error-red text-color-neutral-white focus:outline-none focus:ring-1 focus:ring-dark-border-tertiary ",
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
