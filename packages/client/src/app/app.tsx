import { FC, Suspense } from 'react';
import '../styles/index.scss';
import { RouterProvider, RouterProviderProps } from 'react-router-dom';
import { useRouter } from './router/use-router';
import { AppProviders } from './providers/app-providers';
import { createClientConfig } from '@/shared/utils/ssr-config';
import AppSpinner from '@/shared/ui/app-spinner/app-spinner';

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
      <AppProviders config={ssrConfig}>
        <RouterProvider router={router as RouterProviderProps['router']} />
      </AppProviders>
    </Suspense>
  );
};

export default App;
