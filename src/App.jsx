import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Formulario from './components/Formulario';
import ListaCitas from './components/ListaCitas';
import Alerta from './components/Alerta';
import ThemeToggle from './components/ThemeToggle';

import './components/theme.css'; // << variables globales (light/dark)
import './App.css';

function App() {
  const [citas, setCitas] = useState(() => {
    const local = localStorage.getItem('citas');
    return local ? JSON.parse(local) : [];
  });

  const [alerta, setAlerta] = useState({ mensaje: '', tipo: '' });

  useEffect(() => {
    localStorage.setItem('citas', JSON.stringify(citas));
  }, [citas]);

  const agregarCita = (cita) => {
    const nuevaCita = { ...cita, id: Date.now() };
    setCitas([...citas, nuevaCita]);
    setAlerta({ mensaje: 'Paciente registrado', tipo: 'exito' });
  };

  const eliminarCita = (id) => {
    setCitas(citas.filter((c) => c.id !== id));
    setAlerta({ mensaje: 'Paciente eliminado', tipo: 'exito' });
  };

  const actualizarCita = (id, nuevaCita) => {
    const citasActualizadas = citas.map((cita) =>
      cita.id === id ? { ...cita, ...nuevaCita } : cita
    );
    setCitas(citasActualizadas);
    setAlerta({ mensaje: 'Paciente modificado', tipo: 'exito' });
  };

  const cerrarAlerta = () => setAlerta({ mensaje: '', tipo: '' });

  return (
    <div className="container">
      <Header />
      <main className="main">
        <Formulario agregarCita={agregarCita} />
        <ListaCitas
          citas={citas}
          eliminarCita={eliminarCita}
          actualizarCita={actualizarCita}
        />
      </main>
      <Alerta mensaje={alerta.mensaje} tipo={alerta.tipo} onClose={cerrarAlerta} />
      <ThemeToggle />
      <Footer />
    </div>
  );
}

export default App;
