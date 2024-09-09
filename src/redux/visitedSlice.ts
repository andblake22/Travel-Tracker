import { createSlice } from '@reduxjs/toolkit';

interface VisitedState {
  countries: string[];
  states: string[];
}

const initialState: VisitedState = {
  countries: [],
  states: []
};

const visitedSlice = createSlice({
  name: 'visited',
  initialState,
  reducers: {
    addCountry: (state, action) => {
      state.countries.push(action.payload);
    },
    addState: (state, action) => {
      state.states.push(action.payload);
    },
    removeCountry: (state, action) => {
      state.countries = state.countries.filter(country => country !== action.payload);
    },
    removeState: (state, action) => {
      state.states = state.states.filter(stateId => stateId !== action.payload);
    }
  }
});

export const { addCountry, addState, removeCountry, removeState } = visitedSlice.actions;
export default visitedSlice.reducer;
