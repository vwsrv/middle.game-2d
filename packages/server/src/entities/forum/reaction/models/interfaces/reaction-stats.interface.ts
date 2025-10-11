import { IReactionCount } from '@/entities/forum/reaction/models/interfaces/reaction-count.interface';

export interface IReactionStats {
  total_reactions: number;
  emoji_counts: IReactionCount[];
  user_reactions: string[];
}
