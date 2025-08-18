import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ArrowUpOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import './apple-worn-game.scss';
import { Button } from 'antd';
import { GameBoard } from '../../ui/game-board/game-board';
import { CELL_SIZE, GRID_SIZE, levels } from './constants/constants';

const AppleWormGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>([]);
  const [apples, setApples] = useState<Position[]>([]);
  const [gameState, setGameState] = useState<GameState>('PLAYING');
  const [score, setScore] = useState(0);
  const [isFalling, setIsFalling] = useState(false);

  const [currentLevelNum, setCurrentLevel] = useState(0);
  const [exit, setExit] = useState<Position>({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const isReachedBottom = useCallback((pos: Position): boolean => {
    return pos.y >= GRID_SIZE - 1;
  }, []);

  const isSegmentSupported = useCallback(
    (snake: Position[]): boolean => {
      const level = levels[currentLevelNum];
      return snake.some(segment => {
        if (level.walls.some(w => w.x === segment.x && w.y === segment.y + 1))
          return true;
        return false;
      });
    },
    [snake],
  );

  const initGame = useCallback((levelIndex: number) => {
    const level = levels[levelIndex];
    const startSnake = [...level.start];
    setSnake(startSnake);
    setApples([...level.apples]);
    setScore(0);
    setGameState('PLAYING');
    setExit(level.exit);
  }, []);

  const checkCollision = useCallback(
    (head: Position, snake: Position[]): boolean => {
      const level = levels[currentLevelNum];
      const hasWallCollision = level.walls.some(w => {
        return w.x === head.x && w.y === head.y;
      });
      if (hasWallCollision) {
        return true;
      }
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0) return true;
      return snake.slice(1).some(s => s.x === head.x && s.y === head.y);
    },
    [],
  );

  const checkExit = useCallback((head: Position, exit: Position): boolean => {
    return head.x === exit.x && head.y === exit.y;
  }, []);

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
        const head = { ...prevSnake[0] };
        moveHead(head, dir);

        if (checkCollision(head, prevSnake)) return prevSnake;

        const newSnake = [head, ...prevSnake];

        const currentLevelData = levels[currentLevelNum];

        // Проверка выхода
        if (checkExit(head, exit)) {
          if (currentLevelNum < levels.length - 1) {
            setCurrentLevel(prev => prev + 1);
            initGame(currentLevelNum + 1);
            return prevSnake;
          } else {
            setGameState('LEVEL_COMPLETE');
            return prevSnake;
          }
        }

        const appleToEat = apples.find(a => a.x === head.x && a.y === head.y);

        if (appleToEat) {
          setApples(prev => prev.filter(a => a !== appleToEat));
          setScore(prev => prev + 1);
        } else {
          newSnake.pop();
        }

        processFall(newSnake, setSnake);

        return newSnake;
      });
    },
    [
      checkCollision,
      gameState,
      isFalling,
      isReachedBottom,
      isSegmentSupported,
      apples,
      currentLevelNum,
      exit,
      checkExit,
    ],
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
  }, [gameState, isFalling, handleMove]);

  useEffect(() => {
    initGame(currentLevelNum);
  }, [initGame]);

  // Функция отрисовки игры на Canvas
  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Очищаем canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем сетку
    // TODO: вынести в отдельную функцию и сделать опциональной
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    const level = levels[currentLevelNum];

    // Рисуем стены
    ctx.fillStyle = '#8B4513'; // коричневый цвет для стен
    level.walls.forEach(wall => {
      ctx.fillRect(
        wall.x * CELL_SIZE,
        wall.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE,
      );
    });

    // Рисуем яблоки с листиками
    apples.forEach(apple => {
      // Основная часть яблока
      ctx.fillStyle = '#FF0000';
      ctx.beginPath();
      ctx.arc(
        apple.x * CELL_SIZE + CELL_SIZE / 2,
        apple.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 2,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      // Стебелек
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(apple.x * CELL_SIZE + CELL_SIZE / 2, apple.y * CELL_SIZE + 2);
      ctx.lineTo(apple.x * CELL_SIZE + CELL_SIZE / 2, apple.y * CELL_SIZE - 5);
      ctx.stroke();

      // Большой листик
      ctx.fillStyle = '#228B22';
      ctx.beginPath();
      ctx.ellipse(
        apple.x * CELL_SIZE + CELL_SIZE / 2 + 5,
        apple.y * CELL_SIZE - 8,
        8,
        4,
        Math.PI / 4,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      // Линия на листике
      ctx.strokeStyle = '#0a2a0aff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(apple.x * CELL_SIZE + CELL_SIZE / 2, apple.y * CELL_SIZE - 5);
      ctx.lineTo(
        apple.x * CELL_SIZE + CELL_SIZE / 2 + 8,
        apple.y * CELL_SIZE - 10,
      );
      ctx.stroke();
    });

    // Рисуем выход
    ctx.fillStyle = '#FFFF00';
    ctx.beginPath();
    ctx.arc(
      level.exit.x * CELL_SIZE + CELL_SIZE / 2,
      level.exit.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2,
    );
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Рисуем змейку с улыбкой
    snake.forEach((segment, index) => {
      const centerX = segment.x * CELL_SIZE + CELL_SIZE / 2;
      const centerY = segment.y * CELL_SIZE + CELL_SIZE / 2;
      const radius = CELL_SIZE / 2 - 2;

      if (index === 0) {
        // Голова - зеленый с деталями
        ctx.fillStyle = '#006400';
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();

        // Белки глаз
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(centerX - 5, centerY - 5, 3, 0, Math.PI * 2);
        ctx.arc(centerX + 5, centerY - 5, 3, 0, Math.PI * 2);
        ctx.fill();

        // Зрачки
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(centerX - 5, centerY - 5, 1.5, 0, Math.PI * 2);
        ctx.arc(centerX + 5, centerY - 5, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Улыбка
        ctx.strokeStyle = '#ff5100ff';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(centerX, centerY + 3, radius / 2, 0.1 * Math.PI, 0.9 * Math.PI);
        ctx.stroke();
      } else {
        // Тело - простые зеленые круги
        ctx.fillStyle = '#00AA00';
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#7d9b05ff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });

    animationRef.current = requestAnimationFrame(drawGame);
  }, [snake, apples]);

  useEffect(() => {
    // Запускаем отрисовку при монтировании
    drawGame();

    // Останавливаем анимацию при размонтировании
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [drawGame]);

  const restartGame = useCallback(() => {
    initGame(0);
    setCurrentLevel(0);
  }, [initGame]);

  return (
    <div className="aw-game-container">
      <div className="aw-game-info">
        <GameBoard
          score={score}
          gameState={gameState}
          levelNum={currentLevelNum}
        />
      </div>

      <canvas
        ref={canvasRef}
        className="aw-game-board"
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
      />

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
              <p>Уровень: {currentLevelNum + 1}</p>
              <button className="aw-restart-btn" onClick={restartGame}>
                Играть снова
              </button>
            </>
          ) : (
            <>
              <h2>
                {currentLevelNum < levels.length - 1
                  ? 'Уровень пройден!'
                  : 'Игра пройдена!'}
              </h2>
              <p>Финальный счет: {score}</p>
              <button className="aw-restart-btn" onClick={restartGame}>
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
