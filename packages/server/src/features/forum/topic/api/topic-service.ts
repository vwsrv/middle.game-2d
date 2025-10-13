import { Client } from 'pg';
import {
  ITopic,
  ICreateTopic,
  IUpdateTopic,
  ITopicWithReactions,
} from '@/entities/forum/topic/models/interfaces';
import { IPaginationParams, IPaginatedResponse } from '@/shared/interfaces';

export const createTopic = async (
  client: Client,
  topicData: ICreateTopic,
): Promise<ITopic> => {
  const query = `
    INSERT INTO topics (title, content, author_id)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [topicData.title, topicData.content, topicData.author_id];
  const result = await client.query(query, values);
  return result.rows[0];
};

export const getTopicById = async (
  client: Client,
  id: number,
): Promise<ITopic | null> => {
  const query = 'SELECT * FROM topics WHERE id = $1';
  const result = await client.query(query, [id]);
  return result.rows[0] || null;
};

export const getTopics = async (
  client: Client,
  pagination?: IPaginationParams,
): Promise<IPaginatedResponse<ITopic>> => {
  const page = pagination?.page || 1;
  const limit = pagination?.limit || 10;
  const offset = (page - 1) * limit;

  const countQuery = 'SELECT COUNT(*) FROM topics';
  const countResult = await client.query(countQuery);
  const total = parseInt(countResult.rows[0].count);

  const query = `
    SELECT * FROM topics 
    ORDER BY created_at DESC 
    LIMIT $1 OFFSET $2
  `;
  const result = await client.query(query, [limit, offset]);

  return {
    data: result.rows,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getTopicWithReactions = async (
  client: Client,
  id: number,
  userId?: number,
): Promise<ITopicWithReactions | null> => {
  const query = `
    SELECT 
      t.*,
      COUNT(r.id) as reactions_count,
      ARRAY_AGG(DISTINCT r.emoji) FILTER (WHERE r.user_id = $2) as user_reactions
    FROM topics t
    LEFT JOIN reactions r ON t.id = r.topic_id
    WHERE t.id = $1
    GROUP BY t.id
  `;
  const result = await client.query(query, [id, userId]);
  return result.rows[0] || null;
};

export const updateTopic = async (
  client: Client,
  id: number,
  topicData: IUpdateTopic,
): Promise<ITopic | null> => {
  const fields = [];
  const values = [];
  let paramCount = 1;

  if (topicData.title) {
    fields.push(`title = $${paramCount++}`);
    values.push(topicData.title);
  }
  if (topicData.content) {
    fields.push(`content = $${paramCount++}`);
    values.push(topicData.content);
  }

  if (fields.length === 0) return null;

  fields.push(`updated_at = CURRENT_TIMESTAMP`);
  values.push(id);

  const query = `
    UPDATE topics 
    SET ${fields.join(', ')}
    WHERE id = $${paramCount}
    RETURNING *
  `;

  const result = await client.query(query, values);
  return result.rows[0] || null;
};

export const deleteTopic = async (
  client: Client,
  id: number,
): Promise<boolean> => {
  const query = 'DELETE FROM topics WHERE id = $1';
  const result = await client.query(query, [id]);
  return (result.rowCount ?? 0) > 0;
};
