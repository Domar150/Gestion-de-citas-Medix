import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <button
      onClick={toggle}
      className={styles.themeToggleBtn}
      aria-pressed={theme === "dark"}
      title={theme === "dark" ? "Cambiar a modo claro" : "Activar modo nocturno"}
    >
      {theme === "dark" ? "☀️ Claro" : "🌙 Nocturno"}
    </button>
  );
}
