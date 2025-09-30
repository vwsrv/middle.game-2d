import { Col, Layout, Row, Select, Space, Spin, Table, Typography } from 'antd';
import { columns } from '../mock/data';
import Header from '@/widgets/header/header';
import { Content } from 'antd/es/layout/layout';
import { useCallback, useMemo, useState } from 'react';
import { useLeaderboardAll } from '../api/leaderboardApi';

const { Title } = Typography;

type SortType = 'count' | 'level';

export const LeaderBoardPage = () => {
  const [ratingFieldName, setRatingFieldName] = useState<SortType>('count');
  const { data: leaderBoardData, isLoading } = useLeaderboardAll({
    ratingFieldName,
  });

  const leaderBoard = useMemo(() => {
    if (!leaderBoardData) return [];
    return leaderBoardData;
  }, [leaderBoardData, ratingFieldName]);

  const changeSortRating = useCallback(() => {
    setRatingFieldName(ratingFieldName === 'count' ? 'level' : 'count');
  }, []);

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  return (
    <Layout>
      <Header />

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
                onChange={changeSortRating}
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
              {isLoading ? (
                <div>
                  <Spin size="large" />
                </div>
              ) : (
                <Table
                  dataSource={leaderBoard}
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
  );
};
