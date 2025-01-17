import { create } from "zustand";

import { loadLocal } from "../utils/localStorage";

const useUserStore = create((set) => ({
  user: loadLocal("user") || null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  theme: loadLocal("user").preferredTheme || "light",
  setTheme: (theme) => set({ theme }),
}));

export default useUserStore;
