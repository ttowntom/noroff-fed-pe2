import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

import LinkButton from "../components/LinkButton";

export default function Error() {
  return (
    <section className="mx-auto mt-12 flex flex-col items-center gap-6 text-light-text-primary dark:text-dark-text-primary">
      <FontAwesomeIcon
        icon={byPrefixAndName.fas["circle-xmark"]}
        className="text-9xl text-color-system-error-red"
      />
      <h3 className="text-navy text-4xl font-semibold">Page Not Found</h3>
      <p className="mb-6 max-w-[45ch] text-center">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <LinkButton to="/">
        <FontAwesomeIcon
          icon={byPrefixAndName.fas["chevron-left"]}
          className="mr-4 text-sm"
        />
        Go Back to the Venues
      </LinkButton>
    </section>
  );
}
