import { Client } from 'pg';
import {
  IReaction,
  ICreateReaction,
  IReactionStats,
} from '@/entities/forum/reaction/models/interfaces';

export const addReaction = async (
  client: Client,
  reactionData: ICreateReaction,
): Promise<IReaction> => {
  const query = `
    INSERT INTO reactions (topic_id, user_id, emoji)
    VALUES ($1, $2, $3)
    ON CONFLICT (topic_id, user_id, emoji) DO NOTHING
    RETURNING *
  `;
  const values = [
    reactionData.topic_id,
    reactionData.user_id,
    reactionData.emoji,
  ];
  const result = await client.query(query, values);

  if (result.rows.length === 0) {
    const existingQuery =
      'SELECT * FROM reactions WHERE topic_id = $1 AND user_id = $2 AND emoji = $3';
    const existingResult = await client.query(existingQuery, values);
    return existingResult.rows[0];
  }

  return result.rows[0];
};

export const getTopicReactions = async (
  client: Client,
  topicId: number,
): Promise<IReaction[]> => {
  const query =
    'SELECT * FROM reactions WHERE topic_id = $1 ORDER BY created_at DESC';
  const result = await client.query(query, [topicId]);
  return result.rows;
};

export const getReactionStats = async (
  client: Client,
  topicId: number,
  userId?: number,
): Promise<IReactionStats> => {
  const query = `
    SELECT 
      COUNT(*) as total_reactions,
      ARRAY_AGG(DISTINCT emoji) FILTER (WHERE user_id = $2) as user_reactions
    FROM reactions 
    WHERE topic_id = $1
  `;
  const result = await client.query(query, [topicId, userId]);

  const countsQuery = `
    SELECT emoji, COUNT(*) as count
    FROM reactions
    WHERE topic_id = $1
    GROUP BY emoji
    ORDER BY count DESC
  `;
  const countsResult = await client.query(countsQuery, [topicId]);

  return {
    total_reactions: parseInt(result.rows[0].total_reactions),
    emoji_counts: countsResult.rows,
    user_reactions: result.rows[0].user_reactions || [],
  };
};

export const removeReaction = async (
  client: Client,
  topicId: number,
  userId: number,
  emoji: string,
): Promise<boolean> => {
  const query =
    'DELETE FROM reactions WHERE topic_id = $1 AND user_id = $2 AND emoji = $3';
  const result = await client.query(query, [topicId, userId, emoji]);
  return (result.rowCount ?? 0) > 0;
};

export const getUserReactionsOnTopic = async (
  client: Client,
  topicId: number,
  userId: number,
): Promise<IReaction[]> => {
  const query = 'SELECT * FROM reactions WHERE topic_id = $1 AND user_id = $2';
  const result = await client.query(query, [topicId, userId]);
  return result.rows;
};
