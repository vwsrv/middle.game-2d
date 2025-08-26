import { Button, Card, Input, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons';
import { EPages } from '@/shared/constants/paths';
import './change-password-page.scss';
import { LogoutBtn } from '@/features/auth/components/logout-btn';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessages } from '@/shared/constants/error-message';

type TFormValues = {
  password: string;
  new_password: string;
};

const ChangePasswordPage = () => {
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
            onClick={() => navigate(-1)}
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
        <Form
          onFinish={handleSubmit(onSubmit)}
          layout="vertical"
          className="form-layout__form">
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
          <Form.Item
            validateStatus={errors.new_password ? 'error' : ''}
            help={errors.new_password ? errors.new_password.message : ''}>
            <Controller
              name="new_password"
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
                  aria-label="new_password"
                  placeholder="Пароль"
                  iconRender={visible =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
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

export default ChangePasswordPage;
