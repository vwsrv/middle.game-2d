import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AUTH_URL, USER_KEY } from './keys';
import { IUserData, SingInResponse } from './types';
import { setIsAuth, setUser } from '@/features/global-slice/globalSlice'; // Импорт setUser
import { useDispatch } from 'react-redux';

export function useSignUp() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (data: SingInResponse) => {
      const response = await axios.post(`${AUTH_URL}/signup`, data, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [USER_KEY] });
      dispatch(setIsAuth(true));
    },
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (data: SingInResponse) => {
      const response = await axios.post(`${AUTH_URL}/signin`, data, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [USER_KEY] });
      dispatch(setIsAuth(true));
    },
  });
}

export function useLogout() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async () => {
      await axios.post(`${AUTH_URL}/logout`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      dispatch(setIsAuth(false));
      dispatch(setUser(null));
    },
  });
}

export function useGetUser(enabled = true) {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: [USER_KEY],
    queryFn: async () => {
      const response = await axios.get(`${AUTH_URL}/user`, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: (data: IUserData) => {
      dispatch(setUser(data));
    },
    onError: () => {
      dispatch(setUser(null));
    },
    enabled,
  });
}
