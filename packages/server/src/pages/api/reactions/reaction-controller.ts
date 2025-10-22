import { Request, Response } from 'express';
import * as reactionService from '@/features/forum/reaction/api/reaction-service';
import { createClientAndConnect, isValidEmoji } from '@/shared/lib';

export const addReaction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const client = await createClientAndConnect();
    if (!client) {
      res.status(500).json({ error: 'Database connection failed' });
      return;
    }

    const emoji = req.body.emoji;
    if (!isValidEmoji(emoji)) {
      res.status(400).json({ error: 'Invalid emoji' });
      return;
    }

    const topicId = parseInt(req.params.topicId);
    const reactionData = {
      topic_id: topicId,
      user_id: req.user!.id,
      emoji: emoji,
    };

    const reaction = await reactionService.addReaction(client, reactionData);
    await client.end();

    res.status(201).json(reaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add reaction' });
  }
};

export const getTopicReactions = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const client = await createClientAndConnect();
    if (!client) {
      res.status(500).json({ error: 'Database connection failed' });
      return;
    }

    const topicId = parseInt(req.params.topicId);
    const userId = req.user?.id;

    const reactions = await reactionService.getTopicReactions(client, topicId);
    const stats = await reactionService.getReactionStats(
      client,
      topicId,
      userId,
    );
    await client.end();

    res.json({
      reactions,
      stats,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get reactions' });
  }
};

export const removeReaction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const client = await createClientAndConnect();
    if (!client) {
      res.status(500).json({ error: 'Database connection failed' });
      return;
    }

    const topicId = parseInt(req.params.topicId);
    const emoji = req.params.emoji;
    const userId = req.user!.id;

    const removed = await reactionService.removeReaction(
      client,
      topicId,
      userId,
      emoji,
    );
    await client.end();

    if (!removed) {
      res.status(404).json({ error: 'Reaction not found' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove reaction' });
  }
};
