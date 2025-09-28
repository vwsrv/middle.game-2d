import { IGlobalStore } from '@/shared/global-store/global-store.interface';
import { useSelector } from 'react-redux';

export const useAuth = () => {
  const user = useSelector(
    (state: { global: IGlobalStore }) => state.global.user,
  );
  const isAuth = useSelector(
    (state: { global: IGlobalStore }) => state.global.isAuth,
  );
  console.log(user, isAuth);
  return { isAuth };
};
