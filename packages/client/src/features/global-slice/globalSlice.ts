import { IGlobalStore } from '@/shared/global-store/global-store.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IGlobalStore = {
  language: 'en',
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setTokens(
      state,
      action: PayloadAction<{
        accessToken?: string;
        refreshToken?: string;
        userId?: string;
      }>,
    ) {
      const { accessToken, refreshToken, userId } = action.payload;
      if (accessToken) state.accessToken = accessToken;
      if (refreshToken) state.refreshToken = refreshToken;
      if (userId) state.userId = userId;
    },
    clearTokens(state) {
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.userId = undefined;
    },
  },
});

export const { setLanguage, setTokens, clearTokens } = globalSlice.actions;
export default globalSlice.reducer;
