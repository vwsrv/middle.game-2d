import { GameHeader } from '@/widgets/game-header';
import './game-page.scss';
import { AppleWormGame } from '@/game';

export const GamePage = () => (
  <div className="game-page-container">
    <GameHeader />
    {/* <WormGame /> */}
    <AppleWormGame />
  </div>
);
