import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Formulario from './components/Formulario';
import ListaCitas from './components/ListaCitas';
import Alerta from './components/Alerta';
import ThemeToggle from './components/ThemeToggle';
import ApiDemo from './components/ApiDemo';
import MedixData from './components/MedixData';

import './components/theme.css';
import './App.css';

export default function App() {
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
    setCitas(prev => [...prev, nuevaCita]);
    setAlerta({ mensaje: 'Paciente registrado', tipo: 'exito' });
  };

  const eliminarCita = (id) => {
    setCitas(prev => prev.filter(c => c.id !== id));
    setAlerta({ mensaje: 'Paciente eliminado', tipo: 'exito' });
  };

  const actualizarCita = (id, nuevaCita) => {
    setCitas(prev => prev.map(c => c.id === id ? { ...c, ...nuevaCita } : c));
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

      <section style={{ marginTop: 24 }}>
        <ApiDemo />
      </section>

      <section style={{ marginTop: 24 }}>
        <MedixData />
      </section>

      <Alerta mensaje={alerta.mensaje} tipo={alerta.tipo} onClose={cerrarAlerta} />
      <ThemeToggle />
      <Footer />
    </div>
  );
}