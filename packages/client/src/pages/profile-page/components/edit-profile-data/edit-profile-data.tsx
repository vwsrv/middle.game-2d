import { Button, Card, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { EPages } from '@/shared/constants/paths'
import { LogoutBtn } from '@/features/auth/components/logout-btn'

const EditProfilePage = () => {
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
          <Input size="large" aria-label="first_name" placeholder="Имя" />
          <Input size="large" aria-label="second_name" placeholder="Фамилия" />
          <Input size="large" aria-label="email" placeholder="Email" />
          <Input size="large" aria-label="phone" placeholder="Телефон" />
          <Input size="large" aria-label="login" placeholder="Логин" />

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

export default EditProfilePage;
