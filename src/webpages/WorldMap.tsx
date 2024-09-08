import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCountry, removeCountry } from '../redux/visitedSlice'; // Redux actions
import { ReactComponent as WorldMapSVG } from '../assets/world.svg'; // Import SVG as React component

const WorldMap: React.FC = () => {
  const visitedCountries = useSelector((state: any) => state.visited.countries); // Redux state for visited countries
  const dispatch = useDispatch();
  const svgRef = useRef<SVGSVGElement>(null); // Reference to the SVG
  const [editMode, setEditMode] = useState(false); // Edit mode state

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Add or remove a country based on its visited state
  const toggleCountryVisited = (countryId: string) => {
    if (visitedCountries.includes(countryId)) {
      dispatch(removeCountry(countryId)); // Remove from visited
    } else {
      dispatch(addCountry(countryId)); // Add to visited
    }
  };

  useEffect(() => {
    const svgElement = svgRef.current;
    if (svgElement) {
      const paths = svgElement.querySelectorAll('path'); // Select all path elements

      const handleClick = (event: any) => {
        if (editMode) { // Only allow clicks when edit mode is enabled
          const countryId = event.target.id;
          toggleCountryVisited(countryId);
        }
      };

      paths.forEach((path) => {
        const countryId = path.id;
        if (visitedCountries.includes(countryId)) {
          path.setAttribute('fill', 'green'); // Mark as visited
        } else {
          path.setAttribute('fill', 'gray'); // Mark as not visited
        }

        // Attach event listeners
        path.addEventListener('click', handleClick);
      });

      // Clean up event listeners when the component unmounts or updates
      return () => {
        paths.forEach((path) => {
          path.removeEventListener('click', handleClick);
        });
      };
    }
  }, [visitedCountries, editMode]); // Effect runs when visitedCountries or editMode changes

  return (
    <div>
      <h1>World Map</h1>
      
      {/* Toggle edit mode */}
      <button onClick={toggleEditMode}>
        {editMode ? 'Disable Edit Mode' : 'Enable Edit Mode'}
      </button>

      {/* Render the SVG */}
      <div>
        <WorldMapSVG ref={svgRef} />
      </div>
    </div>
  );
};

export default WorldMap;
