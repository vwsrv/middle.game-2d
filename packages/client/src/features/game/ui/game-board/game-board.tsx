type GameBoardProps = {
  score: number;
  gameState: GameState;
};

export const GameBoard: React.FC<GameBoardProps> = (props: GameBoardProps) => {
  const { score, gameState } = props;

  return (
    <>
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
