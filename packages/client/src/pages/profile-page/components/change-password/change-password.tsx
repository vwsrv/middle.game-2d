import { Button, Card, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons'
import { EPages } from '@/shared/constants/paths'
import './change-password.scss'
import { LogoutBtn } from '@/features/auth/components/logout-btn'
import './change-password.scss'

export const ChangePassword = () => {
  return <div>ProfilePage Component</div>;
};

const ChangePasswordPage = () => {
  const navigate = useNavigate();

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
  );
};

export default ChangePasswordPage;
