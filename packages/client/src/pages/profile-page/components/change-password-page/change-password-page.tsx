import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { EPages } from '@/shared/constants/paths';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { passwordValidation } from '@/shared/lib/validation';
import { useChangePassword } from '@/entities/user/api/user.api';
import PageWrapper from '@/shared/ui/page-wrapper/page-wrapper';

type TFormValues = {
  oldPassword: string;
  newPassword: string;
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
  const { changePassword } = useChangePassword();

  const onSubmit: SubmitHandler<TFormValues> = async data => {
    await changePassword(data).then(() => navigate(EPages.PROFILE_PAGE));
  };

  return (
    <PageWrapper title="Изменить пароль" backButton="В профиль">
      <Form
        onFinish={handleSubmit(onSubmit)}
        layout="vertical"
        className="form-layout__form">
        <Form.Item
          validateStatus={errors.oldPassword ? 'error' : ''}
          help={errors.oldPassword ? errors.oldPassword.message : ''}>
          <Controller
            name="oldPassword"
            control={control}
            rules={passwordValidation}
            render={({ field }) => (
              <Input.Password
                {...field}
                size="large"
                aria-label="password"
                placeholder="Старый пароль"
                iconRender={visible =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            )}
          />
        </Form.Item>
        <Form.Item
          validateStatus={errors.newPassword ? 'error' : ''}
          help={errors.newPassword ? errors.newPassword.message : ''}>
          <Controller
            name="newPassword"
            control={control}
            rules={passwordValidation}
            render={({ field }) => (
              <Input.Password
                {...field}
                size="large"
                aria-label="password"
                placeholder="Новый пароль"
                iconRender={visible =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            )}
          />
        </Form.Item>
        <Form.Item className="form-layout__actions">
          <Button htmlType="submit" type="primary" size="large">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </PageWrapper>
  );
};

export default ChangePasswordPage;
