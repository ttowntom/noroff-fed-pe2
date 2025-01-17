import { NavLink } from "react-router-dom";

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
