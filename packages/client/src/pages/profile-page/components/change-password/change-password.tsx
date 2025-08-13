import { Button, Card, Input, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { EPages } from '@/shared/constants/paths'
import './change-password.scss'

export const ChangePassword = () => {
  return <div>ProfilePage Component</div>
}

type TChangePasswordProps = {
  login: string
  password: string
}

const ChangePasswordPage = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    Modal.confirm({
      title: 'Вы уверены, что хотите выйти?',
      okText: 'Выйти',
      cancelText: 'Отмена',
      okButtonProps: { danger: true },
      onOk: () => {
        console.log('Пользователь вышел')
        navigate('/')
        // Ваш код выхода (например, очистка localStorage, редирект)
      },
    })
  }

  return (
    <div className="change-password-page">
      <div className="change-password-page__actions">
        <div className="actions__start">
          <Button
            type="link"
            onClick={() => navigate('/')}
            icon={<ArrowLeftOutlined />}
            size="small">
            Назад
          </Button>
        </div>

        <div className="actions__end">
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            size="small"
            onClick={handleLogout}>
            Выйти
          </Button>
        </div>
      </div>
      <Card className="form-layout">
        <form className="form-layout__form">
          <Input.Password
            size="large"
            aria-label="password"
            placeholder="Пароль"
            iconRender={visible =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <Input.Password
            size="large"
            aria-label="password"
            placeholder="Повторить пароль"
            iconRender={visible =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <div className="form-layout__actions">
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
          </div>
        </form>
      </Card>
    </div>
  )
}

export default ChangePasswordPage
