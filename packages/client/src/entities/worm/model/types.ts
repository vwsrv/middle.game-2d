export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Position {
  x: number;
  y: number;
}

export interface WormSegment {
  x: number;
  y: number;
}

export interface Worm {
  segments: WormSegment[];
  direction: Direction;
  nextDirection: Direction; // Для плавного управления
}
