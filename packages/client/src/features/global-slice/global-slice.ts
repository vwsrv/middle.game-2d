import { IUserData } from '@/entities/auth/types';
import { IGlobalStore } from '@/shared/global-store/global-store.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IGlobalStore = {
  language: 'en',
  isAuth: false,
  user: null,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setUser(state, action: PayloadAction<IUserData | null>) {
      state.user = action.payload;
    },
  },
});

export const { setLanguage, setIsAuth, setUser } = globalSlice.actions;
export default globalSlice.reducer;
