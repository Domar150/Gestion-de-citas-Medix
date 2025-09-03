// src/components/MedixData.jsx
import { useEffect, useState } from "react";
const API = import.meta.env.VITE_API_URL;

export default function MedixData(){
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appts, setAppts] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try{
        const [p, d, a] = await Promise.all([
          fetch(`${API}/api/medix/patients`).then(r=>r.json()),
          fetch(`${API}/api/medix/doctors`).then(r=>r.json()),
          fetch(`${API}/api/medix/appointments`).then(r=>r.json()),
        ]);
        setPatients(Array.isArray(p) ? p : p.rows ?? []);
        setDoctors(Array.isArray(d) ? d : d.rows ?? []);
        setAppts(Array.isArray(a) ? a : a.rows ?? []);
      }catch(e){ setErr(e.message); }
    })();
  }, []);

  return (
    <section className="card">
      <h2>Datos MEDIX</h2>
      {err && <p style={{color:"red"}}>{err}</p>}

      <h3>Pacientes</h3>
      <ul>
        {patients.map(p => (
          <li key={p.id}>
            <strong>{p.nombre_completo ?? p.nombre}</strong>
            {p.email ? ` — ${p.email}` : ""}
            {p.eps_nombre ? ` — EPS: ${p.eps_nombre}` : ""}
          </li>
        ))}
      </ul>

      <h3>Doctores</h3>
      <ul>
        {doctors.map(d => (
          <li key={d.id}>
            <strong>{d.nombre_completo ?? d.nombre}</strong>
            {d.especialidad ? ` — ${d.especialidad}` : ""}
            {d.email ? ` — ${d.email}` : ""}
          </li>
        ))}
      </ul>

      <h3>Citas</h3>
      <ul>
        {appts.map(a => (
          <li key={a.id}>
            {a.scheduled_at ? new Date(a.scheduled_at).toLocaleString() : "(sin fecha)"} — 
            {a.motivo ?? "(sin motivo)"} — 
            {a.estado ?? a.status_code ?? ""} — 
            {a.paciente ? `Paciente: ${a.paciente} — ` : ""}Doctor: {a.doctor}
          </li>
        ))}
      </ul>
    </section>
  );
}