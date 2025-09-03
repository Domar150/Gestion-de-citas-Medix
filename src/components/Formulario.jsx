// Formulario.jsx
// Formulario para crear una nueva cita. Calcula la edad a partir de la fecha de nacimiento
// y genera automáticamente una fecha/hora de cita futura aleatoria.

import { useState } from 'react';
import styles from './Formulario.module.css';

function Formulario({ agregarCita }) {
  // Estado con los campos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    fechaNacimiento: '',
    sexo: '',
    email: '',
    motivo: '',
  });

  // Dado un string "YYYY-MM-DD", calcula la edad actual
  const calcularEdad = (fecha) => {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    // Si aún no ha pasado el cumpleaños de este año, restamos uno
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  // Genera una fecha entre 1 y 7 días hacia adelante
  // y una hora dentro de la franja 9:00 a 18:00 (en formato 12h para mostrar)
  const generarFechaHora = () => {
    const fecha = new Date();

    // Sumamos un número aleatorio de días (1..7)
    fecha.setDate(fecha.getDate() + Math.floor(Math.random() * 7) + 1);

    // Hora aleatoria en formato 24h entre 9 y 17 (inclusivo), y minutos en 00
    const hora24 = Math.floor(Math.random() * (18 - 9) + 9);
    fecha.setHours(hora24, 0, 0, 0);

    // Formato amigable hh:mm AM/PM para mostrar
    const horaFormateada = fecha.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return {
      fechaCita: fecha.toISOString().split('T')[0], // YYYY-MM-DD para guardar
      horaCita: horaFormateada,                      // para mostrar
    };
  };

  // Maneja cualquier cambio de input/select
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Al enviar, calculamos edad y generamos fecha/hora de la cita
  const handleSubmit = (e) => {
    e.preventDefault();

    const edad = calcularEdad(formData.fechaNacimiento);
    const { fechaCita, horaCita } = generarFechaHora();

    // Armamos el objeto cita y lo enviamos al padre
    agregarCita({
      id: Date.now(),  // id simple basado en timestamp
      ...formData,
      edad,
      fechaCita,
      horaCita,
    });

    // Reseteamos el formulario
    setFormData({
      nombre: '',
      fechaNacimiento: '',
      sexo: '',
      email: '',
      motivo: '',
    });
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Agendar Nueva Cita</h2>

      {/* onSubmit dispara la creación de la cita */}
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div>
          <label className={styles.label}>Nombre completo:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div>
          <label className={styles.label}>Fecha de nacimiento:</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            className={styles.input}
            required
          />
          {/* Muestra la edad en vivo cuando ya se eligió la fecha */}
          <p>
            Edad: {formData.fechaNacimiento && calcularEdad(formData.fechaNacimiento)} años
          </p>
        </div>

        <div>
          <label className={styles.label}>Sexo:</label>
          <select
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            className={styles.select}
            required
          >
            <option value="">Selecciona</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div>
          <label className={styles.label}>Motivo de la cita:</label>
          <input
            type="text"
            name="motivo"
            value={formData.motivo}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Agendar cita
        </button>
      </form>
    </section>
  );
}

export default Formulario;