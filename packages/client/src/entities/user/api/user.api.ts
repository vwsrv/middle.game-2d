import { API_BASE_URL } from '@/config/api';
import axios, { AxiosError } from 'axios';
import {
  IAvatarRequest,
  IChangePasswordRequest,
  IUserRequest,
} from '../types/user.type';
import { setUser } from '@/features/global-slice/global-slice';
import { useDispatch } from 'react-redux';
import { useGetUser } from '@/entities/auth/api/auth.api';
export const USER_URL = `${API_BASE_URL}/user`;

export function useUpdateProfile() {
  const { fetchUser } = useGetUser();
  const dispatch = useDispatch();
  const updateProfile = async (data: IUserRequest) => {
    try {
      await axios.put(`${USER_URL}/profile`, data, {
        withCredentials: true,
      });

      await fetchUser().then(data => {
        dispatch(setUser(data));
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(
          e.response?.data.message || 'Ошибка обновления профиля',
        );
      }
    }
  };
  return { updateProfile };
}

export function useUpdateAvatar() {
  const { fetchUser } = useGetUser();
  const dispatch = useDispatch();

  const updateAvatar = async (data: IAvatarRequest) => {
    try {
      const formData = new FormData();
      formData.append('avatar', data.avatar);

      await axios.put(`${USER_URL}/profile/avatar`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      await fetchUser().then(data => {
        dispatch(setUser(data));
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message || 'Ошибка загрузки аватара');
      }
    }
  };
  return { updateAvatar };
}

export function useChangePassword() {
  const { fetchUser } = useGetUser();
  const dispatch = useDispatch();

  const changePassword = async (data: IChangePasswordRequest) => {
    try {
      await axios.put(`${USER_URL}/password`, data, {
        withCredentials: true,
      });
      await fetchUser().then(data => {
        dispatch(setUser(data));
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message || 'Ошибка смены пароля');
      }
    }
  };
  return { changePassword };
}
