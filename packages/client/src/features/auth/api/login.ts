import { AuthData, User } from '@/entities/user/model/types';

export const login = async (data: AuthData): Promise<User> => {
  return new Promise(resolve => resolve({} as User));
};
