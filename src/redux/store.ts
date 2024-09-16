import { configureStore } from '@reduxjs/toolkit';
import visitedReducer from './visitedSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    visited: visitedReducer,
    user: userReducer,
  },
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
