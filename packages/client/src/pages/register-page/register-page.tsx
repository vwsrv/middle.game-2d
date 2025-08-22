import { Button, Input, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import PageWrapper from '@/shared/components/PageWrapper';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { EPages } from '@/shared/constants/paths';
import './register-page.scss';
import { ErrorMessages } from '@/shared/constants/error-message';

type TFormValues = {
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
  login: string;
  password: string;
};

export function RegisterPage() {
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
    <PageWrapper title="Регистрация">
      <Form
        onFinish={handleSubmit(onSubmit)}
        layout="vertical"
        className="register-form">
        <Form.Item
          validateStatus={errors.first_name ? 'error' : ''}
          help={errors.first_name ? errors.first_name.message : ''}>
          <Controller
            name="first_name"
            control={control}
            rules={{
              required: {
                value: true,
                message: ErrorMessages.REQUIRED,
              },
              pattern: {
                value: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
                message: ErrorMessages.NAME,
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                aria-label="first_name"
                placeholder="Имя"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          validateStatus={errors.second_name ? 'error' : ''}
          help={errors.second_name ? errors.second_name.message : ''}>
          <Controller
            name="second_name"
            control={control}
            rules={{
              pattern: {
                value: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
                message: ErrorMessages.NAME,
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
                aria-label="second_name"
                placeholder="Фамилия"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email ? errors.email.message : ''}>
          <Controller
            name="email"
            control={control}
            rules={{
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: ErrorMessages.EMAIL,
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
                aria-label="email"
                placeholder="Email"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          validateStatus={errors.phone ? 'error' : ''}
          help={errors.phone ? errors.phone.message : ''}>
          <Controller
            name="phone"
            control={control}
            rules={{
              pattern: {
                value: /^\+?\d{10,15}$/,
                message: ErrorMessages.PHONE,
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
                aria-label="phone"
                placeholder="Телефон"
              />
            )}
          />
        </Form.Item>
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
            className="register-form__button">
            Зарегистрироваться
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            type="link"
            color="default"
            onClick={() => navigate(`/${EPages.LOGIN_PAGE}`)}
            size="middle"
            className="register-form__button">
            Уже есть аккаунт?
          </Button>
        </Form.Item>
      </Form>
    </PageWrapper>
  );
}
