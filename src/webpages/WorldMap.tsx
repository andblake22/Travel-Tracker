import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCountry } from '../redux/visitedSlice'; // Redux actions
import { ReactComponent as WorldMapSVG } from '../assets/world.svg'; // Import SVG as React component
import countryNames from '../models/countries.json'; // Import country names

const WorldMap: React.FC = () => {
  const visitedCountries = useSelector((state: any) => state.visited.countries); // Redux state for visited countries
  const dispatch = useDispatch();
  const svgRef = useRef<SVGSVGElement>(null); // Reference to the SVG
  const [editMode, setEditMode] = useState(false); // Edit mode state
  const [selectedCountry, setSelectedCountry] = useState<string>(''); // Dropdown selected country

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Add the selected country to the visited list
  const handleAddCountry = () => {
    if (selectedCountry && !visitedCountries.includes(selectedCountry)) {
      dispatch(addCountry(selectedCountry));
    }
  };

  // Update the fill color based on visited status
  useEffect(() => {
    const svgElement = svgRef.current;
    if (svgElement) {
      const paths = svgElement.querySelectorAll('path');

      paths.forEach((path) => {
        const countryId = path.id;
        if (visitedCountries.includes(countryId)) {
          path.setAttribute('fill', 'green'); // Visited color
        } else {
          path.setAttribute('fill', 'gray'); // Not visited color
        }
      });
    }
  }, [visitedCountries]);

  return (
    <div>
      <h1>World Map</h1>
      
      {/* Toggle edit mode */}
      <button onClick={toggleEditMode}>
        {editMode ? 'Disable Edit Mode' : 'Enable Edit Mode'}
      </button>

      {/* Show dropdown and add functionality only in edit mode */}
      {editMode && (
        <div>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Select a country</option>
            {Object.entries(countryNames).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          <button onClick={handleAddCountry}>Add Visited Country</button>
        </div>
      )}

      {/* Render the SVG */}
      <div>
        <WorldMapSVG ref={svgRef} />
      </div>
    </div>
  );
};

export default WorldMap;
