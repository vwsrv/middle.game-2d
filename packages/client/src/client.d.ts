import { RootState } from '@/shared/global-store/global-store';

declare const __SERVER_PORT__: number;

declare global {
  interface Window {
    __INITIAL_STATE__?: Partial<RootState>;
  }
}
