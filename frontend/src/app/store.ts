import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../features/users/usersSlice.ts';
import {persistReducer, FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { artsReducer } from '../features/arts/artsSlice.ts';
const usersPersistConfig = {
  key:'art:users',
  storage: storage,
  whiteList: ['user'],
};

const rootReducer = combineReducers({
  arts: artsReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
    },
  }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;