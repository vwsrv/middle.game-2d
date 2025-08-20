import { Col, Layout, Row, Select, Space, Spin, Table, Typography } from 'antd'
import { dataSource, columns } from '../mock/data'
import { HeaderApp } from '@/widgets/header'
import { Content } from 'antd/es/layout/layout'
import { IUser } from '@/app/router/types'
import { useEffect, useState } from 'react'

const { Title } = Typography

type SortType = 'count' | 'level'

export const LeaderBoardPage = () => {
  const [userArr, setUserArr] = useState<IUser[]>([])
  let loading

  useEffect(() => {
    setUserArr(dataSource)
  }, [dataSource])

  const setSort = (type: SortType) => {
    const result = [...userArr].sort((a, b) => b[type] - a[type])
    setUserArr(result)
  }
  return (
    <Layout>
      <HeaderApp />

      <Content>
        <Space
          direction="vertical"
          size="large"
          style={{ height: 'calc(100vh - 64px)' }}>
          <Row gutter={[16, 16]} align="middle" justify="space-between">
            <Col>
              <Title level={2}>Таблица лидеров</Title>
            </Col>

            <Col>
              <Select
                onChange={setSort}
                options={[
                  { value: 'count', label: 'Счет' },
                  { value: 'level', label: 'Уровень' },
                ]}
                style={{ width: 200, marginTop: 10 }}
              />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              {loading ? (
                <div>
                  <Spin size="large" />
                </div>
              ) : (
                <Table
                  dataSource={userArr}
                  columns={columns}
                  rowKey="id"
                  pagination={false}
                  scroll={{ x: true }}
                />
              )}
            </Col>
          </Row>
        </Space>
      </Content>
    </Layout>
  )
}
