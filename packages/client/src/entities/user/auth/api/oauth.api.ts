import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { API_BASE_URL } from '@/config/api';

export function useOauthGetServiceId(redirect_url: string, enabled: boolean) {
  return useQuery({
    queryKey: ['oauth-service-id', redirect_url],
    queryFn: async () => {
      const response = await axios.get(
        `${API_BASE_URL}/oauth/yandex/service-id`,
        {
          params: { redirect_uri: redirect_url },
        },
      );
      return response.data.service_id;
    },
    enabled,
  });
}

export function useOauth() {
  return useMutation({
    mutationFn: async ({
      code,
      redirect_url,
    }: {
      code: string;
      redirect_url: string;
    }) => {
      const response = await axios.post(
        `${API_BASE_URL}/oauth/yandex`,
        {
          code,
          redirect_uri: redirect_url,
        },
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
  });
}
