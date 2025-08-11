import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './server-error-page.scss';
import { ArrowLeftOutlined } from '@ant-design/icons';

export const ServerErrorPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="server-error-container">
        <Button
          type="primary"
          onClick={() => navigate('/')}
          icon={<ArrowLeftOutlined />}
          size="large">
          На главную
        </Button>
      </div>
    </>
  );
};
