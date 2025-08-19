import { Layout, Card, Row, Col, Space, Typography } from 'antd'
import { featureCards } from './constants/data'
import { HeaderApp } from '@/widgets/header'

const { Content, Footer } = Layout
const { Title, Text } = Typography

export const MainPage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderApp />

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
