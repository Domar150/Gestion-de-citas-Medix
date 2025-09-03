const API = import.meta.env.VITE_API_URL;

async function handle(res) {
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${txt}`);
  }
  return res.json();
}

/* === USERS === */
export async function crearUsuario({ name, email }) {
  const r = await fetch(`${API}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });
  return handle(r);
}
export async function listarUsuarios() {
  const r = await fetch(`${API}/api/users`);
  return handle(r);
}

/* === TASKS === */
export async function listarTareas(userId) {
  const r = await fetch(`${API}/api/users/${userId}/tasks`);
  return handle(r);
}
export async function crearTarea(userId, { title, description }) {
  const r = await fetch(`${API}/api/users/${userId}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });
  return handle(r);
}
export async function actualizarTarea(id, data) {
  const r = await fetch(`${API}/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handle(r);
}
export async function eliminarTarea(id) {
  const r = await fetch(`${API}/api/tasks/${id}`, { method: "DELETE" });
  if (r.status === 204) return { id };
  return handle(r);
}
