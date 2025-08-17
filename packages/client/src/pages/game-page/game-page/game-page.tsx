import { ScoreBoard } from '@/widgets/score-board';
import { GameHeader } from '@/widgets/game-header';
import AppleWormGame from '@/features/game/containers/apple-worn-game/apple-worn-game';
import './game-page.scss';

export const GamePage = () => (
  <div className="game-page-container">
    <GameHeader />
    {/* <WormGame /> */}
    <AppleWormGame />
    <ScoreBoard />
  </div>
);
