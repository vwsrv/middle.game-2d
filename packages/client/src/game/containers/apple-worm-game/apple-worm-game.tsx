import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import './apple-worm-game.scss';
import { Button } from 'antd';
import { AppleWormGameEngine } from '@/game/core/game-engine';
import { Direction, Game } from '@/game/types/types';
import { CELL_SIZE, GRID_SIZE, levels } from '@/game/constants/constants';
import { GameBoard } from '@/game/ui/game-board/game-board';
import { GameCanvas } from '@/game/ui/game-canvas/game-canvas';

export const AppleWormGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameEngineRef = useRef<AppleWormGameEngine | null>(null);
  const [gameState, setGameState] = useState<Game>({
    snake: [],
    apples: [],
    score: 0,
    state: 'PLAYING',
    currentLevel: 0,
    exit: { x: 0, y: 0 },
    isFalling: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameEngineRef.current) return;

      switch (e.key) {
        case 'ArrowUp':
          gameEngineRef.current.move('UP');
          break;
        case 'ArrowDown':
          gameEngineRef.current.move('DOWN');
          break;
        case 'ArrowLeft':
          gameEngineRef.current.move('LEFT');
          break;
        case 'ArrowRight':
          gameEngineRef.current.move('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleGameUpdate = (game: Game) => {
      setGameState({ ...game });
      // drawGame(game);
    };

    gameEngineRef.current = new AppleWormGameEngine(levels, handleGameUpdate);
    gameEngineRef.current.start();

    return () => {
      gameEngineRef.current?.stop();
    };
  }, []);

  const handleMove = (direction: Direction) => {
    gameEngineRef.current?.move(direction);
  };

  const restartGame = () => {
    gameEngineRef.current?.restart();
  };

  return (
    <>
      <div className="aw-game-container">
        <section className="aw-game">
          <GameBoard
            score={gameState.score}
            gameState={gameState.state}
            levelNum={gameState.currentLevel}
          />
          <GameCanvas game={gameState} />
        </section>
        <section className="aw-controls">
          <Button
            type="primary"
            icon={<ArrowUpOutlined />}
            size="large"
            shape="circle"
            className="aw-controls__btn"
            onClick={() => handleMove('UP')}
          />
          <div>
            <Button
              type="primary"
              icon={<ArrowLeftOutlined />}
              size="large"
              shape="circle"
              className="aw-controls__btn"
              onClick={() => handleMove('LEFT')}
            />
            &nbsp;&nbsp;&nbsp;
            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              size="large"
              shape="circle"
              className="aw-controls__btn"
              onClick={() => handleMove('RIGHT')}
            />
          </div>
          <Button
            type="primary"
            icon={<ArrowDownOutlined />}
            size="large"
            shape="circle"
            className="aw-controls__btn"
            onClick={() => handleMove('DOWN')}
          />
        </section>
      </div>
      {gameState.state !== 'PLAYING' && (
        <div className="aw-game-overlay">
          {gameState.state === 'GAME_OVER' ? (
            <>
              <h2>🍎 Игра окончена! 🍏</h2>
              <p>Счет: {gameState.score}</p>
              <p>Уровень: {gameState.currentLevel + 1}</p>
              <Button type="primary" size="large" onClick={restartGame}>
                Играть снова
              </Button>
            </>
          ) : (
            <>
              <h2>
                {gameState.currentLevel < levels.length - 1
                  ? '🙌 Уровень пройден! ✌️✨'
                  : '🏆 Игра пройдена! 👑'}
              </h2>
              <p>Финальный счет: {gameState.score}</p>
              <Button type="primary" size="large" onClick={restartGame}>
                Начать заново
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
};
