import { Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import PageWrapper from '@/shared/components/PageWrapper';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { EPages } from '@/shared/constants/paths';
import './login-page.scss';

type TFormValues = {
  login: string;
  password: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const { handleSubmit } = useForm<TFormValues>();

  const onSubmit: SubmitHandler<TFormValues> = data => {
    console.log(data);
  };

  return (
    <PageWrapper title="Вход">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <Input size="large" aria-label="login" placeholder="Логин" />
        <Input.Password
          size="large"
          aria-label="password"
          placeholder="Пароль"
          iconRender={visible =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="login-form__button">
          Войти
        </Button>
        <Button
          type="link"
          color="default"
          onClick={() => navigate(`/${EPages.REGISTER_PAGE}`)}
          size="middle"
          className="login-form__button">
          Нет аккаунта?
        </Button>
      </form>
    </PageWrapper>
  );
}
