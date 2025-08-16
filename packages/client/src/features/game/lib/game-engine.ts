import { GameState, GRID_SIZE, INITIAL_SPEED } from '../model/game-state';
// import { moveWorm } from '@/entities/worm/lib/movement';
// import { checkAppleCollision } from '@/entities/apple/lib/collision';
// import { checkObstacleCollision } from '@/entities/obstacle/lib/collision';
// import { checkWallCollision } from '@/entities/worm/lib/collision';
import { Position } from '@/entities/worm/model/types';
import { generateApple } from '@/entities/apple/lib/generate-apple';
import {
  checkSelfCollision,
  checkWallCollision,
  moveWorm,
} from '@/entities/worm';
import { checkAppleCollision } from '@/entities/apple/lib/collision';

export const updateGameState = (
  prevState: GameState,
  timestamp: number,
): GameState => {
  // 1. Проверка паузы/завершения игры
  if (
    prevState.gameOver ||
    timestamp - prevState.lastUpdate < prevState.speed
  ) {
    return prevState;
  }

  // 2. Движение червяка
  const newHead = moveWorm(prevState.worm);
  const newSegments = [newHead, ...prevState.worm.segments.slice(0, -1)];

  // 3. Проверка столкновений
  if (
    checkWallCollision(newHead, GRID_SIZE) ||
    checkSelfCollision(newHead, prevState.worm.segments) //||
    // checkObstacleCollision(newHead, prevState.obstacles)
  ) {
    return { ...prevState, gameOver: true };
  }

  // 4. Проверка яблока
  if (checkAppleCollision(newHead, prevState.apple)) {
    return handleAppleEaten(prevState, newHead, timestamp);
  }

  // 5. Обычное движение
  return {
    ...prevState,
    worm: {
      ...prevState.worm,
      segments: newSegments,
      direction: prevState.worm.nextDirection, // Фиксируем направление
    },
    lastUpdate: timestamp,
  };
};

// Обработка съедения яблока
const handleAppleEaten = (
  state: GameState,
  newHead: Position,
  timestamp: number,
): GameState => {
  const newScore = state.score + 1;
  const speed = INITIAL_SPEED;
  //calculateNewSpeed(newScore);

  return {
    ...state,
    worm: {
      ...state.worm,
      segments: [newHead, ...state.worm.segments], // Рост червяка
    },
    apple: generateApple([...state.worm.segments, ...state.obstacles]),
    score: newScore,
    speed,
    lastUpdate: timestamp,
  };
};

// import { Worm } from '@/entities/worm';
// import { Apple } from '@/entities/apple';

// export class GameEngine {
//   private worm: Worm;
//   private apple: Apple;

//   constructor() {
//     this.worm = new Worm();
//     this.apple = Apple.generate([...this.worm.segments]);
//   }

//   update() {
//     this.worm.move();
//     if (this.worm.collidesWith(this.apple)) {
//       this.worm.grow();
//       this.apple = Apple.generate([...this.worm.segments]);
//     }
//   }
// }
