import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/index.scss';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import ErrorBoundary from '@/shared/error-boundary/error-boundary';
import AppAI18NextProvider from '@/app/app-ai-18-next-provider';
import { ThemeProvider } from './providers/theme-provider/theme-provider';
import global_store from '@/shared/global-store/global-store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <Provider store={global_store}>
          <AppAI18NextProvider>
            <RouterProvider router={router} />
          </AppAI18NextProvider>
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
