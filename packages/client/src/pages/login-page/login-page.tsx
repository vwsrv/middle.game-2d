import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import PageWrapper from '@/shared/ui/page-wrapper/page-wrapper';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { EPages } from '@/shared/constants/paths';
import './login-page.scss';
import { useSignIn } from '@/entities/auth/auth-api';
import { loginValidation, passwordValidation } from '@/shared/lib/validation';
import { OauthButton } from './components/OauthButton';

type TFormValues = {
  login: string;
  password: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const signInMutation = useSignIn();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormValues>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<TFormValues> = async data => {
    signInMutation.mutateAsync({ login: data.login, password: data.password });
  };

  return (
    <PageWrapper title="Вход">
      <Form
        onFinish={handleSubmit(onSubmit)}
        layout="vertical"
        className="login-form">
        <Form.Item
          validateStatus={errors.login ? 'error' : ''}
          help={errors.login ? errors.login.message : ''}>
          <Controller
            name="login"
            control={control}
            rules={loginValidation}
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                aria-label="login"
                placeholder="Логин"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password ? errors.password.message : ''}>
          <Controller
            name="password"
            control={control}
            rules={passwordValidation}
            render={({ field }) => (
              <Input.Password
                {...field}
                size="large"
                aria-label="password"
                placeholder="Пароль"
                iconRender={visible =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="login-form__button">
            Войти
          </Button>
        </Form.Item>

        <Form.Item>
          <OauthButton />
        </Form.Item>

        <Form.Item>
          <Button
            type="link"
            color="default"
            onClick={() => navigate(EPages.REGISTER_PAGE)}
            size="middle"
            className="login-form__button">
            Нет аккаунта?
          </Button>
        </Form.Item>
      </Form>
    </PageWrapper>
  );
}
