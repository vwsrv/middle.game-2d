import { GRID_SIZE } from '../constants/constants';
import { Level } from '../types/types';
import { AppleWormGameEngine } from './game-engine';

// Mock функции для onUpdate
const mockOnUpdate = jest.fn();

// Тестовые уровни
const testLevels: Level[] = [
  {
    start: [{ x: 5, y: 8 }],
    apples: [
      { x: 6, y: 8 },
      { x: 7, y: 8 },
    ],
    exit: { x: 8, y: 8 },
    walls: [
      { x: 0, y: 9 },
      { x: 1, y: 9 },
      { x: 2, y: 9 },
      { x: 3, y: 9 },
      { x: 4, y: 9 },
      { x: 5, y: 9 },
      { x: 6, y: 9 },
      { x: 7, y: 9 },
      { x: 8, y: 9 },
      { x: 9, y: 9 },
    ],
  },
  {
    start: [{ x: 2, y: 2 }],
    apples: [{ x: 3, y: 2 }],
    exit: { x: 4, y: 2 },
    walls: [
      { x: 0, y: 9 },
      { x: 1, y: 9 },
      { x: 2, y: 9 },
      { x: 3, y: 9 },
      { x: 4, y: 9 },
    ],
  },
];

describe('AppleWormGameEngine', () => {
  let gameEngine: AppleWormGameEngine;

  beforeEach(() => {
    jest.useFakeTimers();
    mockOnUpdate.mockClear();
    gameEngine = new AppleWormGameEngine(testLevels, mockOnUpdate);
  });

  afterEach(() => {
    jest.useRealTimers();
    gameEngine.stop();
  });

  describe('Инициализация', () => {
    test('должен создавать экземпляр движка', () => {
      expect(gameEngine).toBeInstanceOf(AppleWormGameEngine);
    });

    test('должен инициализировать начальное состояние игры', () => {
      const gameState = gameEngine.getGameState();
      expect(gameState).toEqual({
        snake: [],
        apples: [],
        score: 0,
        state: 'PLAYING',
        currentLevel: 0,
        exit: { x: 0, y: 0 },
        isFalling: false,
      });
    });

    test('должен запускать игру с правильным начальным состоянием', () => {
      gameEngine.start();

      const gameState = gameEngine.getGameState();
      expect(gameState.snake).toEqual(testLevels[0].start);
      expect(gameState.apples).toEqual(testLevels[0].apples);
      expect(gameState.exit).toEqual(testLevels[0].exit);
      expect(gameState.state).toBe('PLAYING');
      expect(gameState.currentLevel).toBe(0);
    });
  });

  describe('Движение змейки', () => {
    beforeEach(() => {
      gameEngine.start();
    });

    test('должен двигать змейку вправо', () => {
      gameEngine.move('RIGHT');
      const gameState = gameEngine.getGameState();
      expect(gameState.snake[0]).toEqual({ x: 6, y: 8 });
    });

    test('должен двигать змейку влево', () => {
      gameEngine.move('LEFT');
      const gameState = gameEngine.getGameState();
      expect(gameState.snake[0]).toEqual({ x: 4, y: 8 });
    });

    test('должен двигать змейку вверх', () => {
      gameEngine.move('UP');
      const gameState = gameEngine.getGameState();
      expect(gameState.snake[0]).toEqual({ x: 5, y: 8 });
    });

    test('должен двигать змейку вниз', () => {
      gameEngine.move('DOWN');
      const gameState = gameEngine.getGameState();
      expect(gameState.snake[0]).toEqual({ x: 5, y: 8 });
    });
  });

  describe('Сбор яблок', () => {
    beforeEach(() => {
      gameEngine.start();
    });

    test('должен собирать яблоко и увеличивать счет', () => {
      gameEngine.move('RIGHT'); // Двигаемся к яблоку
      const gameState = gameEngine.getGameState();
      expect(gameState.apples).toHaveLength(1);
      expect(gameState.score).toBe(1);
    });

    test('должен увеличивать длину змейки после сбора яблока', () => {
      const initialLength = gameEngine.getGameState().snake.length;
      gameEngine.move('RIGHT'); // Собираем яблоко
      const gameState = gameEngine.getGameState();
      expect(gameState.snake.length).toBe(initialLength + 1);
    });
  });

  describe('Столкновения', () => {
    test('должен определять столкновение со стеной', () => {
      const wallLevel: Level[] = [
        {
          start: [{ x: 1, y: 1 }],
          apples: [],
          exit: { x: 9, y: 9 },
          walls: [
            { x: 1, y: 2 },
            { x: 2, y: 1 },
          ], // Стена прямо над головой
        },
      ];

      const wallEngine = new AppleWormGameEngine(wallLevel, mockOnUpdate);
      wallEngine.start();

      // Двигаемся вверх в стену
      wallEngine.move('RIGHT');

      // Проверяем, что полонежие не изменилось
      const gameState = wallEngine.getGameState();
      expect(gameState.snake[0]).toEqual({ x: 1, y: 1 });
    });

    test('должен определять выход за границы', () => {
      const edgeLevel: Level[] = [
        {
          start: [{ x: 0, y: 1 }], // Уже у левой границы
          apples: [],
          exit: { x: 9, y: 9 },
          walls: [],
        },
      ];

      const edgeEngine = new AppleWormGameEngine(edgeLevel, mockOnUpdate);
      edgeEngine.start();

      // Двигаемся влево за границу
      edgeEngine.move('LEFT');

      // Проверяем, что полонежие не изменилось
      const gameState = edgeEngine.getGameState();
      expect(gameState.snake[0]).toEqual({ x: 0, y: 1 });
    });

    test('должен определять столкновение с собой', () => {
      const selfCollisionLevel: Level[] = [
        {
          start: [
            { x: 5, y: 5 },
            { x: 4, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 4 },
            { x: 6, y: 4 },
            { x: 6, y: 5 },
          ],
          apples: [],
          exit: { x: 9, y: 9 },
          walls: [],
        },
      ];

      const collisionEngine = new AppleWormGameEngine(
        selfCollisionLevel,
        mockOnUpdate,
      );
      collisionEngine.start();

      // Двигаемся влево - в свой хвост
      collisionEngine.move('RIGHT');

      // Проверяем, что голова не сместилась
      const gameState = collisionEngine.getGameState();
      expect(gameState.snake[0]).toEqual({ x: 5, y: 5 });
    });

    test('должен определять выход за нижнюю границу при падении', () => {
      const fallingLevel: Level[] = [
        {
          start: [{ x: 5, y: GRID_SIZE - 1 }], // Близко к низу
          apples: [],
          exit: { x: 9, y: 9 },
          walls: [], // Нет поддержки
        },
      ];

      const fallingEngine = new AppleWormGameEngine(fallingLevel, mockOnUpdate);
      fallingEngine.start();

      // Запускаем падение
      fallingEngine.move('DOWN');

      // Продвигаем таймеры для обработки падения
      jest.advanceTimersByTime(500);

      const gameState = fallingEngine.getGameState();
      expect(gameState.state).toBe('GAME_OVER');
    });
  });

  describe('Выход с уровня', () => {
    test('должен переходить на следующий уровень при достижении выхода', () => {
      gameEngine.start();

      // Двигаемся к выходу
      gameEngine.move('RIGHT'); // x:6,y:5
      gameEngine.move('RIGHT'); // x:7,y:5
      gameEngine.move('RIGHT'); // x:8,y:5 - выход

      const finalState = gameEngine.getGameState();
      expect(finalState.state).toBe('PLAYING');
      expect(finalState.currentLevel).toBe(1);
    });
  });

  describe('Перезапуск', () => {
    test('должен перезапускать игру с первого уровня', () => {
      gameEngine.start();
      gameEngine.move('RIGHT');
      gameEngine.move('RIGHT');

      gameEngine.restart();

      const restartState = gameEngine.getGameState();
      expect(restartState.currentLevel).toBe(0);
      expect(restartState.snake).toEqual(testLevels[0].start);
      expect(restartState.score).toBe(0);
    });
  });

  describe('Падение', () => {
    test('не должен падать при наличии поддержки', () => {
      gameEngine.start();
      const initialState = gameEngine.getGameState();
      expect(initialState.isFalling).toBe(false);
    });

    test('должен определять падение змейки', () => {
      const fallingLevel: Level[] = [
        {
          start: [{ x: 5, y: 5 }],
          apples: [],
          exit: { x: 9, y: 9 },
          walls: [
            // Добавляем пол внизу, чтобы змейка упала и остановилась
            { x: 4, y: 7 },
            { x: 5, y: 7 },
            { x: 6, y: 7 },
          ],
        },
      ];

      const fallingEngine = new AppleWormGameEngine(fallingLevel, mockOnUpdate);
      fallingEngine.start();

      // Запускаем падение - двигаемся вниз
      fallingEngine.move('DOWN');

      // Продвигаем таймеры для обработки падения
      jest.advanceTimersByTime(500);

      const gameState = fallingEngine.getGameState();

      // Змейка должна упасть на пол на y=7 (или рядом)
      // Проверяем, что она действительно упала, но не достигла дна
      expect(gameState.snake[0].y).toBeGreaterThan(5); // Должна упасть ниже начальной позиции
      expect(gameState.state).toBe('PLAYING'); // Не GAME_OVER, так как есть пол
      expect(gameState.isFalling).toBe(false); // Падение должно остановиться
    });
  });
});
