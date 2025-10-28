import { useMemo } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';

export const useRouter = () => {
  const router = useMemo(() => createBrowserRouter(routes), []);
  const isSSR = false;

  return { router, isSSR };
};
