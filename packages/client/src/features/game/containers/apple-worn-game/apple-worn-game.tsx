import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowUpOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import './apple-worn-game.scss';
import { Button } from 'antd';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };
type GameState = 'PLAYING' | 'GAME_OVER' | 'LEVEL_COMPLETE';

const GRID_SIZE = 20;
const CELL_SIZE = 40;

const level = {
  walls: [
    { x: 10, y: 3 },
    { x: 11, y: 3 },
    { x: 10, y: 4 },
    { x: 3, y: 5 },
    { x: 4, y: 5 },
    { x: 5, y: 5 },
    { x: 6, y: 5 },
    { x: 7, y: 5 },
    { x: 10, y: 5 },
    { x: 12, y: 5 },
    { x: 10, y: 6 },
    { x: 12, y: 7 },
    { x: 5, y: 8 },
    { x: 5, y: 9 },
    { x: 5, y: 10 },
    { x: 13, y: 10 },
    { x: 12, y: 10 },
    { x: 14, y: 10 },
    { x: 5, y: 11 },
    { x: 9, y: 12 },
    { x: 10, y: 12 },
    { x: 11, y: 12 },
    { x: 12, y: 12 },
    { x: 15, y: 12 },
    { x: 15, y: 13 },
    { x: 10, y: 14 },
    { x: 11, y: 14 },
    { x: 12, y: 14 },
    { x: 9, y: 14 },
    { x: 7, y: 14 },
    { x: 15, y: 14 },
    { x: 4, y: 15 },
    { x: 5, y: 15 },
    { x: 6, y: 15 },
    { x: 7, y: 15 },
    { x: 8, y: 15 },
  ],
  apples: [
    { x: 2, y: 2 },
    { x: 8, y: 3 },
    { x: 5, y: 7 },
    { x: 15, y: 8 },
    { x: 15, y: 10 },
    { x: 2, y: 13 },
    { x: 8, y: 14 },
    { x: 7, y: 13 },
    { x: 4, y: 14 },
    { x: 15, y: 15 },
  ],
  exit: { x: 18, y: 18 },
  start: [
    { x: 6, y: 12 },
    { x: 6, y: 13 },
    { x: 6, y: 14 },
  ],
};

const AppleWormGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>([]);
  const [apples, setApples] = useState<Position[]>([]);
  const [gameState, setGameState] = useState<GameState>('PLAYING');
  const [score, setScore] = useState(0);
  const [isFalling, setIsFalling] = useState(false);

  // const isOnPlatform = useCallback((pos: Position): boolean => {
  //   return level.walls.some(w => w.x === pos.x && w.y === pos.y + 1);
  // }, []);

  const isReachedBottom = useCallback((pos: Position): boolean => {
    return pos.y >= GRID_SIZE - 1;
  }, []);

  const isSegmentSupported = useCallback((snake: Position[]): boolean => {
    return snake.some(segment => {
      // Проверяем для каждого сегмента:

      // Если под сегментом есть стена
      if (level.walls.some(w => w.x === segment.x && w.y === segment.y + 1))
        return true;

      return false;
    });
  }, []);

  const initGame = useCallback(() => {
    const startSnake = [...level.start];
    setSnake(startSnake);
    setApples([...level.apples]);
    setScore(0);
    setGameState('PLAYING');
  }, []);

  const checkCollision = useCallback(
    (head: Position, snake: Position[]): boolean => {
      const hasWallCollision = level.walls.some(w => {
        return w.x === head.x && w.y === head.y;
      });
      if (hasWallCollision) {
        return true;
      }
      // коллизия с полями игрового поля
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0) return true;
      // коллизия с собой
      return snake.slice(1).some(s => s.x === head.x && s.y === head.y);
    },
    [],
  );

  // процесс падения червяка
  const processFall = (
    snake: Position[],
    setSnake: (s: Position[]) => void,
  ) => {
    const needsToFall = !isSegmentSupported(snake);

    if (!needsToFall) {
      setIsFalling(false);
      return;
    }

    const fallenSnake = snake.map(seg => ({
      ...seg,
      y: seg.y + 1,
    }));

    if (fallenSnake.some(isReachedBottom)) {
      setGameState('GAME_OVER');
      setIsFalling(false);
      return;
    }

    setIsFalling(true);
    setTimeout(() => {
      setSnake(fallenSnake);
      processFall(fallenSnake, setSnake);
    }, 100);
  };

  const handleMove = useCallback(
    (dir: Direction) => {
      if (gameState !== 'PLAYING' || isFalling) return;

      setSnake(prevSnake => {
        // Движение головы
        const head = { ...prevSnake[0] };
        moveHead(head, dir);

        if (checkCollision(head, prevSnake)) return prevSnake;

        // Создание нового червя
        const newSnake = [head, ...prevSnake];

        const appleToEat = apples.find(a => a.x === head.x && a.y === head.y);

        if (appleToEat) {
          // Атомарное обновление сразу двух состояний
          setApples(prev => prev.filter(a => a !== appleToEat));
          setScore(prev => prev + 1); // Гарантированно +1
        } else {
          newSnake.pop();
        }

        // Запуск падения
        processFall(newSnake, setSnake);

        return newSnake;
      });
    },
    [checkCollision, gameState, isFalling, isReachedBottom, isSegmentSupported],
  );

  const moveHead = (head: Position, direction: Direction) => {
    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'PLAYING' || isFalling) return;
      switch (e.key) {
        case 'ArrowUp':
          handleMove('UP');
          break;
        case 'ArrowDown':
          handleMove('DOWN');
          break;
        case 'ArrowLeft':
          handleMove('LEFT');
          break;
        case 'ArrowRight':
          handleMove('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isFalling]);

  useEffect(() => {
    initGame();
  }, []);

  const renderGame = () => {
    return Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
      const x = i % GRID_SIZE;
      const y = Math.floor(i / GRID_SIZE);
      const isSnake = snake.some(s => s.x === x && s.y === y);
      const isHead = snake[0]?.x === x && snake[0]?.y === y;
      const isApple = apples.some(a => a.x === x && a.y === y);
      const isWall = level.walls.some(w => w.x === x && w.y === y);
      const isExit = level.exit.x === x && level.exit.y === y;

      let cellClass = 'aw-cell';
      if (isHead) cellClass += ' aw-head';
      else if (isSnake) cellClass += ' aw-snake';
      else if (isApple) cellClass += ' aw-apple';
      else if (isWall) cellClass += ' aw-wall';
      else if (isExit) cellClass += ' aw-exit';

      return (
        <div
          key={i}
          className={cellClass}
          style={{
            left: x * CELL_SIZE,
            top: y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
        />
      );
    });
  };

  return (
    <div className="aw-game-container" tabIndex={0}>
      <div className="aw-game-info">
        <div>Счет: {score}</div>
        <div>
          Состояние:{' '}
          {gameState === 'PLAYING'
            ? 'Играем'
            : gameState === 'GAME_OVER'
            ? 'Проиграли'
            : 'Победа!'}
        </div>
      </div>

      <div
        className="aw-game-board"
        style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}>
        {renderGame()}
      </div>

      <div className="aw-controls">
        <Button
          type="primary"
          icon={<ArrowUpOutlined />}
          size="large"
          shape="circle"
          className="aw-control-btn aw-up"
          onClick={() => handleMove('UP')}
        />

        <div>
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            size="large"
            shape="circle"
            className="aw-control-btn aw-left"
            onClick={() => handleMove('LEFT')}
          />
          &nbsp;&nbsp;&nbsp;
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            size="large"
            shape="circle"
            className="aw-control-btn aw-right"
            onClick={() => handleMove('RIGHT')}
          />
        </div>
        <Button
          type="primary"
          icon={<ArrowRightOutlined />}
          size="large"
          shape="circle"
          className="aw-control-btn aw-down"
          onClick={() => handleMove('DOWN')}
        />
      </div>

      {gameState !== 'PLAYING' && (
        <div className="aw-game-overlay">
          {gameState === 'GAME_OVER' ? (
            <>
              <h2>Игра окончена!</h2>
              <p>Счет: {score}</p>
              <button className="aw-restart-btn" onClick={initGame}>
                Играть снова
              </button>
            </>
          ) : (
            <>
              <h2>Уровень пройден!</h2>
              <button className="aw-restart-btn" onClick={initGame}>
                Начать заново
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AppleWormGame;
