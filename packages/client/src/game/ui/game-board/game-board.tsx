import { GameState } from '@/game/types/types';
import './game-board.scss';

type GameBoardProps = {
  score: number;
  gameState: GameState;
  levelNum: number;
};

export const GameBoard: React.FC<GameBoardProps> = (props: GameBoardProps) => {
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
