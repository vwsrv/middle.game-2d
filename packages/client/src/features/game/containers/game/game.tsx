import './game.scss';
import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface GameState {
  worm: Position[];
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  nextDirection: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  apple: Position;
  gameOver: boolean;
  score: number;
  speed: number;
  lastUpdate: number;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150; // milliseconds per move

const WormGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>(initGameState());
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const animationFrameId = useRef<number>();
  const lastUpdateTime = useRef<number>(0);

  // Инициализация игры
  function initGameState(): GameState {
    const initialWorm = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ];

    return {
      worm: initialWorm,
      direction: 'UP',
      nextDirection: 'UP',
      apple: generateApple(initialWorm),
      gameOver: false,
      score: 0,
      speed: INITIAL_SPEED,
      lastUpdate: 0,
    };
  }

  // Генерация яблока
  function generateApple(worm: Position[]): Position {
    let apple: Position;
    do {
      apple = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      worm.some(segment => segment.x === apple.x && segment.y === apple.y)
    );

    return apple;
  }

  // Обработка нажатий клавиш
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted) {
        setGameStarted(true);
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
          if (gameState.direction !== 'DOWN') {
            setGameState(prev => ({ ...prev, nextDirection: 'UP' }));
          }
          break;
        case 'ArrowDown':
          if (gameState.direction !== 'UP') {
            setGameState(prev => ({ ...prev, nextDirection: 'DOWN' }));
          }
          break;
        case 'ArrowLeft':
          if (gameState.direction !== 'RIGHT') {
            setGameState(prev => ({ ...prev, nextDirection: 'LEFT' }));
          }
          break;
        case 'ArrowRight':
          if (gameState.direction !== 'LEFT') {
            setGameState(prev => ({ ...prev, nextDirection: 'RIGHT' }));
          }
          break;
        case ' ':
          setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.direction, gameStarted]);

  // Обновление игрового состояния
  const updateGameState = useCallback(
    (timestamp: number) => {
      if (!gameStarted || isPaused || gameState.gameOver) return;

      setGameState(prevState => {
        if (prevState.gameOver) return prevState;

        // Проверяем, прошло ли достаточно времени для следующего хода
        if (timestamp - prevState.lastUpdate < prevState.speed) {
          return prevState;
        }

        // Обновляем направление
        const direction = prevState.nextDirection;

        // Двигаем червяка
        const head = { ...prevState.worm[0] };
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

        // Проверка столкновения с границами
        if (
          head.x < 0 ||
          head.x >= GRID_SIZE ||
          head.y < 0 ||
          head.y >= GRID_SIZE
        ) {
          return { ...prevState, gameOver: true };
        }

        // Проверка столкновения с собой
        if (
          prevState.worm.some(
            segment => segment.x === head.x && segment.y === head.y,
          )
        ) {
          return { ...prevState, gameOver: true };
        }

        const newWorm = [head, ...prevState.worm];
        let apple = prevState.apple;
        let score = prevState.score;
        let speed = prevState.speed;

        // Проверка съедания яблока
        if (head.x === apple.x && head.y === apple.y) {
          apple = generateApple(newWorm);
          score += 1;
          // Увеличиваем скорость каждые 5 очков
          if (score % 5 === 0) {
            speed = Math.max(INITIAL_SPEED - score * 2, 50);
          }
        } else {
          newWorm.pop(); // Удаляем хвост, если не съели яблоко
        }

        return {
          ...prevState,
          worm: newWorm,
          direction,
          apple,
          score,
          speed,
          lastUpdate: timestamp,
        };
      });

      animationFrameId.current = requestAnimationFrame(updateGameState);
    },
    [gameStarted, isPaused, gameState.gameOver],
  );

  // Запуск и остановка игрового цикла
  useEffect(() => {
    if (gameStarted && !isPaused && !gameState.gameOver) {
      lastUpdateTime.current = performance.now();
      animationFrameId.current = requestAnimationFrame(updateGameState);
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameStarted, isPaused, gameState.gameOver, updateGameState]);

  // Отрисовка игры (остается такой же как в предыдущем примере)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Очистка холста
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Отрисовка сетки (опционально)
    ctx.strokeStyle = '#eee';
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

    // Отрисовка яблока
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(
      gameState.apple.x * CELL_SIZE + CELL_SIZE / 2,
      gameState.apple.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2,
    );
    ctx.fill();

    // Отрисовка червяка
    gameState.worm.forEach((segment, index) => {
      // Голова темнее
      const colorValue = 150 - Math.min(index * 5, 100);
      ctx.fillStyle = `rgb(0, ${colorValue}, 0)`;
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2,
      );
    });

    // Отрисовка текста
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText(`Score: ${gameState.score}`, 10, 20);

    if (!gameStarted) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(
        'Press any key to start',
        canvas.width / 2,
        canvas.height / 2,
      );
      ctx.textAlign = 'left';
    }

    if (gameState.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 20);
      ctx.fillText(
        `Final Score: ${gameState.score}`,
        canvas.width / 2,
        canvas.height / 2 + 20,
      );
      ctx.fillText(
        'Press space to restart',
        canvas.width / 2,
        canvas.height / 2 + 60,
      );
      ctx.textAlign = 'left';
    }

    if (isPaused && !gameState.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Paused', canvas.width / 2, canvas.height / 2);
      ctx.textAlign = 'left';
    }
  }, [gameState, gameStarted, isPaused]);

  // Рестарт игры
  const restartGame = () => {
    setGameState(initGameState());
    setGameStarted(true);
    setIsPaused(false);
  };

  return (
    <div className="worm-game-container">
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
      />
      <div className="game-controls">
        {gameState.gameOver && (
          <button onClick={restartGame}>Restart Game</button>
        )}
        {gameStarted && !gameState.gameOver && (
          <button onClick={() => setIsPaused(prev => !prev)}>
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        )}
      </div>
    </div>
  );
};

export default WormGame;
