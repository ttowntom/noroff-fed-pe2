import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";
import MainMenu from "./mainMenu/MainMenu";
import useUserStore from "../store/userStore";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useUserStore((state) => state.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative z-20 mx-auto w-full max-w-[1536px] space-y-4 bg-light-bg-primary px-2 pb-0 pt-4 dark:bg-dark-bg-secondary sm:px-4">
      <div className="flex items-center justify-between gap-2">
        <Link to="/">
          <img src="/holidazeLogo.svg" alt="Holidaze Logo" className="w-28" />
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
            <Link
              to="/login"
              className="font-medium text-light-link-primary hover:underline dark:text-dark-link-primary xs:rounded-full xs:border xs:border-light-border-secondary xs:bg-light-button-primary xs:px-4 xs:py-2 xs:font-normal xs:text-light-text-alternate xs:hover:cursor-pointer xs:hover:bg-light-button-border-primary xs:hover:shadow-md xs:dark:border-dark-border-primary xs:dark:bg-dark-bg-primary xs:dark:text-dark-text-primary xs:dark:hover:bg-color-neutral-neutral-darkest"
            >
              Log in
            </Link>
          </div>
        )}
        {/* Logged in */}
        {user && (
          <div
            onClick={toggleMenu}
            className="flex space-x-4 rounded-full border border-light-border-secondary bg-light-bg-primary px-4 py-2 hover:cursor-pointer hover:shadow-md dark:border-dark-border-tertiary dark:bg-dark-bg-primary dark:hover:bg-color-neutral-neutral-darkest"
          >
            <FontAwesomeIcon
              icon={byPrefixAndName.fas["bars"]}
              className="text-light-text-primary dark:text-dark-text-primary"
            />
            {user != null ? (
              <img src={user.avatar} className="h-4 w-4 rounded-full" />
            ) : (
              <FontAwesomeIcon
                icon={byPrefixAndName.fas["circle-user"]}
                className="text-light-text-primary dark:text-dark-text-primary"
              />
            )}
          </div>
        )}
        <MainMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
      {/* Diagonal */}
      <div className="absolute inset-0 top-5 -z-10 h-8 skew-y-[0.5deg] transform bg-gradient-to-r from-light-bg-primary to-light-bg-primary shadow-md dark:from-dark-bg-secondary dark:to-dark-bg-secondary dark:shadow-none"></div>
    </header>
  );
}
