import { FC, Suspense } from 'react';
import '../styles/index.scss';
import { RouterProvider, RouterProviderProps } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useRouter } from './router/use-router';
import { AppProviders } from './providers/app-providers';
import { createClientConfig } from '@/shared/utils/ssr-config';
import AppSpinner from '@/shared/ui/app-spinner/app-spinner';
import global_store from '@/shared/global-store/global-store';

// Этот компонент используется как fallback, если SSR не работает
const App: FC = () => {
  const { router } = useRouter();
  const ssrConfig = createClientConfig();

  return (
    <Suspense
      fallback={
        <div>
          <AppSpinner />
        </div>
      }>
      <Provider store={global_store}>
        <AppProviders config={ssrConfig}>
          <RouterProvider router={router as RouterProviderProps['router']} />
        </AppProviders>
      </Provider>
    </Suspense>
  );
};

export default App;
