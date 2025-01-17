import { saveLocal, loadLocal } from "./localStorage";

export default function toggleTheme(theme, setTheme) {
  let user = loadLocal("user");

  const newTheme = theme === "light" ? "dark" : "light";
  setTheme(newTheme);

  if (newTheme === "dark") {
    document.documentElement.classList.add("dark");
    saveLocal("user", { ...user, preferredTheme: "dark" });
  } else {
    document.documentElement.classList.remove("dark");
    saveLocal("user", { ...user, preferredTheme: "light" });
  }
}
