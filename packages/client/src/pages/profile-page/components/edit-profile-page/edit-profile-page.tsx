import { Button, Card, Input, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { EPages } from '@/shared/constants/paths';
import { LogoutBtn } from '@/features/auth/components/logout-btn';
import { ErrorMessages } from '@/shared/constants/error-message';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type TFormValues = {
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
  login: string;
};

const EditProfilePage = () => {
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
    <div className="change-password-page">
      <div className="change-password-page__actions">
        <div className="actions__start">
          <Button
            type="link"
            onClick={() => navigate(`/${EPages.PROFILE_PAGE}`)}
            icon={<ArrowLeftOutlined />}
            size="small">
            Назад
          </Button>
        </div>

        <div className="actions__end">
          <LogoutBtn />
        </div>
      </div>
      <Card className="form-layout">
        <Form onFinish={handleSubmit(onSubmit)} className="form-layout__form">
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

          <Form.Item className="form-layout__actions">
            <Button
              type="default"
              htmlType="button"
              size="middle"
              onClick={() => navigate(EPages.PROFILE_PAGE)}>
              Отмена
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              onClick={() => navigate(EPages.PROFILE_PAGE)}
              size="middle">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditProfilePage;
