import { GRID_SIZE } from '../constants/constants';
import { Direction, Game, Level, Position } from '../types/types';

export class AppleWormGameEngine {
  private levels: Level[];
  private game: Game;
  private onUpdate: (game: Game) => void;
  private animationFrameId: number | null = null;

  constructor(levels: Level[], onUpdate: (game: Game) => void) {
    this.levels = levels;
    this.onUpdate = onUpdate;
    this.game = this.createInitialGameState();
  }

  private createInitialGameState(): Game {
    return {
      snake: [],
      apples: [],
      score: 0,
      state: 'PLAYING',
      currentLevel: 0,
      exit: { x: 0, y: 0 },
      isFalling: false,
    };
  }

  start() {
    this.initLevel(0);
    this.runGame();
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  restart() {
    this.initLevel(0);
  }

  getGameState(): Game {
    return this.game;
  }

  private runGame() {
    this.onUpdate(this.game);
  }

  private initLevel(levelIndex: number) {
    const level = this.levels[levelIndex];
    this.game = {
      ...this.game,
      snake: [...level.start],
      apples: [...level.apples],
      score: levelIndex === 0 ? 0 : this.game.score,
      state: 'PLAYING',
      currentLevel: levelIndex,
      exit: level.exit,
      isFalling: false,
    };
    this.onUpdate(this.game);
  }

  move(direction: Direction) {
    if (this.game.state !== 'PLAYING' || this.game.isFalling) return;

    const head = { ...this.game.snake[0] };
    this.moveHead(head, direction);

    if (this.checkCollision(head, this.game.snake)) return;

    const newSnake = [head, ...this.game.snake];

    // Check exit condition
    if (this.checkExit(head, this.game.exit)) {
      if (this.game.currentLevel < this.levels.length - 1) {
        this.initLevel(this.game.currentLevel + 1);
      } else {
        this.game.state = 'LEVEL_COMPLETE';
      }
      this.onUpdate(this.game);
      return;
    }

    const appleIndex = this.game.apples.findIndex(
      a => a.x === head.x && a.y === head.y,
    );

    if (appleIndex !== -1) {
      this.game.apples.splice(appleIndex, 1);
      this.game.score += 1;
    } else {
      newSnake.pop();
    }

    this.game.snake = newSnake;
    this.processFall();
    this.onUpdate(this.game);
  }

  private moveHead(head: Position, direction: Direction) {
    switch (direction) {
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
  }

  private isReachedBottom(pos: Position): boolean {
    return pos.y >= GRID_SIZE - 1;
  }

  private isSegmentSupported(snake: Position[]): boolean {
    const level = this.levels[this.game.currentLevel];
    return snake.some(segment => {
      if (level.walls.some(w => w.x === segment.x && w.y === segment.y + 1))
        return true;
      return false;
    });
  }

  private checkCollision(head: Position, snake: Position[]): boolean {
    const level = this.levels[this.game.currentLevel];
    const hasWallCollision = level.walls.some(
      w => w.x === head.x && w.y === head.y,
    );
    if (hasWallCollision) return true;
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0) return true;
    return snake.slice(1).some(s => s.x === head.x && s.y === head.y);
  }

  private checkExit(head: Position, exit: Position): boolean {
    return head.x === exit.x && head.y === exit.y;
  }

  private processFall() {
    if (this.isSegmentSupported(this.game.snake)) {
      this.game.isFalling = false;
      return;
    }

    const fallenSnake = this.game.snake.map(seg => ({
      ...seg,
      y: seg.y + 1,
    }));

    if (fallenSnake.some(this.isReachedBottom.bind(this))) {
      this.game.state = 'GAME_OVER';
      this.game.isFalling = false;
      this.onUpdate(this.game);
      return;
    }

    this.game.isFalling = true;
    this.game.snake = fallenSnake;
    this.onUpdate(this.game);

    setTimeout(() => {
      this.processFall();
    }, 70);
  }
}
