import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";
import { useLogout } from "../../hooks/useLogout";
import useUserStore from "../../store/userStore";
import MainMenuNavLink from "./NavLink";
import toggleTheme from "../../utils/toggleTheme.js";

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
  }

  return (
    <nav
      ref={menuRef}
      className={`${
        isOpen ? "block" : "hidden"
      } absolute right-0 top-16 w-full overflow-hidden rounded-lg border border-light-border-secondary bg-light-bg-primary shadow-lg dark:border-dark-border-tertiary dark:bg-dark-bg-secondary sm:right-4 sm:w-80`}
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
          to="venue-manager"
          desc="Venue Manager"
          onClose={onClose}
        />
        <MainMenuNavLink to="login" desc="Login" onClose={onClose} />
        <MainMenuNavLink to="signup" desc="Sign Up" onClose={onClose} />
        <hr className="border-light-border-secondary dark:border-dark-border-tertiary" />
        <div className="flex w-full cursor-default items-center justify-between bg-light-bg-primary px-4 py-3 hover:bg-light-bg-secondary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:hover:bg-dark-bg-primary">
          <p>Toggle Dark Mode</p>
          <button onClick={handleToggleTheme}>
            {theme === "dark" ? (
              <FontAwesomeIcon
                icon={byPrefixAndName.fas["toggle-on"]}
                className="text-2xl"
              />
            ) : (
              <FontAwesomeIcon
                icon={byPrefixAndName.fat["toggle-off"]}
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
    </nav>
  );
}
