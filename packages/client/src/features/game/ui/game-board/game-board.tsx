import './game-board.scss';

type GameBoardProps = {
  score: number;
  gameState: GameState;
  levelNum: number;
};

export const GameBoard: React.FC<GameBoardProps> = (props: GameBoardProps) => {
  const { score, gameState, levelNum } = props;

  return (
    <>
      <div>
        <span className="label">Уровень:</span> {levelNum}
      </div>
      <div>
        <span className="label">Счет:</span>
        {score}
        {'🍏'.repeat(score)}
      </div>
      <br />
      <div>
        <span className="label">Состояние:</span>
        {gameState === 'PLAYING'
          ? 'Играем'
          : gameState === 'GAME_OVER'
          ? 'Проиграли'
          : 'Победа!'}
      </div>
    </>
  );
};
