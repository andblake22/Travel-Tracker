import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCountry, removeCountry } from '../redux/visitedSlice'; // Add removeCountry action
import { ReactComponent as WorldMapSVG } from '../assets/world.svg';
import countryNames from '../models/countries.json';

const WorldMap: React.FC = () => {
  const visitedCountries = useSelector((state: any) => state.visited.countries);
  const dispatch = useDispatch();
  const svgRef = useRef<SVGSVGElement>(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleAddCountry = () => {
    if (selectedCountry && !visitedCountries.includes(selectedCountry)) {
      dispatch(addCountry(selectedCountry));
    }
  };

  const handleRemoveCountry = () => {
    if (selectedCountry && visitedCountries.includes(selectedCountry)) {
      dispatch(removeCountry(selectedCountry));
    }
  };

  useEffect(() => {
    const svgElement = svgRef.current;
    if (svgElement) {
      const paths = svgElement.querySelectorAll('path');

      paths.forEach((path) => {
        const countryId = path.id;
        if (visitedCountries.includes(countryId)) {
          path.setAttribute('fill', 'green');
        } else {
          path.setAttribute('fill', 'gray');
        }
      });
    }
  }, [visitedCountries]);

  return (
    <div>
      <h1>World Map</h1>
      <button onClick={toggleEditMode}>
        {editMode ? 'Disable Edit Mode' : 'Enable Edit Mode'}
      </button>

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
          <button onClick={handleRemoveCountry}>Remove Visited Country</button>
        </div>
      )}

      <div>
        <WorldMapSVG ref={svgRef} />
      </div>
    </div>
  );
};

export default WorldMap;
