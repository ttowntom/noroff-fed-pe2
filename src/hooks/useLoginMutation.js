import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";

import { postFn } from "../utils/http";
import { saveLocal } from "../utils/localStorage";
import useUserStore from "../store/userStore";

/**
 * Custom hook for handling user login mutations
 * @function useLoginMutation
 * @returns {Object} React Query mutation object
 * @property {Function} mutate - Function to trigger login
 * @property {boolean} isLoading - Loading state
 * @property {Object|null} error - Error object if login failed
 * @property {boolean} isSuccess - Whether login succeeded
 *
 * @example
 * function LoginForm() {
 *   const loginMutation = useLoginMutation();
 *
 *   const handleSubmit = (credentials) => {
 *     loginMutation.mutate(credentials);
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       {loginMutation.isLoading && <p>Logging in...</p>}
 *       {loginMutation.error && <p>Error: {loginMutation.error.message}</p>}
 *     </form>
 *   );
 * }
 */
export function useLoginMutation() {
  const navigate = useNavigate();
  const location = useLocation();
  const loginUser = useUserStore((state) => state.login);
  const baseUrl = import.meta.env.BASE_URL;

  let userData = {};

  return useMutation({
    mutationFn: (body) => postFn({ url: "/auth/login?_holidaze=true", body }),
    onSuccess: (data) => {
      userData = {
        token: data.data.accessToken,
        name: data.data.name,
        email: data.data.email,
        avatar: data.data.avatar.url,
        venueManager: data.data.venueManager,
        preferredTheme: "light",
      };
      loginUser(userData);
      saveLocal("user", userData);

      // Use saved 'from' or default to home
      const from = location.state?.from || "/";
      const cleanPath = from.replace(new RegExp(`^${baseUrl}`), "");
      const redirectPath = cleanPath.startsWith("/")
        ? cleanPath
        : `/${cleanPath}`;
      navigate(redirectPath, { replace: true });
    },
  });
}
