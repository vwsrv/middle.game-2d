import { configureStore } from '@reduxjs/toolkit';
import globalSlice from '@/features/global-slice/global-slice';

const global_store = configureStore({
  reducer: {
    global: globalSlice,
  },
});

export default global_store;
