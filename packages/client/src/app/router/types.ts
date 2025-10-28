export interface IUser {
  id: string;
  name: string;
  count: number;
  level: number;
}

export interface IAudioHooksProps {
  isPlaying: boolean;
  play: () => Promise<void>;
  pause: () => void;
  stop: () => void;
}
