import { AuthData, User } from '@/entities/user/model/types';

export const login = async (data: AuthData): Promise<User> => {
  console.log(data);
  return new Promise(resolve => resolve({} as User));
};
