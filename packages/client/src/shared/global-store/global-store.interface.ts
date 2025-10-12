import { IUserData } from '@/entities/auth/types/auth.type';

export interface IGlobalStore {
  language: string;
  user: IUserData | null;
  isAuth?: boolean;
}
