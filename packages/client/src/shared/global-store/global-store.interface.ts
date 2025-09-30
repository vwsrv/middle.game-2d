import { IUserData } from '@/entities/auth/types';

export interface IGlobalStore {
  language: string;
  user: IUserData | null;
  isAuth?: boolean;
}
