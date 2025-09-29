import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppProviders } from './providers/app-providers';
import { createClientConfig } from '@/shared/utils/ssr-config';
import { createStore } from '@/shared/global-store/global-store';
import { routes } from './router/routes';

// Получаем initialState из window и очищаем его
const initialState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;

// Создаем store с initialState
const store = createStore(initialState);

// Создаем роутер для клиента
const router = createBrowserRouter(routes);
const ssrConfig = createClientConfig();

const app = (
  <Provider store={store}>
    <AppProviders config={ssrConfig}>
      <RouterProvider router={router} />
    </AppProviders>
  </Provider>
);

hydrateRoot(document.getElementById('root')!, app);
