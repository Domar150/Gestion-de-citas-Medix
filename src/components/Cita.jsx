// Cita.jsx
// Tarjeta que muestra los datos de una cita/paciente.
// Permite alternar entre modo lectura y edición para actualizar la información.

import { useState } from 'react';
import styles from './Cita.module.css';

function Cita({ cita, eliminarCita, actualizarCita }) {
  // Desestructuramos la cita que llega por props
  const {
    id,
    nombre: initialNombre,
    fechaNacimiento: initialFechaNacimiento,
    edad: initialEdad,
    sexo: initialSexo,
    email: initialEmail,
    motivo: initialMotivo,
    fechaCita: initialFechaCita,
    horaCita: initialHoraCita,
  } = cita;

  // Estado para saber si estamos editando o solo viendo
  const [editando, setEditando] = useState(false);

  // Copia editable de los campos de la cita
  const [formData, setFormData] = useState({
    nombre: initialNombre,
    fechaNacimiento: initialFechaNacimiento,
    edad: initialEdad,
    sexo: initialSexo,
    email: initialEmail,
    motivo: initialMotivo,
    fechaCita: initialFechaCita,
    horaCita: initialHoraCita,
  });

  // Maneja cambios de cualquier input (por nombre del campo)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Guarda cambios: llama al padre con la info nueva y vuelve a modo lectura
  const handleGuardar = () => {
    actualizarCita(id, formData);
    setEditando(false);
  };

  return (
    <div className={styles.citaCard}>
      {editando ? (
        // Modo edición: mostramos inputs para todos los campos
        <>
          <input name="nombre" value={formData.nombre} onChange={handleChange} />
          <input name="edad" value={formData.edad} onChange={handleChange} />
          <input name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
          <input name="sexo" value={formData.sexo} onChange={handleChange} />
          <input name="email" value={formData.email} onChange={handleChange} />
          <input name="motivo" value={formData.motivo} onChange={handleChange} />
          <input name="fechaCita" value={formData.fechaCita} onChange={handleChange} />
          <input name="horaCita" value={formData.horaCita} onChange={handleChange} />
          <button onClick={handleGuardar}>Guardar</button>
        </>
      ) : (
        // Modo lectura: mostramos la información en texto
        <>
          <h3>{formData.nombre}</h3>
          <p><strong>Edad:</strong> {formData.edad} años</p>
          <p><strong>Fecha de nacimiento:</strong> {formData.fechaNacimiento}</p>
          <p><strong>Sexo:</strong> {formData.sexo}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Motivo:</strong> {formData.motivo}</p>
          <p><strong>Fecha de la cita:</strong> {formData.fechaCita}</p>
          <p><strong>Hora:</strong> {formData.horaCita}</p>
          <button onClick={() => setEditando(true)}>Modificar</button>
        </>
      )}
      {/* Eliminar está disponible en ambos modos */}
      <button onClick={() => eliminarCita(id)}>Eliminar</button>
    </div>
  );
}

export default Cita;
