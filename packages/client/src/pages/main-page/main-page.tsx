import { Card, Col, Layout, Row, Space, Typography } from 'antd';
import { featureCards } from './constants/data';
import Header from '@/widgets/header/header';
import { useTranslation } from '@/shared/i18n';
import { EPages } from '@/shared/constants/paths';
import { useNavigate } from 'react-router-dom';
import { useOauth } from '@/entities/auth/oauth-api';
import { useEffect } from 'react';
import { useSSRConfig } from '@/shared/contexts/ssr-context';

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

const redirectUrl = 'http://localhost:3000';

export const MainPage = () => {
  const { t } = useTranslation();
  const { currentYear } = useSSRConfig();
  const navigate = useNavigate();
  const oauthApi = useOauth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      oauthApi.mutateAsync({ code, redirect_url: redirectUrl });
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      console.log('Код авторизации не найден в URL');
      navigate(EPages.LOGIN_PAGE);
    }
  }, [navigate]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />

      <Content style={{ padding: '50px 50px 0', flex: 1 }}>
        <Row gutter={[24, 24]} justify="center">
          {featureCards.map((card, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <div
                    style={{
                      margin: '24px 0',
                      display: 'flex',
                      justifyContent: 'center',
                    }}>
                    {card.icon}
                  </div>
                }
                onClick={() => {
                  window.location.href = card.path;
                }}
                style={{ height: '100%', border: '1px solid rgba(0 0 0 / 0)' }}>
                <Card.Meta
                  title={t(`main_page.feature_cards.${card.key}.title`)}
                  description={t(
                    `main_page.feature_cards.${card.key}.description`,
                  )}
                />
              </Card>
            </Col>
          ))}
        </Row>

        <Row justify="center" style={{ marginTop: '48px' }}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Title level={2}>{t('main_page.hero.title')}</Title>
            <Text type="secondary">{t('main_page.hero.subtitle')}</Text>
          </Col>
        </Row>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        <Space direction="vertical" size="small">
          <Text type="secondary">
            {t('main_page.footer.copyright', {
              year: currentYear,
            })}{' '}
          </Text>
        </Space>
      </Footer>
    </Layout>
  );
};
