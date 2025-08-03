import { Layout, Menu, Card, Row, Col, Space, Typography, Grid } from 'antd'
import { featureCards, getMenuItems } from './constants/data'

const { Header, Content, Footer } = Layout
const { Title, Text } = Typography
const { useBreakpoint } = Grid

export const MainPage = () => {
  const screens = useBreakpoint()
  const isMobile = !screens.md
  const menuItems = getMenuItems(isMobile)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', boxShadow: '0 2px 8px #f0f1f2' }}>
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
      </Header>

      <Content style={{ padding: '50px 50px 0', flex: 1 }}>
        <Row gutter={[24, 24]} justify="center">
          {featureCards.map((card, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={<div style={{ margin: '24px 0' }}>{card.icon}</div>}
                onClick={() => (window.location.href = card.path)}
                style={{ height: '100%' }}>
                <Card.Meta title={card.title} description={card.description} />
              </Card>
            </Col>
          ))}
        </Row>

        <Row justify="center" style={{ marginTop: '48px' }}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Title level={2}>
              AppleWorm - классическая змейка с новыми возможностями
            </Title>
            <Text type="secondary">Играйте, общайтесь, соревнуйтесь!</Text>
          </Col>
        </Row>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        <Space direction="vertical" size="small">
          <Text type="secondary">AppleWorm © {new Date().getFullYear()}</Text>
        </Space>
      </Footer>
    </Layout>
  )
}
