import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

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
      <p>{children}</p>
    </div>
  );
}
