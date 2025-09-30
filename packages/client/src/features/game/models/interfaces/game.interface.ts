import { TGameState, TPosition } from '@/features/game/models/types';

export interface IGame {
  snake: TPosition[];
  apples: TPosition[];
  score: number;
  state: TGameState;
  currentLevel: number;
  exit: TPosition;
  isFalling: boolean;
}
