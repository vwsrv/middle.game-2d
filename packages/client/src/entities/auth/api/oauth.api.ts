import axios, { AxiosError } from 'axios';

import { API_BASE_URL } from '@/config/api';
import { useGetUser } from './auth.api';
import { useDispatch } from 'react-redux';
import { OAuthResponse } from '../types/oauth.type';
import { setIsAuth, setUser } from '@/features/global-slice/global-slice';

export function useGetOauthServiceId(redirect_url: string) {
  const getOauthServiceId = async () => {
    try {
      const { data: oauthData } = await axios.get(
        `${API_BASE_URL}/oauth/yandex/service-id`,
        {
          params: { redirect_uri: redirect_url },
        },
      );

      return oauthData.service_id;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  };
  return { getOauthServiceId };
}

export function useOauth() {
  const { fetchUser } = useGetUser();
  const dispatch = useDispatch();

  const oauth = async (data: OAuthResponse) => {
    try {
      const response = await axios.post<OAuthResponse>(
        `${API_BASE_URL}/oauth/yandex`,
        data,
        {
          withCredentials: true,
        },
      );

      await fetchUser().then(data => {
        dispatch(setUser(data));
        dispatch(setIsAuth(true));
      });

      return response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  };
  return { oauth };
}
