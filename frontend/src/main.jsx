import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/**
 * ENTRY POINT
 * 1. find the 'root' div in index.html
 * 2. create a React Root there
 * 3. Render the <App /> component inside it
 */
const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
