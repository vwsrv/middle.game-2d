import './game-page.scss';
import { AppleWormGame } from '@/features/game';
import { GameFooter } from '@/features/game/ui/game-footer/game-footer';

export const GamePage = () => (
  <div className="game-page-container">
    <AppleWormGame />
    <GameFooter />
  </div>
);
