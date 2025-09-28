import { TPosition } from '@/features/game/models/types';

export interface ILevel {
  start: TPosition[];
  apples: TPosition[];
  walls: TPosition[];
  exit: TPosition;
}
