import { useState } from 'react';
import styles from './Formulario.module.css';

function Formulario({ agregarCita }) {
  const [formData, setFormData] = useState({
    nombre: '',
    fechaNacimiento: '',
    sexo: '',
    email: '',
    motivo: '',
  });

  const calcularEdad = (fecha) => {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const generarFechaHora = () => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + Math.floor(Math.random() * 7) + 1);

    const hora24 = Math.floor(Math.random() * (18 - 9) + 9);
    fecha.setHours(hora24, 0, 0, 0);

    const horaFormateada = fecha.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return {
      fechaCita: fecha.toISOString().split('T')[0],
      horaCita: horaFormateada,
    };
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const edad = calcularEdad(formData.fechaNacimiento);
    const { fechaCita, horaCita } = generarFechaHora();

    agregarCita({
      id: Date.now(),
      ...formData,
      edad,
      fechaCita,
      horaCita,
    });

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
          <p>
            Edad:{' '}
            {formData.fechaNacimiento && calcularEdad(formData.fechaNacimiento)} años
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
