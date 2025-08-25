import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/index.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import ErrorBoundary from '@/shared/error-boundary/error-boundary';
import AppAI18NextProvider from '@/app/app-ai-18-next-provider';
import ServiceWorkerProvider from '@/app/providers';
import { ThemeProvider } from './providers/theme-provider/theme-provider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ServiceWorkerProvider>
        <ThemeProvider>
          <AppAI18NextProvider>
            <RouterProvider router={router} />
          </AppAI18NextProvider>
        </ThemeProvider>
      </ServiceWorkerProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
