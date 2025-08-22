import { CELL_SIZE, GRID_SIZE, levels } from '@/game/constants/constants';
import { Game } from '@/game/types/types';
import { useEffect, useRef } from 'react';

import './game-canvas.scss';

type GameCavasProps = {
  game: Game;
};

export const GameCanvas: React.FC<GameCavasProps> = (props: GameCavasProps) => {
  const { game } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawGame();
  }, [game]);

  // Функция отрисовки игры на Canvas
  const drawGame = () => {
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

    const level = levels[game.currentLevel];

    // Рисуем стены
    ctx.fillStyle = '#6c3813ff';
    level.walls.forEach(wall => {
      ctx.fillRect(
        wall.x * CELL_SIZE,
        wall.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE,
      );
    });

    // Рисуем яблоки с листиками
    game.apples.forEach(apple => {
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
      ctx.strokeStyle = '#790303ff';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Блик (белый полупрозрачный овал)
      ctx.fillStyle = 'rgba(241, 250, 217, 0.3)';
      ctx.beginPath();
      ctx.ellipse(
        apple.x * CELL_SIZE + CELL_SIZE / 2 + 7,
        apple.y * CELL_SIZE + CELL_SIZE / 2 - 8,
        6,
        3,
        Math.PI / 4,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      // Стебелек
      ctx.strokeStyle = '#754e1aff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(apple.x * CELL_SIZE + CELL_SIZE / 2, apple.y * CELL_SIZE + 2);
      ctx.lineTo(apple.x * CELL_SIZE + CELL_SIZE / 2, apple.y * CELL_SIZE - 7);
      ctx.stroke();

      // Большой листик
      ctx.fillStyle = '#228B22';
      ctx.beginPath();
      ctx.ellipse(
        apple.x * CELL_SIZE + CELL_SIZE / 2 + 7,
        apple.y * CELL_SIZE - 4,
        8,
        4,
        Math.PI / 6,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      ctx.strokeStyle = '#023802ff';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });

    // Draw выход
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
    ctx.strokeStyle = '#362020ff';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#362020ff';
    ctx.font = '12px sans-serif';
    ctx.fillText(
      'выход',
      level.exit.x * CELL_SIZE + CELL_SIZE / 2,
      level.exit.y * CELL_SIZE + CELL_SIZE / 2,
    );

    // Рисуем змейку с улыбкой
    game.snake.forEach((segment, index) => {
      const centerX = segment.x * CELL_SIZE + CELL_SIZE / 2;
      const centerY = segment.y * CELL_SIZE + CELL_SIZE / 2;
      const radius = CELL_SIZE / 2 - 2;

      if (index === 0) {
        // Голова
        ctx.fillStyle = '#006400';
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#013d01ff';
        ctx.lineWidth = 1;
        ctx.stroke();

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
        if (game.state !== 'GAME_OVER') {
          ctx.arc(
            centerX,
            centerY + 3,
            radius / 2,
            0.1 * Math.PI,
            0.9 * Math.PI,
          );
        } else {
          ctx.arc(
            centerX,
            centerY + 17,
            radius / 2,
            1.2 * Math.PI,
            Math.PI * 1.8,
          );
        }

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
  };

  return (
    <canvas
      ref={canvasRef}
      className="aw-game-canvas"
      width={GRID_SIZE * CELL_SIZE}
      height={GRID_SIZE * CELL_SIZE}
    />
  );
};
