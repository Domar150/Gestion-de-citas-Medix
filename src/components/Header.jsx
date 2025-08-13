//Estructura del componente Header
// Este componente muestra el encabezado de la aplicación con un logo y un título

import styles from './Header.module.css';
import logo from '/favicon.png';

function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <div className={styles['text-container']}>
        <div className={styles.title}>CLÍNICA MEDIX</div>
        <div className={styles.subtitle}>Tu salud es lo primero</div>
      </div>
    </header>
  );
}

export default Header;
