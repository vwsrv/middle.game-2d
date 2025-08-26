// import { useSelector } from 'react-redux'

export const useAuth = () => {
  // TODO: Добавить логику проверки авторизации и избавиться от any
  const user = true; // useSelector((state: any) => state.auth)
  return { isAuth: !!user };
};
