import { Router } from 'express';
import topicRoutes from '@/pages/api/topics/topic-routes';
import reactionRoutes from '@/pages/api/reactions/reaction-routes';

const router = Router();

router.use('/api/topics', topicRoutes);
router.use('/api', reactionRoutes);

export default router;
