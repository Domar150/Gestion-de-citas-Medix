import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Se busca el elemento con id="root" en index.html
// y ahí se renderiza toda la app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* StrictMode ayuda a detectar errores en desarrollo */}
    <App />
  </StrictMode>,
)