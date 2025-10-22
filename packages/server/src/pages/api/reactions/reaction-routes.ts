import { Router } from 'express';
import * as reactionController from '@/pages/api/reactions/reaction-controller';

const router = Router();

router.post('/topics/:topicId/reactions', reactionController.addReaction);
router.get('/topics/:topicId/reactions', reactionController.getTopicReactions);
router.delete(
  '/topics/:topicId/reactions/:emoji',
  reactionController.removeReaction,
);

export default router;
