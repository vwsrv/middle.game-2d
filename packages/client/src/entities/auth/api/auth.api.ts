import axios, { AxiosError } from 'axios';
import { SingInResponse, SingUpResponse } from '../types/auth.type';
import { API_BASE_URL } from '@/config/api';
import { useDispatch } from 'react-redux';
import { setIsAuth, setUser } from '@/features/global-slice/global-slice';

export const AUTH_URL = `${API_BASE_URL}/auth`;

export function useSignUp() {
  const { fetchUser } = useGetUser();
  const dispatch = useDispatch();

  const signUp = async (data: SingUpResponse) => {
    try {
      await axios.post<SingUpResponse>(`${AUTH_URL}/signup`, data, {
        withCredentials: true,
      });

      await fetchUser().then(data => {
        dispatch(setUser(data));
        dispatch(setIsAuth(true));
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 400) {
          await fetchUser().then(userData => {
            dispatch(setUser(userData));
            dispatch(setIsAuth(true));
          });
          return;
        }
        throw new Error(e.response?.data.message);
      }
    }
  };
  return { signUp };
}

export function useSignIn() {
  const { fetchUser } = useGetUser();
  const dispatch = useDispatch();

  const signIn = async (data: SingInResponse) => {
    try {
      await axios.post<SingInResponse>(`${AUTH_URL}/signin`, data, {
        withCredentials: true,
      });

      await fetchUser().then(data => {
        dispatch(setUser(data));
        dispatch(setIsAuth(true));
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 400) {
          await fetchUser().then(userData => {
            dispatch(setUser(userData));
            dispatch(setIsAuth(true));
          });
          return;
        }
        throw new Error(e.response?.data.message);
      }
    }
  };
  return { signIn };
}

export function useLogout() {
  const dispatch = useDispatch();

  const logout = async () => {
    await axios.post(`${AUTH_URL}/logout`, null, {
      withCredentials: true,
    });

    dispatch(setUser(null));
    dispatch(setIsAuth(false));
  };
  return { logout };
}

export function useGetUser() {
  const fetchUser = async () => {
    try {
      const { data: userData } = await axios.get(`${AUTH_URL}/user`, {
        withCredentials: true,
      });

      return userData;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  };
  return { fetchUser };
}
