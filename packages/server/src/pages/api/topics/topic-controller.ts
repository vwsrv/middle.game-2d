import { Request, Response } from 'express';
import * as topicService from '@/features/forum/topic/api/topic-service';
import { createClientAndConnect } from '@/shared/lib';

export const createTopic = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const client = await createClientAndConnect();
    if (!client) {
      res.status(500).json({ error: 'Database connection failed' });
      return;
    }

    const topicData = {
      title: req.body.title,
      content: req.body.content,
      author_id: req.user!.id,
    };

    const topic = await topicService.createTopic(client, topicData);
    await client.end();

    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create topic' });
  }
};

export const getTopics = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await createClientAndConnect();
    if (!client) {
      res.status(500).json({ error: 'Database connection failed' });
      return;
    }

    const pagination = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
    };

    const result = await topicService.getTopics(client, pagination);
    await client.end();

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get topics' });
  }
};

export const getTopic = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await createClientAndConnect();
    if (!client) {
      res.status(500).json({ error: 'Database connection failed' });
      return;
    }

    const topicId = parseInt(req.params.id);
    const userId = req.user?.id;
    const includeReactions = req.query.includeReactions === 'true';

    const topic = includeReactions
      ? await topicService.getTopicWithReactions(client, topicId, userId)
      : await topicService.getTopicById(client, topicId);

    await client.end();

    if (!topic) {
      res.status(404).json({ error: 'Topic not found' });
      return;
    }

    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get topic' });
  }
};

export const updateTopic = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const client = await createClientAndConnect();
    if (!client) {
      res.status(500).json({ error: 'Database connection failed' });
      return;
    }

    const topicId = parseInt(req.params.id);
    const updateData = {
      title: req.body.title,
      content: req.body.content,
    };

    const topic = await topicService.updateTopic(client, topicId, updateData);
    await client.end();

    if (!topic) {
      res.status(404).json({ error: 'Topic not found' });
      return;
    }

    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update topic' });
  }
};

export const deleteTopic = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const client = await createClientAndConnect();
    if (!client) {
      res.status(500).json({ error: 'Database connection failed' });
      return;
    }

    const topicId = parseInt(req.params.id);
    const deleted = await topicService.deleteTopic(client, topicId);
    await client.end();

    if (!deleted) {
      res.status(404).json({ error: 'Topic not found' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete topic' });
  }
};
