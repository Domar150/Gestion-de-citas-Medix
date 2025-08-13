//Aqui se aplica la logica de poner los datos de la cita en una tarjeta para editar

import { useState } from 'react';
import styles from './Cita.module.css';

function Cita({ cita, eliminarCita, actualizarCita }) {
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

  const [editando, setEditando] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardar = () => {
    actualizarCita(id, formData);
    setEditando(false);
  };

  return (
    <div className={styles.citaCard}>
      {editando ? (
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
      <button onClick={() => eliminarCita(id)}>Eliminar</button>
    </div>
  );
}

export default Cita;
