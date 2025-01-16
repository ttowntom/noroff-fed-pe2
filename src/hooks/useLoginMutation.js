import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { postFn } from "../utils/http";
import { saveLocal } from "../utils/localStorage";

export function useLoginMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body) => postFn({ url: "/auth/login", body }),
    onSuccess: (data) => {
      console.log(data);
      saveLocal("user", {
        token: data.data.accessToken,
        name: data.data.name,
        email: data.data.email,
        preferredTheme: "light",
      });
      navigate("/");
    },
  });
}
