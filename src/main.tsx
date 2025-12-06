import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HymnalProvider } from './contexts/HymnalContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HymnalProvider>
      <App />
    </HymnalProvider>
  </StrictMode>,
)
