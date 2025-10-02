import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { EPages } from '@/shared/constants/paths';
import { useLogout } from '@/entities/user/auth/api/auth.api';

export const LogoutBtn = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();

  const handleLogout = () => {
    Modal.confirm({
      title: 'Вы уверены, что хотите выйти?',
      okText: 'Выйти',
      cancelText: 'Отмена',
      okButtonProps: { danger: true },
      onOk: () => {
        logout();
        console.log('Пользователь вышел');
        navigate(EPages.LOGIN_PAGE);
      },
    });
  };

  return (
    <Button
      type="primary"
      danger
      icon={<LogoutOutlined />}
      size="small"
      onClick={handleLogout}>
      Выйти
    </Button>
  );
};
