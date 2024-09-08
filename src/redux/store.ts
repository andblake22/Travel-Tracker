import { configureStore } from '@reduxjs/toolkit';
import visitedReducer from './visitedSlice'; // Import the visitedSlice reducer

const store = configureStore({
  reducer: {
    visited: visitedReducer, // Assign the visitedSlice to the visited key in the store
  },
});

export default store;
