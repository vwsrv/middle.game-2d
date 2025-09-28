import { Button, Card, Typography } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LoginOutlined,
  ArrowLeftOutlined,
  SettingOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { AppAvatar } from '@/shared/components/app-avatar';
import { useNavigate } from 'react-router-dom';
import { EPages } from '@/shared/constants/paths';
import { LogoutBtn } from '@/features/auth/components/logout-btn';
import { ProfileDataItem } from '../data-item/data-item';
import './profile-page.scss';
import { useGetUser } from '@/entities/auth/auth-api';

const { Title } = Typography;

const ProfilePage = () => {
  const navigate = useNavigate();
  const { data: user } = useGetUser();

  return (
    <div className="profile-page">
      <div className="profile-page__actions">
        <div className="actions__start">
          <Button
            type="link"
            onClick={() => navigate('/')}
            icon={<ArrowLeftOutlined />}
            size="small">
            На главную
          </Button>
        </div>

        <div className="actions__end">
          <Button
            type="default"
            onClick={() => navigate(EPages.EDIT_PROFILE_PAGE)}
            icon={<SettingOutlined />}
            size="small">
            Изменить данные
          </Button>

          <Button
            type="default"
            onClick={() => navigate(EPages.CHANGE_PASSWORD_PAGE)}
            icon={<LockOutlined />}
            size="small">
            Поменять пароль
          </Button>

          <LogoutBtn />
        </div>
      </div>
      <div className="profile-content">
        <AppAvatar size={96} src={user?.avatar} />
        <Card className="form-layout">
          <Title level={2}>
            {user?.first_name} {user?.second_name}
          </Title>

          <div className="form-layout">
            <ProfileDataItem
              label="логин"
              value={user?.login || ''}
              icon={<LoginOutlined />}
            />
            <ProfileDataItem
              label="никнейм"
              value={user?.display_name || ''}
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
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
