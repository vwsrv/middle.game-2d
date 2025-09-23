import './game-page.scss';
import { AppleWormGame } from '@/game';
import { GameFooter } from '@/game/ui/game-footer/game-footer';

export const GamePage = () => (
  <div className="game-page-container">
    <AppleWormGame />
    <GameFooter />
  </div>
);
