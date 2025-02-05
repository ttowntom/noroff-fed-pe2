import { NavLink } from "react-router-dom";

/**
 * Navigation link component for main menu items with consistent styling
 * @component
 * @param {Object} props
 * @param {string} props.to - Route path to navigate to
 * @param {string} props.desc - Link description/text to display
 * @param {Function} props.onClose - Callback function to close menu when link is clicked
 * @returns {JSX.Element} Styled navigation link item
 *
 * @example
 * <MainMenuNavLink
 *   to="profile/username"
 *   desc="Profile"
 *   onClose={() => setMenuOpen(false)}
 * />
 */
export default function MainMenuNavLink({ to, desc, onClose }) {
  const handleClick = () => {
    onClose();
  };

  return (
    <li className="w-full bg-light-bg-primary py-2 pl-4 hover:bg-light-bg-secondary dark:bg-dark-bg-secondary dark:hover:bg-dark-bg-primary">
      <NavLink
        to={`/${to}`}
        onClick={handleClick}
        className="block text-light-text-primary dark:text-dark-text-primary"
      >
        {desc}
      </NavLink>
    </li>
  );
}
