import { Button, Input, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import PageWrapper from '@/shared/components/PageWrapper';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { EPages } from '@/shared/constants/paths';
import './login-page.scss';
import { ErrorMessages } from '@/shared/constants/error-message';

type TFormValues = {
  login: string;
  password: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormValues>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<TFormValues> = data => {
    console.log(data);
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
            rules={{
              minLength: {
                value: 3,
                message: ErrorMessages.MIN_SYMBOLS(3),
              },
              maxLength: {
                value: 20,
                message: ErrorMessages.MAX_SYMBOLS(20),
              },
              pattern: {
                value: /^(?![0-9]+$)[A-Za-z0-9_-]{3,20}$/,
                message: ErrorMessages.LOGIN,
              },
              required: {
                value: true,
                message: ErrorMessages.REQUIRED,
              },
            }}
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
            rules={{
              minLength: {
                value: 8,
                message: ErrorMessages.MIN_SYMBOLS(8),
              },
              maxLength: {
                value: 40,
                message: ErrorMessages.MAX_SYMBOLS(40),
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d).+$/,
                message: ErrorMessages.PASSWORD,
              },
              required: {
                value: true,
                message: ErrorMessages.REQUIRED,
              },
            }}
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
          <Button
            type="link"
            color="default"
            onClick={() => navigate(`/${EPages.REGISTER_PAGE}`)}
            size="middle"
            className="login-form__button">
            Нет аккаунта?
          </Button>
        </Form.Item>
      </Form>
    </PageWrapper>
  );
}
