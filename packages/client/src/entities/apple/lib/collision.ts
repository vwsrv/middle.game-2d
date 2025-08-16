import { Position } from '@/entities/worm/model/types';

export const checkAppleCollision = (
  wormHead: Position,
  apple: Position,
): boolean => {
  return wormHead.x === apple.x && wormHead.y === apple.y;
};
