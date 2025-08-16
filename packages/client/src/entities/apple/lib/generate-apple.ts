import { Apple } from '../model/types';

// 🍎

export const generateApple = (avoidPositions: Position[]): Apple => {
  let apple: Apple;
  do {
    apple = {
      x: Math.floor(Math.random() * 20), // Для сетки 20x20
      y: Math.floor(Math.random() * 20),
    };
  } while (avoidPositions.some(pos => pos.x === apple.x && pos.y === apple.y));

  return apple;
};
