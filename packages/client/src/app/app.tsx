import { FC } from 'react';
import '../styles/index.scss';
import { RouterProvider, RouterProviderProps } from 'react-router-dom';
import { useRouter } from './router/use-router';
import { AppProviders } from './providers/app-providers';

const App: FC = () => {
  const { router } = useRouter();

  return (
    <AppProviders>
      <RouterProvider router={router as RouterProviderProps['router']} />
    </AppProviders>
  );
};

export default App;
