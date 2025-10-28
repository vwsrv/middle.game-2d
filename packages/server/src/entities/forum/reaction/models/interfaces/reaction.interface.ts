export interface IReaction {
  id: number;
  topic_id: number;
  user_id: number;
  emoji: string;
  created_at: Date;
}
