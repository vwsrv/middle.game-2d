import { useGetOauthServiceId } from '@/entities/auth/api/oauth.api';
import { Button } from 'antd';
import { useCallback } from 'react';

export const OauthButton = () => {
  const redirectUrl = 'http://localhost:3000';
  const { getOauthServiceId } = useGetOauthServiceId(redirectUrl);

  const onClickOauthSubmit = useCallback(async () => {
    const serviceId = await getOauthServiceId();
    if (!serviceId) {
      console.error('service_id не получен');
      return;
    }
    const url = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUrl}`;
    document.location.href = url;
  }, [redirectUrl]);

  return (
    <Button
      type="link"
      color="default"
      onClick={onClickOauthSubmit}
      size="middle"
      className="login-form__button">
      Войти с помощью Yandex
    </Button>
  );
};
