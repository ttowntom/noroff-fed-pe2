import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import { clearLocal } from "../utils/localStorage";

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
