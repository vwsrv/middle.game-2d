import { Button, Layout, Typography } from 'antd';
import { useOauth } from '@/entities/auth/api/oauth.api';
import { useEffect } from 'react';
import './main-page.scss';
import PageWrapper from '@/shared/ui/page-wrapper/page-wrapper';
import { EPages } from '@/shared/constants/paths';
import { useNavigate } from 'react-router-dom';
const { Content } = Layout;
const { Title, Text } = Typography;

export const MainPage = () => {
  const navigate = useNavigate();
  const { oauth } = useOauth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const redirectUrl = window.location.origin;

    if (code) {
      oauth({ code, redirect_uri: redirectUrl });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <PageWrapper>
      <Content className="main-page__wrapper">
        <div className="logo" style={{ float: 'left', marginRight: '24px' }}>
          <Title style={{ margin: 0 }}>
            <span style={{ color: '#ff4d4f', fontSize: '50px' }}>Apple</span>
            <span style={{ color: '#52c41a', fontSize: '50px' }}>Worm</span>
          </Title>
          <Text>
            <span style={{ fontSize: '16px', color: 'grey' }}>
              Начните играть прямо сейчас!
            </span>
          </Text>
        </div>
        <Button
          type="primary"
          size="large"
          className="main-page__button"
          onClick={() => navigate(EPages.APPLE_WORN_GAME_PAGE)}>
          Играть!
        </Button>
      </Content>
    </PageWrapper>
  );
};
