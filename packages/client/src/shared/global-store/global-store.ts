import { configureStore } from '@reduxjs/toolkit';
import globalReducer from '@/features/global-slice/globalSlice';

const global_store = configureStore({
  reducer: {
    global: globalReducer,
  },
});

export default global_store;
