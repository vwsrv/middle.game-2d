import {
  Button,
  Col,
  Layout,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Typography,
} from 'antd';
import { columns } from '../mock/data';
import Header from '@/widgets/header/header';
import { Content } from 'antd/es/layout/layout';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLeaderboardAll } from '@/entities/leaderboard';
import './leader-board-page.scss';

const { Title } = Typography;
const LIMIT = 10;

type SortType = 'count' | 'firstGuessWins';

export const LeaderBoardPage = () => {
  const [ratingFieldName, setRatingFieldName] = useState<SortType>('count');
  const [cursor, setCursor] = useState(0);
  const { leaderboardData, loading, error, hasMore, fetchLeaderboard } =
    useLeaderboardAll();

  const leaderBoard = useMemo(() => {
    if (!leaderboardData) return [];
    return leaderboardData.map(item => item.data);
  }, [leaderboardData]);

  useEffect(() => {
    setCursor(0);
    fetchLeaderboard({ ratingFieldName, cursor: 0, limit: LIMIT });
  }, [ratingFieldName]);

  const handleLoadMore = useCallback(() => {
    const newCursor = cursor + 1;
    setCursor(newCursor);
    fetchLeaderboard(
      { ratingFieldName, cursor: newCursor, limit: LIMIT },
      true,
    );
  }, [cursor, ratingFieldName, fetchLeaderboard]);

  const changeSortRating = useCallback(() => {
    setRatingFieldName(
      ratingFieldName === 'count' ? 'firstGuessWins' : 'count',
    );
  }, [setRatingFieldName]);

  console.log(leaderBoard);

  return (
    <Layout className="leaderboard__container">
      <Header />

      <div className="leaderboard__wrapper">
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
                  value={ratingFieldName}
                  onChange={changeSortRating}
                  options={[
                    { value: 'count', label: 'Счет' },
                    { value: 'firstGuessWins', label: 'Уровень' },
                  ]}
                  style={{ width: 200, marginTop: 10 }}
                />
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                {loading && leaderBoard.length === 0 ? (
                  <div>
                    <Spin size="large" />
                  </div>
                ) : (
                  <>
                    <Table
                      dataSource={leaderBoard}
                      columns={columns}
                      rowKey="id"
                      pagination={false}
                      scroll={{ x: true }}
                    />
                    {hasMore && (
                      <div style={{ textAlign: 'center', marginTop: 16 }}>
                        <Button
                          onClick={handleLoadMore}
                          loading={loading}
                          disabled={loading}>
                          Загрузить ещё
                        </Button>
                      </div>
                    )}
                    {error && (
                      <div
                        style={{
                          textAlign: 'center',
                          marginTop: 16,
                          color: 'red',
                        }}>
                        {error}
                      </div>
                    )}
                  </>
                )}
              </Col>
            </Row>
          </Space>
        </Content>
      </div>
    </Layout>
  );
};
