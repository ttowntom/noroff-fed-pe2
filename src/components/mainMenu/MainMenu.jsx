import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";
import { motion, AnimatePresence } from "framer-motion";

import { useLogout } from "../../hooks/useLogout";
import useUserStore from "../../store/userStore";
import toggleTheme from "../../utils/toggleTheme.js";

import MainMenuNavLink from "./NavLink";

/**
 * MainMenu component that displays a navigation menu with user-specific links and actions
 * @component
 * @param {Object} props
 * @param {boolean} props.isOpen - Indicates if the menu is open
 * @param {Function} props.onClose - Function to close the menu
 */
export default function MainMenu({ isOpen, onClose }) {
  const user = useUserStore((state) => state.user);
  const theme = useUserStore((state) => state.theme);
  const setTheme = useUserStore((state) => state.setTheme);
  const handleLogout = useLogout(onClose);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  function handleToggleTheme() {
    toggleTheme(theme, setTheme);
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          ref={menuRef}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute right-0 top-16 w-full overflow-hidden rounded-lg border border-light-border-secondary bg-light-bg-primary shadow-lg dark:border-dark-border-tertiary dark:bg-dark-bg-secondary sm:right-4 sm:w-80"
        >
          <ul className="py-2">
            <MainMenuNavLink
              to={`profile/${user?.name}`}
              desc="Profile"
              onClose={onClose}
            />
            <MainMenuNavLink
              to={`profile/${user?.name}/bookings`}
              desc="Bookings"
              onClose={onClose}
            />
            <MainMenuNavLink
              to={`profile/${user?.name}/venue-manager`}
              desc="Venue Manager"
              onClose={onClose}
            />

            <hr className="border-light-border-secondary dark:border-dark-border-tertiary" />
            <div className="flex w-full cursor-default items-center justify-between bg-light-bg-primary px-4 py-3 hover:bg-light-bg-secondary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:hover:bg-dark-bg-primary">
              <p>Toggle Dark Mode</p>
              <button onClick={handleToggleTheme}>
                {theme === "dark" ? (
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas["toggle-on"]}
                    aria-label="Toggle Dark Mode On"
                    className="text-2xl"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fat["toggle-off"]}
                    aria-label="Toggle Dark Mode Off"
                    className="text-2xl"
                  />
                )}
              </button>
            </div>
            <hr className="border-light-border-secondary dark:border-dark-border-tertiary" />
            <li className="w-full bg-light-bg-primary py-2 pl-4 hover:bg-light-bg-secondary dark:bg-dark-bg-secondary dark:hover:bg-dark-bg-primary">
              <button
                onClick={handleLogout}
                className="block text-light-text-primary dark:text-dark-text-primary"
              >
                Log Out
              </button>
            </li>
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
