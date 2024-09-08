import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCountry, removeCountry } from '../redux/visitedSlice'; // Import your actions

const WorldMap: React.FC = () => {
  // Get the list of visited countries from the Redux store
  const visitedCountries = useSelector((state: any) => state.visited.countries);

  // Get the dispatch function from Redux to dispatch actions
  const dispatch = useDispatch();

  // Toggle country visit status when a country is clicked
  const toggleCountry = (countryId: string) => {
    if (visitedCountries.includes(countryId)) {
      dispatch(removeCountry(countryId));
    } else {
      dispatch(addCountry(countryId));
    }
  };

  return (
    <div>
      <h1>World Map Page</h1>
      <button onClick={() => toggleCountry('FR')}>Toggle France</button>
      <p>Visited Countries: {visitedCountries.join(', ')}</p>
    </div>
  );
};

export default WorldMap;
