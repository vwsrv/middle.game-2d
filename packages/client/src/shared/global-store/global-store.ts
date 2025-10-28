import { configureStore } from '@reduxjs/toolkit';
import globalSlice from '@/features/global-slice/global-slice';
import { persistStore, persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

// Функция для создания noop-storage (для сервера)
const createNoopStorage = () => {
  return {
    getItem(): Promise<string | null> {
      return Promise.resolve(null);
    },
    setItem(): Promise<void> {
      return Promise.resolve();
    },
    removeItem(): Promise<void> {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['isAuth', 'user'],
};

const persistedReducer = persistReducer(persistConfig, globalSlice);

export const global_store = configureStore({
  reducer: { global: persistedReducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: ['persist/PERSIST'] },
    }),
});

export const persistor = persistStore(global_store);

export default global_store;
