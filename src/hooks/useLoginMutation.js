import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { postFn } from "../utils/http";
import { saveLocal } from "../utils/localStorage";
import useUserStore from "../store/userStore";

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
