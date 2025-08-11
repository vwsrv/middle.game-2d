import {
  Layout,
  Menu,
  Card,
  Row,
  Col,
  Space,
  Typography,
  Grid,
  Button,
} from 'antd';
import { featureCards, getMenuItems } from './constants/data';
import { useTranslation } from 'react-i18next';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export const MainPage = () => {
  const { t, i18n } = useTranslation();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const menuItems = getMenuItems(isMobile);

  const onChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <div className="logo" style={{ float: 'left', marginRight: '24px' }}>
          <Title level={3} style={{ margin: 0 }}>
            <span style={{ color: '#ff4d4f' }}>Apple</span>
            <span style={{ color: '#52c41a' }}>Worm</span>
          </Title>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['home']}
          items={menuItems}
          style={{ flex: 1 }}
        />

        <Space style={{ float: 'right' }}>
          <Button
            type={i18n.language === 'ru' ? 'primary' : 'default'}
            size="small"
            onClick={() => onChangeLanguage('ru')}>
            RU
          </Button>
          <Button
            type={i18n.language === 'en' ? 'primary' : 'default'}
            size="small"
            onClick={() => onChangeLanguage('en')}>
            EN
          </Button>
        </Space>
      </Header>

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
                onClick={() => (window.location.href = card.path)}
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
              year: new Date().getFullYear(),
            })}{' '}
          </Text>
        </Space>
      </Footer>
    </Layout>
  );
};
