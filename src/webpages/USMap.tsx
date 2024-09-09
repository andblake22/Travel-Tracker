import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addState } from '../redux/visitedSlice'; // Redux actions for states
import { ReactComponent as USMapSVG } from '../assets/usa.svg'; // Import SVG as React component
import stateNames from '../models/states.json';

const USMap: React.FC = () => {
  const visitedStates = useSelector((state: any) => state.visited.states); // Redux state for visited states
  const dispatch = useDispatch();
  const svgRef = useRef<SVGSVGElement>(null); // Reference to the SVG
  const [editMode, setEditMode] = useState(false);
  const [selectedState, setSelectedState] = useState<string>('')

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Add the selected state to the visited list
  const handleAddState = () => {
    if (selectedState && !visitedStates.includes(selectedState)) {
      dispatch(addState(selectedState));
    }
  };

  // Update the fill color based on visited status
  useEffect(() => {
    const svgElement = svgRef.current;
    if (svgElement) {
      const paths = svgElement.querySelectorAll('path');

      paths.forEach((path) => {
        const stateId = path.id;
        if (visitedStates.includes(stateId)) {
          path.setAttribute('fill', 'green'); // Visited color
        } else {
          path.setAttribute('fill', 'gray'); // Not visited color
        }
      });
    }
  }, [visitedStates]);

  return (
    <div>
      <h1>US Map</h1>
      
      {/* Toggle edit mode */}
      <button onClick={toggleEditMode}>
        {editMode ? 'Disable Edit Mode' : 'Enable Edit Mode'}
      </button>

      {/* Show dropdown and add functionality only in edit mode */}
      {editMode && (
        <div>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">Select a state</option>
            {Object.entries(stateNames).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          <button onClick={handleAddState}>Add Visited State</button>
        </div>
      )}

      {/* Render the SVG */}
      <div>
        <USMapSVG ref={svgRef} />
      </div>
    </div>
  );
};

export default USMap;
