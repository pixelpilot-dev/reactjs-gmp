import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';

import { moviesApi } from './movies/api';

const rootReducer = combineReducers({
  [moviesApi.reducerPath]: moviesApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(moviesApi.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
