import { GameState } from '../model/game-state';
import { moveWorm, checkSelfCollision } from '@/entities/worm/lib/move';

export const updateGameState = (
  prevState: GameState,
  timestamp: number,
): GameState => {
  if (prevState.gameOver) return prevState;

  const newHead = moveWorm(prevState.worm);

  // Проверка столкновений
  if (checkSelfCollision(newHead, prevState.worm.segments)) {
    return { ...prevState, gameOver: true };
  }

  // ... остальная логика (яблоки, препятствия)
  const updatedState = {
    ...prevState,
    worm: {
      ...prevState.worm,
      segments: [newHead, ...prevState.worm.segments.slice(0, -1)],
    },
  };

  return updatedState;
};
