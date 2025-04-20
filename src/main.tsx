//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  //<StrictMode> Para que se impriman 1 vez los logs, en desarrollo debe estar activado
    <App />
  //</StrictMode>,
)
