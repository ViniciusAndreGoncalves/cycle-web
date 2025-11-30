import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "@/components/theme-provider" // <--- Importe aqui
import { CurrencyProvider } from '@/components/currency-provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Envolver o App com o Provider para definir o padrão como dark (opcional) */}
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CurrencyProvider>
      <App />
      </CurrencyProvider>
    </ThemeProvider>
  </React.StrictMode>,
)