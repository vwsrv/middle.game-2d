import React from 'react'
import ReactDOM from 'react-dom/client'
import '../styles/index.scss'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ThemeProvider } from './providers/theme-provider/theme-provider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
