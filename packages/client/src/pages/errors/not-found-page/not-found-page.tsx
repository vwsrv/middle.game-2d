import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './not-found-page.scss';
import { ArrowLeftOutlined } from '@ant-design/icons';

export const NotFoundErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-error-container">
      <Button
        type="primary"
        onClick={() => navigate('/')}
        icon={<ArrowLeftOutlined />}
        size="large">
        На главную
      </Button>
    </div>
  )
}
