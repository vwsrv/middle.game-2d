import { Router } from 'express';
import * as topicController from '@/pages/api/topics/topic-controller';

const router = Router();

router.post('/', topicController.createTopic);
router.get('/', topicController.getTopics);
router.get('/:id', topicController.getTopic);
router.put('/:id', topicController.updateTopic);
router.delete('/:id', topicController.deleteTopic);

export default router;
