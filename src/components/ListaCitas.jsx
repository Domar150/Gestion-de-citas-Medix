// ListaCitas.jsx
// Muestra un listado (grid) de tarjetas <Cita />.
// Si hay al menos una, pinta el título "Pacientes Registrados".
// Recibe desde el padre: el array de citas y las funciones para eliminar/actualizar.

import styles from './ListaCita.module.css';
import Cita from './Cita'; // Importa el componente Cita

function ListaCitas({ citas, eliminarCita, actualizarCita }) {
  return (
    <div className={styles.container}>
      {/* Título condicional: solo aparece si existen registros */}
      {citas.length > 0 && (
        <h2 className={styles.titulo}>Pacientes Registrados</h2>
      )}

      {/* Grid de tarjetas. Cada cita se renderiza con su propia <Cita /> */}
      <div className={styles.grid}>
        {citas.map((cita) => (
          <Cita
            key={cita.id}                 // key única para que React identifique este ítem
            cita={cita}                   // datos de la cita/paciente
            eliminarCita={eliminarCita}   // callback para borrar (viene del padre)
            actualizarCita={actualizarCita} // callback para editar/guardar (viene del padre)
          />
        ))}
      </div>
    </div>
  );
}

export default ListaCitas;
