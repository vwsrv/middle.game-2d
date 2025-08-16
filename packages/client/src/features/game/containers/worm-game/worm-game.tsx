import React, { useState, useRef, useEffect } from 'react';
// import { GameCanvas } from '@/features/worm-game/ui/game-canvas';
// import { GameControls } from '@/widgets/game-controls';
// import { initGameState, updateGameState } from '@/features/worm-game/lib/game-logic';
// import { GameState } from '@/features/worm-game/model/game-state';
import './game-styles.scss';
import { GameState } from '../../model/game-state';
import { initGameState } from '../../lib/game-init';
import { updateGameState } from '../../lib/game-engine';

export const WormGame = () => {
  const [gameState, setGameState] = useState<GameState>(initGameState());
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const animationRef = useRef<number>();

  // Игровой цикл
  useEffect(() => {
    if (!gameStarted || isPaused) return;

    const gameLoop = (timestamp: number) => {
      setGameState(prev => updateGameState(prev, timestamp));
      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [gameStarted, isPaused]);

  // Обработка клавиш
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted) {
        setGameStarted(true);
        return;
      }

      // Обработка направления (упрощённый вариант)
      const keyToDirection = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
      };

      // if (keyToDirection[e.key]) {
      //   setGameState(prev => ({
      //     ...prev,
      //     worm: {
      //       ...prev.worm,
      //       nextDirection: keyToDirection[e.key],
      //     },
      //   }));
      // }

      if (e.key === ' ') setIsPaused(prev => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted]);

  return (
    <div className="worm-game-container">
      {/* <GameCanvas worm={gameState.worm} apple={gameState.apple} />
      <GameControls 
        isPaused={isPaused}
        onPauseToggle={() => setIsPaused(!isPaused)}
        onRestart={() => {
          setGameState(initGameState());
          setGameStarted(true);
        }}
      /> */}
    </div>
  );
};
