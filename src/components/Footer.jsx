// Footer.jsx
// Pie de página simple con el año actual y el autor.
// new Date().getFullYear() evita tener que actualizar el año manualmente.

function Footer() {
  return (
    <footer>
      <p>© {new Date().getFullYear()} Diomar Farid Ibarra Ramírez</p>
    </footer>
  );
}

export default Footer;
