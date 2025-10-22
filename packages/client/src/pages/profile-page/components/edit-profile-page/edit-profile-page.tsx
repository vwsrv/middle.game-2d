import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EPages } from '@/shared/constants/paths';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  emailValidation,
  loginValidation,
  nameUserValidation,
  phoneValidation,
} from '@/shared/lib/validation';
import {
  useUpdateAvatar,
  useUpdateProfile,
} from '@/entities/user/api/user.api';
import PageWrapper from '@/shared/ui/page-wrapper/page-wrapper';
import { IGlobalStore } from '@/shared/global-store/global-store.interface';
import { useSelector } from 'react-redux';

type TFormValues = {
  first_name: string;
  second_name: string;
  display_name: string;
  email: string;
  phone: string;
  login: string;
  avatar: File;
};

const EditProfilePage = () => {
  const navigate = useNavigate();
  const user = useSelector(
    (state: { global: IGlobalStore }) => state.global.user,
  );
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormValues>({
    mode: 'onBlur',
    defaultValues: {
      login: user?.login || '',
      first_name: user?.first_name || '',
      second_name: user?.second_name || '',
      display_name: user?.display_name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });
  const { updateProfile } = useUpdateProfile();
  const { updateAvatar } = useUpdateAvatar();

  const onSubmit: SubmitHandler<TFormValues> = async data => {
    if (data.avatar) {
      await updateAvatar({ avatar: data.avatar });
    }
    await updateProfile(data).then(() => navigate(EPages.PROFILE_PAGE));
  };

  return (
    <PageWrapper title="Изменить данные" backButton="В профиль">
      <Form onFinish={handleSubmit(onSubmit)} className="form-layout__form">
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
                placeholder={`${user?.first_name}`}
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
                placeholder={`${user?.second_name}`}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          validateStatus={errors.display_name ? 'error' : ''}
          help={errors.display_name ? errors.display_name.message : ''}>
          <Controller
            name="display_name"
            control={control}
            rules={nameUserValidation}
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                aria-label="display_name"
                placeholder={`${user?.display_name || 'нет данных'}`}
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
                placeholder={`${user?.email}`}
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
                placeholder={`${user?.phone || 'нет данных'}`}
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
                placeholder={`${user?.login}`}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          validateStatus={errors.avatar ? 'error' : ''}
          help={errors.avatar ? errors.avatar.message : ''}>
          <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
              <Input
                type="file"
                accept="image/*"
                size="large"
                aria-label="avatar"
                placeholder={
                  user?.avatar
                    ? `Текущий аватар: ${user.avatar}`
                    : 'Выберите новый аватар'
                }
                onChange={e => field.onChange(e.target.files?.[0] || null)}
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

export default EditProfilePage;
