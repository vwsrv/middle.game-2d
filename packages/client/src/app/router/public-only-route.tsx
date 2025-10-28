import { useAuth } from '@/features/auth';
import { Navigate } from 'react-router-dom';

export const PublicOnlyRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};
