import { IGlobalStore } from '@/shared/global-store/global-store.interface';
import { useSelector } from 'react-redux';

export const useAuth = () => {
  const isAuth = useSelector(
    (state: { global: IGlobalStore }) => state.global.isAuth,
  );

  return { isAuth };
};
