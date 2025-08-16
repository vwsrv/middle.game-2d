// import { WormGame } from '@/features';
// import { GameBoard } from '@/widgets';

// import { GameEngine } from '@/features/game/lib/game-engine';
// import { GameBoard } from '@/features/game/ui/game-board';
// import { useState } from 'react';

// export const GamePage = () => {
//   const [engine] = useState(() => new GameEngine());

//   useGameLoop(() => {
//     engine.update();
//   });

//   return <GameBoard engine={engine} />;
// };

import { ScoreBoard } from '@/widgets/score-board';
// import { Header } from '@/widgets/header';
import { GameHeader } from '@/widgets/game-header';
import { WormGame } from '@/features';
import AppleWormGame from '@/features/game/containers/apple-worn-game/apple-worn-game';

export const GamePage = () => (
  <div>
    <GameHeader />
    {/* <WormGame /> */}
    <AppleWormGame />
    <ScoreBoard />
  </div>
);
