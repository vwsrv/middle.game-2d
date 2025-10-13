import { ITopic } from '@/src/entities';

export interface ITopicWithReactions extends ITopic {
  reactions_count?: number;
  user_reactions?: string[];
}
