import { saveLocal, loadLocal } from "./localStorage";

/**
 * Toggles theme between light/dark and persists to localStorage
 * @param {Theme} theme - Current theme value
 * @param {Function} setTheme - Theme state setter function
 *
 * @example
 * // In a React component
 * const [theme, setTheme] = useState('light');
 *
 * // Toggle theme
 * <button onClick={() => toggleTheme(theme, setTheme)}>
 *   Toggle Theme
 * </button>
 */
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
