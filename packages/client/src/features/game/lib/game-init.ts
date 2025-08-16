// features/worm-game/lib/game-init.ts
import { Worm } from '@/entities/worm/model/types';
// import { generateApple } from '@/entities/apple/lib/generation';
import { GameState } from '../model/game-state';
import { generateApple } from '@/entities/apple/lib/generate-apple';

export const initGameState = (): GameState => {
  const initialWorm: Worm = {
    segments: [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ],
    direction: 'UP',
    nextDirection: 'UP',
  };

  return {
    worm: initialWorm,
    apple: generateApple(initialWorm.segments),
    obstacles: [], // Пока без препятствий
    score: 0,
    speed: 150,
    gameOver: false,
    lastUpdate: 0,
  };
};
