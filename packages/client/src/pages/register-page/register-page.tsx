import { Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import PageWrapper from '@/shared/components/PageWrapper';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { EPages } from '@/shared/constants/paths';
import './register-page.scss';

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
  const { handleSubmit } = useForm<TFormValues>();

  const onSubmit: SubmitHandler<TFormValues> = data => {
    console.log(data);
  };

  return (
    <PageWrapper title="Регистрация">
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <Input size="large" aria-label="first_name" placeholder="Имя" />
        <Input size="large" aria-label="second_name" placeholder="Фамилия" />
        <Input size="large" aria-label="email" placeholder="Email" />
        <Input size="large" aria-label="phone" placeholder="Телефон" />
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
          className="register-form__button">
          Зарегистрироваться
        </Button>
        <Button
          type="link"
          color="default"
          onClick={() => navigate(`/${EPages.LOGIN_PAGE}`)}
          size="middle"
          className="register-form__button">
          Уже есть аккаунт?
        </Button>
      </form>
    </PageWrapper>
  );
}
