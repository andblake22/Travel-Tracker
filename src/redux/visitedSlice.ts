// redux/visitedSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface VisitedState {
  countries: string[];
  states: string[];
}

const initialState: VisitedState = {
  countries: [], // Array for visited country IDs
  states: [],    // Array for visited US state IDs
};

const visitedSlice = createSlice({
  name: 'visited',
  initialState,
  reducers: {
    addCountry: (state, action) => {
      state.countries.push(action.payload);
    },
    removeCountry: (state, action) => {
      state.countries = state.countries.filter(id => id !== action.payload);
    },
    addState: (state, action) => {
      state.states.push(action.payload);
    },
    removeState: (state, action) => {
      state.states = state.states.filter(id => id !== action.payload);
    },
  },
});

export const { addCountry, removeCountry, addState, removeState } = visitedSlice.actions;
export default visitedSlice.reducer;
