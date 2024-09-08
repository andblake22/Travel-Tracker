import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addState, removeState } from '../redux/visitedSlice'; // Import your actions

const USMap: React.FC = () => {
  // Get the list of visited US states from the Redux store
  const visitedStates = useSelector((state: any) => state.visited.states);

  // Get the dispatch function from Redux to dispatch actions
  const dispatch = useDispatch();

  // Toggle state visit status when a state is clicked
  const toggleState = (stateId: string) => {
    if (visitedStates.includes(stateId)) {
      dispatch(removeState(stateId));
    } else {
      dispatch(addState(stateId));
    }
  };

  return (
    <div>
      <h1>US Map Page</h1>
      <button onClick={() => toggleState('CA')}>Toggle California</button>
      <p>Visited States: {visitedStates.join(', ')}</p>
    </div>
  );
};

export default USMap;
