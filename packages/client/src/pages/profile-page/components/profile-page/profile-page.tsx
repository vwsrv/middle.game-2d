import { Button, Typography } from 'antd';
import {
  LockOutlined,
  LoginOutlined,
  MailOutlined,
  PhoneOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import AppAvatar from '@/shared/ui/app-avatar/app-avatar';
import { useNavigate } from 'react-router-dom';
import { EPages } from '@/shared/constants/paths';
import { ProfileDataItem } from '../data-item/data-item';
import './profile-page.scss';
import { useSelector } from 'react-redux';
import { IGlobalStore } from '@/shared/global-store/global-store.interface';
import PageWrapper from '@/shared/ui/page-wrapper/page-wrapper';

const { Title } = Typography;

const HeaderContents = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        type="default"
        onClick={() => navigate(EPages.EDIT_PROFILE_PAGE)}
        icon={<SettingOutlined />}
        size="middle">
        Изменить данные
      </Button>

      <Button
        type="default"
        onClick={() => navigate(EPages.CHANGE_PASSWORD_PAGE)}
        icon={<LockOutlined />}
        size="middle">
        Поменять пароль
      </Button>
    </>
  );
};

const ProfilePage = () => {
  const user = useSelector(
    (state: { global: IGlobalStore }) => state.global.user,
  );

  return (
    <PageWrapper
      title="Профиль"
      headerContent={<HeaderContents />}
      backButton="На главную">
      <div className="profile__wrapper">
        <div className="profile__header">
          <AppAvatar size={96} src={user?.avatar} />

          <Title level={2}>
            {user?.first_name} {user?.second_name}
          </Title>
        </div>

        <div className="profile__details">
          <ProfileDataItem
            label="логин"
            value={user?.login || ''}
            icon={<LoginOutlined />}
          />
          <ProfileDataItem
            label="никнейм"
            value={user?.display_name || 'не указан'}
            icon={<UserOutlined />}
          />
          <ProfileDataItem
            label="телефон"
            value={user?.phone ?? 'не указан'}
            icon={<PhoneOutlined />}
          />
          <ProfileDataItem
            label="e-mail"
            value={user?.email || ''}
            icon={<MailOutlined />}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProfilePage;
