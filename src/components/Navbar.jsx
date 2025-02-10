import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

import useUserStore from "../store/userStore";
import { NO_USER_IMG_URL } from "../constants.js";

import MainMenu from "./mainMenu/MainMenu";
import LinkButton from "./LinkButton.jsx";

/**
 * Navigation bar component with responsive menu and authentication state
 * @component
 * @param {Object} props
 * @param {User} props.user - Current user object
 * @param {boolean} props.isLoggedIn - Authentication state
 * @returns {JSX.Element} Navigation bar with logo, links and user menu
 *
 * @example
 * function App() {
 *   const { user, isLoggedIn } = useUserStore();
 *
 *   return (
 *     <>
 *       <Navbar user={user} isLoggedIn={isLoggedIn} />
 *       <main>Content</main>
 *     </>
 *   );
 * }
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useUserStore((state) => state.user);

  let avatar;
  if (
    user &&
    user.avatar ===
      "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400"
  ) {
    avatar = NO_USER_IMG_URL;
  } else if (user) {
    avatar = user.avatar;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative z-20 mx-auto w-full max-w-[1536px] space-y-4 bg-light-bg-primary px-2 pb-0 pt-4 dark:bg-dark-bg-secondary sm:px-4">
      <div className="flex items-center justify-between gap-2">
        <Link to="/">
          <img
            src={`${import.meta.env.BASE_URL}/holidazeLogo.svg`}
            alt="Holidaze Logo"
            className="w-28"
          />
        </Link>
        {/* Not logged in */}
        {!user && (
          <div className="flex flex-col items-center space-x-4 xs:flex-row">
            <Link
              to="/signup"
              className="text-light-link-primary hover:underline dark:text-dark-link-primary"
            >
              Sign up
            </Link>
            <LinkButton to="/login">Log in</LinkButton>
          </div>
        )}
        {/* Logged in */}
        {user && (
          <button
            onClick={toggleMenu}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleMenu();
              }
            }}
            aria-expanded={isMenuOpen}
            aria-controls="main-menu"
            aria-label="Toggle menu"
            className="flex space-x-4 rounded-full border border-light-border-secondary bg-light-bg-primary px-4 py-2 hover:cursor-pointer hover:shadow-md dark:border-dark-border-tertiary dark:bg-dark-bg-primary dark:hover:bg-color-neutral-neutral-darkest"
          >
            <FontAwesomeIcon
              icon={byPrefixAndName.fas["bars"]}
              aria-hidden="true"
              className="text-light-text-primary dark:text-dark-text-primary"
            />
            {user != null ? (
              <img
                src={avatar}
                alt={user.name}
                aria-hidden="true"
                className="h-4 w-4 rounded-full object-cover"
              />
            ) : (
              <FontAwesomeIcon
                icon={byPrefixAndName.fas["circle-user"]}
                aria-hidden="true"
                className="text-light-text-primary dark:text-dark-text-primary"
              />
            )}
          </button>
        )}
        <MainMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
      {/* Diagonal */}
      <div className="absolute inset-0 top-5 -z-10 h-8 skew-y-[0.5deg] transform bg-gradient-to-r from-light-bg-primary to-light-bg-primary shadow-md dark:from-dark-bg-secondary dark:to-dark-bg-secondary dark:shadow-none"></div>
    </header>
  );
}
