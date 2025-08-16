import { Worm } from '@/entities/worm/model/types';
import { Position } from '@/entities/worm/model/types';

export interface GameState {
  worm: Worm;
  apple: Position;
  obstacles: Position[];
  score: number;
  speed: number;
  gameOver: boolean;
  lastUpdate: number;
}

export const INITIAL_SPEED = 150;
export const GRID_SIZE = 20;
export const CELL_SIZE = 20;

// // features/worm-game/lib/game-loop.ts
// export const useGameLoop = (state: GameState) => {
//   // Логика requestAnimationFrame
// };

// // features/worm-game/ui/game-canvas.tsx
// export const GameCanvas = () => {
//   // Рендер Canvas
// };
