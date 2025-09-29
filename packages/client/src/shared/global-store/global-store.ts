import { configureStore, combineReducers } from '@reduxjs/toolkit';
import globalSlice from '@/features/global-slice/global-slice';

// Создаем rootReducer с combineReducers для правильной типизации
const rootReducer = combineReducers({
  global: globalSlice,
});

// Экспортируем типы
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];

// Фабрика для создания store с поддержкой initialState
export const createStore = (initialState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
};

// Дефолтный store для клиента (без initialState)
const global_store = createStore();

export default global_store;
