import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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
  const loginUser = useUserStore((state) => state.login);

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

      navigate("/");
    },
  });
}
