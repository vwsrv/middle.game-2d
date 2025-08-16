import { Worm, Position } from '../model/types';

export const moveWorm = (worm: Worm): Position => {
  const head = { ...worm.segments[0] };

  switch (worm.nextDirection) {
    case 'UP':
      head.y -= 1;
      break;
    case 'DOWN':
      head.y += 1;
      break;
    case 'LEFT':
      head.x -= 1;
      break;
    case 'RIGHT':
      head.x += 1;
      break;
  }

  return head;
};

export const checkSelfCollision = (
  head: Position,
  segments: Position[],
): boolean => {
  return segments.some(segment => segment.x === head.x && segment.y === head.y);
};
