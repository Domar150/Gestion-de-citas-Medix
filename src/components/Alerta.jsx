// Alertas para mostrar mensajes al usuario

//Aqui se importan los hooks de React y los estilos del componente
import { useEffect, useState } from 'react';
import styles from './Alerta.module.css';

// Componente Alerta que recibe un mensaje, tipo y una función onClose
// El mensaje se muestra durante 3 segundos y luego desaparece
function Alerta({ mensaje, tipo, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (mensaje) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 3000); // La alerta desaparece después de 3 segundos
      return () => clearTimeout(timer);
    }
  }, [mensaje, onClose]);

  if (!visible) return null;

  return (
    <div className={`${styles.alerta} ${styles[tipo]}`}>
      <span className={styles.mensaje}>{mensaje}</span>
    </div>
  );
}

export default Alerta;