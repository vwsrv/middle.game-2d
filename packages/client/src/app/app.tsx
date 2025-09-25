import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/index.scss';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import ErrorBoundary from '@/shared/ui/error-boundary/error-boundary';
import AppAi18NextProvider from '@/app/providers/app-ai18-next/app-ai-18-next.provider';
import { ServiceWorkerProvider } from '@/app/providers/servce-worker';
import { ThemeProvider } from './providers/theme-provider/theme-provider';
import global_store from '@/shared/global-store/global-store';

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <ErrorBoundary>
      <ServiceWorkerProvider>
        <ThemeProvider>
          <Provider store={global_store}>
            <AppAi18NextProvider>
              <RouterProvider router={router} />
            </AppAi18NextProvider>
          </Provider>
        </ThemeProvider>
      </ServiceWorkerProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
