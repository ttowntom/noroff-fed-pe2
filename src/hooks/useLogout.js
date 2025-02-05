import { useNavigate } from "react-router-dom";

import useUserStore from "../store/userStore";
import { clearLocal } from "../utils/localStorage";

/**
 * Custom hook that provides a logout function to handle user logout flow
 * @function useLogout
 * @param {Function} [onClose] - Optional callback function to execute after logout (closing modals/menus)
 * @returns {Function} Logout handler function that clears local storage, user state and navigates to home
 */
export function useLogout(onClose) {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    clearLocal();
    logout();
    navigate("/");
    if (onClose) {
      onClose();
    }
  };

  return handleLogout;
}
