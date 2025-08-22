export type Position = { x: number; y: number };
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type GameState = 'PLAYING' | 'GAME_OVER' | 'LEVEL_COMPLETE';

export interface Level {
  start: Position[];
  apples: Position[];
  walls: Position[];
  exit: Position;
}

export interface Game {
  snake: Position[];
  apples: Position[];
  score: number;
  state: GameState;
  currentLevel: number;
  exit: Position;
  isFalling: boolean;
}
