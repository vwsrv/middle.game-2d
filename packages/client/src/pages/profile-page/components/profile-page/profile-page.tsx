import './profile-page.scss'
import { Button, Card, Typography } from 'antd'
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LoginOutlined,
  ArrowLeftOutlined,
  SettingOutlined,
  LockOutlined,
} from '@ant-design/icons'
import { AppAvatar } from '@/shared/components/app-avatar'
import { useNavigate } from 'react-router-dom'
import { EPages } from '@/shared/constants/paths'
import { LogoutBtn } from '@/features/auth/components/logout-btn'
import { ProfileDataItem } from '../data-item/data-item'
import './profile-page.scss'

const { Title } = Typography

type TUser = {
  firstName: string
  lastName: string
  username: string
  login: string
  email: string
  phone?: string
  avatar?: string
}

// TODO: это моки, нужно будет удалить
const tempUser: TUser = {
  firstName: 'Иван',
  lastName: 'Иванов',
  username: 'ivan_the_best',
  login: 'ivan_the_best',
  email: 'ivan@example.com',
  phone: '+7 (123) 456-78-90',
  avatar: 'https://example.com/path/to/avatar.jpg', // можно оставить undefined для дефолтного аватара
}

const ProfilePage = () => {
  const user = tempUser
  const navigate = useNavigate()

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
        <AppAvatar size={96} src={user.avatar} />
        <Card className="form-layout">
          <Title level={2}>
            {user.firstName} {user.lastName}
          </Title>

          <div className="form-layout">
            <ProfileDataItem
              label="логин"
              value={user.login}
              icon={<LoginOutlined />}
            />
            <ProfileDataItem
              label="никнейм"
              value={user.username}
              icon={<UserOutlined />}
            />
            <ProfileDataItem
              label="телефон"
              value={user.phone ?? 'не указан'}
              icon={<PhoneOutlined />}
            />
            <ProfileDataItem
              label="e-mail"
              value={user.email}
              icon={<MailOutlined />}
            />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ProfilePage
