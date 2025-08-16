export type { Worm, Direction, WormSegment } from './model/types';
export { INITIAL_WORM_SEGMENTS } from './model/constants';
export { moveWorm, updateWormDirection } from './lib/move';
export { growWorm, shrinkWorm } from './lib/grow';
export { checkSelfCollision, checkWallCollision } from './lib/collision';
