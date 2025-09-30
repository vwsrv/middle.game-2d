import { TGameState } from '@/features/game/models/types';
import './game-board.scss';
import { FC } from 'react';

type GameBoardProps = {
  score: number;
  gameState: TGameState;
  levelNum: number;
};

export const GameBoard: FC<GameBoardProps> = (props: GameBoardProps) => {
  const { score, gameState, levelNum } = props;

  return (
    <div className="aw-game-info">
      <div>
        ⭐ <span className="label">Уровень:</span> {levelNum}
      </div>

      <div>
        🍏 <span className="label">Количество очков: </span>
        {score}
      </div>

      <div>
        <span className="label">Состояние:</span>
        {gameState === 'PLAYING'
          ? 'Играем 🎮'
          : gameState === 'GAME_OVER'
          ? 'Проиграли ☠️'
          : 'Победа ✨'}
      </div>
    </div>
  );
};
