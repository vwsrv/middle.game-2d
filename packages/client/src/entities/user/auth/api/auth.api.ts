import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { setIsAuth, setUser } from '@/features/global-slice/global-slice';
import { AUTH_URL, USER_KEY } from '@/entities/keys';
import { IUserData, SingInResponse, SingUpResponse } from '../types/auth.type';

export async function useSignUp() {
  const { fetchUser } = useGetUser();

  const signUp = async (data: SingUpResponse) => {
    try {
      const { data: registerData } = await axios.post<SingUpResponse>(
        `${AUTH_URL}/signup`,
        data,
      );

      await fetchUser();

      return registerData;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  };
  return { signUp };
}

export function useSignIn() {
  const { fetchUser } = useGetUser();

  const signIn = async (data: SingInResponse) => {
    try {
      const { data: loginData } = await axios.post<SingInResponse>(
        `${AUTH_URL}/signin`,
        data,
      );

      await fetchUser();

      return loginData;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  };
  return { signIn };
}

export function useLogout() {
  async () => {
    try {
      await axios.post(`${AUTH_URL}/logout`);
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  };
}

export function useGetUser() {
  const fetchUser = async () => {
    try {
      const { data: userData } = await axios.get(`${AUTH_URL}/user`);

      return userData;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  };
  return { fetchUser };
}
