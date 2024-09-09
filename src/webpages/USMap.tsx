import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addState, removeState } from '../redux/visitedSlice'; // Add removeState action
import { ReactComponent as USMapSVG } from '../assets/usa.svg';
import stateNames from '../models/states.json';

const USMap: React.FC = () => {
  const visitedStates = useSelector((state: any) => state.visited.states);
  const dispatch = useDispatch();
  const svgRef = useRef<SVGSVGElement>(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedState, setSelectedState] = useState<string>('');

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleAddState = () => {
    if (selectedState && !visitedStates.includes(selectedState)) {
      dispatch(addState(selectedState));
    }
  };

  const handleRemoveState = () => {
    if (selectedState && visitedStates.includes(selectedState)) {
      dispatch(removeState(selectedState));
    }
  };

  useEffect(() => {
    const svgElement = svgRef.current;
    if (svgElement) {
      const paths = svgElement.querySelectorAll('path');

      paths.forEach((path) => {
        const stateId = path.id;
        if (visitedStates.includes(stateId)) {
          path.setAttribute('fill', 'green');
        } else {
          path.setAttribute('fill', 'gray');
        }
      });
    }
  }, [visitedStates]);

  return (
    <div>
      <h1>US Map</h1>
      <button onClick={toggleEditMode}>
        {editMode ? 'Disable Edit Mode' : 'Enable Edit Mode'}
      </button>

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
          <button onClick={handleRemoveState}>Remove Visited State</button>
        </div>
      )}

      <div>
        <USMapSVG ref={svgRef} />
      </div>
    </div>
  );
};

export default USMap;
