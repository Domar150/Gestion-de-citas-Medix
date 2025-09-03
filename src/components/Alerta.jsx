// Alerta.jsx
// Componente pequeño para mostrar un mensaje temporal (éxito/error) en pantalla.
// Muestra la alerta por 3 segundos cuando recibe un "mensaje" y luego la oculta automáticamente.

import { useEffect, useState } from 'react';
import styles from './Alerta.module.css';

// Props esperadas:
// - mensaje: texto a mostrar (string)
// - tipo: "exito" | "error" (para elegir estilos)
// - onClose: función que se llama cuando la alerta se oculta (para limpiar el estado en el padre)
function Alerta({ mensaje, tipo, onClose }) {
  // Controla si la alerta se ve o no
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Cada vez que llegue un mensaje nuevo:
    if (mensaje) {
      setVisible(true); // la mostramos

      // Programamos un temporizador para ocultarla
      const timer = setTimeout(() => {
        setVisible(false); // la escondemos
        onClose();         // avisamos al padre que ya puede limpiar su estado
      }, 3000); // 3 segundos visibles

      // Limpieza por si el componente se desmonta o cambia el mensaje
      return () => clearTimeout(timer);
    }
  }, [mensaje, onClose]);

  // Si no hay nada que mostrar, no renderizamos nada
  if (!visible) return null;

  // Pintamos el contenedor con clase general + variante por tipo
  return (
    <div className={`${styles.alerta} ${styles[tipo]}`}>
      <span className={styles.mensaje}>{mensaje}</span>
    </div>
  );
}

export default Alerta;
