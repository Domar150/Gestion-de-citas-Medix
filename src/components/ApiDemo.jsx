import { useEffect, useState } from "react";
import {
  crearUsuario, listarUsuarios,
  listarTareas, crearTarea, actualizarTarea, eliminarTarea
} from "../lib/api";

export default function ApiDemo(){
  const [usuarios, setUsuarios] = useState([]);
  const [sel, setSel] = useState(null);   // userId seleccionado
  const [tasks, setTasks] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const us = await listarUsuarios();
        setUsuarios(us);
        if (us.length) setSel(us[0].id);
      } catch (e) { setErr(e.message); }
    })();
  }, []);

  useEffect(() => {
    if (!sel) return;
    (async () => {
      try {
        const ts = await listarTareas(sel);
        setTasks(ts);
      } catch (e) { setErr(e.message); }
    })();
  }, [sel]);

  async function onCrearUsuario(){
    const name  = prompt("Nombre del usuario:");
    const email = prompt("Email (único):");
    if(!name || !email) return;
    try{
      const u = await crearUsuario({ name, email });
      setUsuarios(prev => [...prev, u]);
      setSel(u.id);
    }catch(e){ setErr(e.message); }
  }

  async function onCrearTarea(){
    if(!sel) return;
    const title = prompt("Título:");
    const description = prompt("Descripción:");
    if(!title) return;
    try{
      const t = await crearTarea(sel, { title, description });
      setTasks(prev => [t, ...prev]);
    }catch(e){ setErr(e.message); }
  }

  async function onToggle(id, completed){
    try{
      const t = await actualizarTarea(id, { completed: !completed });
      setTasks(prev => prev.map(x => x.id === id ? t : x));
    }catch(e){ setErr(e.message); }
  }

  async function onEliminar(id){
    if(!confirm("¿Eliminar tarea?")) return;
    try{
      await eliminarTarea(id);
      setTasks(prev => prev.filter(x => x.id !== id));
    }catch(e){ setErr(e.message); }
  }

  return (
    <section className="card">
      <h2>Demo API (User/Task)</h2>
      {err && <p style={{color:"red"}}>{err}</p>}

      <div style={{display:"flex", gap:8, alignItems:"center", marginBottom:10}}>
        <button onClick={onCrearUsuario}>➕ Crear usuario</button>
        <select value={sel ?? ""} onChange={e => setSel(Number(e.target.value))}>
          <option value="" disabled>Selecciona usuario</option>
          {usuarios.map(u => <option key={u.id} value={u.id}>{u.name} — {u.email}</option>)}
        </select>
        <button onClick={onCrearTarea} disabled={!sel}>➕ Nueva tarea</button>
      </div>

      {!sel && <p>Primero crea/selecciona un usuario.</p>}

      <ul style={{paddingLeft:18}}>
        {tasks.map(t => (
          <li key={t.id} style={{display:"flex", gap:8, alignItems:"center", marginBottom:6}}>
            <input type="checkbox" checked={t.completed} onChange={() => onToggle(t.id, t.completed)} />
            <span style={{textDecoration: t.completed ? "line-through" : "none"}}>
              <strong>{t.title}</strong>{t.description ? ` — ${t.description}` : ""}
            </span>
            <button onClick={() => onEliminar(t.id)} style={{marginLeft:"auto"}}>🗑️</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
