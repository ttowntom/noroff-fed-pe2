import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

/**
 * Alert component for displaying notifications and error messages
 * @component
 * @param {Object} props
 * @param {NotificationType} [props.type] - Visual style variant
 * @param {React.ReactNode} props.children - Notification content
 * @param {Object} props.props - Additional props to spread
 * @returns {JSX.Element} Styled notification message
 *
 * @example
 * // Error notification
 * <Notification type="error">
 *   Invalid email address
 * </Notification>
 *
 * // Info notification
 * <Notification>
 *   Your changes have been saved
 * </Notification>
 */
export default function Notification({ type, children, ...props }) {
  let styles = "w-full rounded px-4 py-4 flex gap-2 items-center";

  if (type === "error") {
    styles +=
      " border border-light-border-error dark:border-dark-border-error text-light-text-error dark:text-dark-text-error-dark bg-light-bg-error dark:bg-dark-bg-error";
  } else {
    styles += " border text-text-primary dark:text-text-primary-dark ";
  }

  return (
    <div className={styles} {...props}>
      <FontAwesomeIcon
        icon={byPrefixAndName.fas["circle-exclamation"]}
        className="text-xl"
      />
      {children}
    </div>
  );
}
