import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faYoutube,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="relative z-10 mx-auto w-full max-w-[1536px] space-y-4 bg-light-bg-alternate px-2 py-8 dark:bg-dark-bg-secondary sm:px-4">
      <div className="absolute inset-0 -top-12 -z-10 h-44 skew-y-[-3deg] transform bg-gradient-to-r from-light-bg-alternate to-light-bg-alternate dark:from-dark-bg-secondary dark:to-dark-bg-secondary"></div>
      <div>
        <img src="/holidazeLogo.svg" alt="Holidaze Logo" className="w-32" />
      </div>
      <div className="flex flex-col gap-4 pb-6 text-light-text-alternate dark:text-dark-text-primary sm:flex-row sm:gap-[10vw]">
        <div>
          <h2 className="mb-2 font-semibold">Address:</h2>
          <p>25 Wooded Drive</p>
          <p>1092 Wintertown</p>
          <p>Norway</p>
        </div>
        <div>
          <h2 className="mb-2 font-semibold">Contact:</h2>
          <p>
            <a
              className="text-dark-link-primary underline hover:no-underline"
              href="tel:18001234567"
            >
              1800 123 4567
            </a>
          </p>
          <p>
            <a
              className="text-dark-link-primary underline hover:no-underline"
              href="mailto:info@holidaze.com"
            >
              info@holidaze.com
            </a>
          </p>
          <div className="mt-4 flex gap-4">
            <a href="#">
              <FontAwesomeIcon
                icon={faFacebook}
                className="hover:text-color-neutral-neutral-lighter"
              />
            </a>
            <a href="#">
              <FontAwesomeIcon
                icon={faInstagram}
                className="hover:text-color-neutral-neutral-lighter"
              />
            </a>
            <a href="#">
              <FontAwesomeIcon
                icon={faXTwitter}
                className="hover:text-color-neutral-neutral-lighter"
              />
            </a>
            <a href="#">
              <FontAwesomeIcon
                icon={faLinkedin}
                className="hover:text-color-neutral-neutral-lighter"
              />
            </a>
            <a href="#">
              <FontAwesomeIcon
                icon={faYoutube}
                className="hover:text-color-neutral-neutral-lighter"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Link
            to="/"
            className="font-medium text-dark-link-primary hover:underline"
          >
            Venues
          </Link>
          <Link
            to="/contact"
            className="font-medium text-dark-link-primary hover:underline"
          >
            Contact Us
          </Link>
        </div>
      </div>
      <div>
        <hr className="border-t border-light-border-alternate py-2 dark:border-dark-border-primary" />
      </div>
      <div>
        <div className="flex flex-col-reverse gap-8 text-sm sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-6 text-light-text-alternate dark:text-dark-text-primary">
            <p>© 2025 Holidaze. All rights reserved.</p>
            <p className="font-medium">
              Holidaze is a fictional company. This website and it’s content is
              created as a project for Noroff.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/#"
              className="text-dark-link-primary underline hover:no-underline"
            >
              Privacy Policy
            </Link>
            <Link
              to="/#"
              className="text-dark-link-primary underline hover:no-underline"
            >
              Terms of Use
            </Link>
            <Link
              to="/#"
              className="text-dark-link-primary underline hover:no-underline"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
