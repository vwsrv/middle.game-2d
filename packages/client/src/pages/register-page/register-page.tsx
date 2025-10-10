import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import PageWrapper from '@/shared/ui/page-wrapper/page-wrapper';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { EPages } from '@/shared/constants/paths';
import './register-page.scss';
import {
  emailValidation,
  loginValidation,
  nameUserValidation,
  passwordValidation,
  phoneValidation,
} from '@/shared/lib/validation';
import { useSignUp } from '@/entities/user/auth/api/auth.api';

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
  // const { signUp } = useSignUp();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormValues>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<TFormValues> = data => {
    /* signUp(
      { ...data },
       {
        onSuccess: () => {
          navigate(EPages.LEADER_BOARD_PAGE);
        },
      },
    ); */
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
            rules={nameUserValidation}
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
            rules={nameUserValidation}
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
            rules={emailValidation}
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
            rules={phoneValidation}
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
            className="register-form__button">
            Зарегистрироваться
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            type="link"
            color="default"
            onClick={() => navigate(EPages.LOGIN_PAGE)}
            size="middle"
            className="register-form__button">
            Уже есть аккаунт?
          </Button>
        </Form.Item>
      </Form>
    </PageWrapper>
  );
}
