type GameBoardProps = {
  score: number;
  gameState: GameState;
  levelNum: number;
};

export const GameBoard: React.FC<GameBoardProps> = (props: GameBoardProps) => {
  const { score, gameState, levelNum } = props;

  return (
    <>
      <div>Уровень: {levelNum}</div>
      <div>Счет: {score}</div>
      <br />
      <div>
        Состояние:{' '}
        {gameState === 'PLAYING'
          ? 'Играем'
          : gameState === 'GAME_OVER'
          ? 'Проиграли'
          : 'Победа!'}
      </div>
    </>
  );
};
