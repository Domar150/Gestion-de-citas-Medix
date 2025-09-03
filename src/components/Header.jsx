// Header.jsx
// Encabezado fijo con logo e identidad de la app/clinica.
// Usa un favicon como imagen (logo) y dos textos: título y subtítulo.

import styles from './Header.module.css';
import logo from '/favicon.png';

function Header() {
  return (
    <header className={styles.header}>
      {/* Logo de la app */}
      <img src={logo} alt="Logo" className={styles.logo} />

      {/* Contenedor de textos (título + subtítulo) */}
      <div className={styles['text-container']}>
        <div className={styles.title}>CLÍNICA MEDIX</div>
        <div className={styles.subtitle}>Tu salud es lo primero</div>
      </div>
    </header>
  );
}

export default Header;
