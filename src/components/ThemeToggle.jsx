// ThemeToggle.jsx
// Botón flotante para alternar entre modo claro/oscuro.
// - Guarda la preferencia en localStorage para persistir entre recargas.
// - Aplica el tema seteando el atributo data-theme en <html>.

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  // Estado inicial: intenta leer el último tema guardado, si no, "light"
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Cuando cambia "theme", lo aplicamos en el atributo de <html>
    document.documentElement.setAttribute("data-theme", theme);
    // Persistimos la preferencia para próximas visitas
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Cambia entre "light" y "dark"
  const toggle = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <button
      onClick={toggle}                         // clic = alternar tema
      className={styles.themeToggleBtn}        // estilos del botón
      aria-pressed={theme === "dark"}          // accesibilidad: indica estado “activado” para dark
      title={theme === "dark" ? "Cambiar a modo claro" : "Activar modo nocturno"} // tooltip útil
    >
      {/* Etiqueta amigable con icono según el tema actual */}
      {theme === "dark" ? "☀️ Claro" : "🌙 Nocturno"}
    </button>
  );
}
