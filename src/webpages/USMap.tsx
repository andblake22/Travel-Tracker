import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addState, removeState } from '../redux/visitedSlice'; // Redux actions for states
import { ReactComponent as USMapSVG } from '../assets/usa.svg'; // Import US map as React component

const USMap: React.FC = () => {
  const visitedStates = useSelector((state: any) => state.visited.states); // Redux state for visited states
  const dispatch = useDispatch();
  const svgRef = useRef<SVGSVGElement>(null); // Reference to the SVG
  const [editMode, setEditMode] = useState(false); // Edit mode state

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Add or remove a state based on its visited state
  const toggleStateVisited = (stateId: string) => {
    if (visitedStates.includes(stateId)) {
      dispatch(removeState(stateId)); // Remove from visited states
    } else {
      dispatch(addState(stateId)); // Add to visited states
    }
  };

  useEffect(() => {
    const svgElement = svgRef.current;
    if (svgElement) {
      const paths = svgElement.querySelectorAll('path'); // Select all path elements

      const handleClick = (event: any) => {
        if (editMode) { // Only allow clicks when edit mode is enabled
          const stateId = event.target.id;
          toggleStateVisited(stateId);
        }
      };

      paths.forEach((path) => {
        const stateId = path.id;
        if (visitedStates.includes(stateId)) {
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
  }, [visitedStates, editMode]); // Effect runs when visitedStates or editMode changes

  return (
    <div>
      <h1>US Map</h1>
      
      {/* Toggle edit mode */}
      <button onClick={toggleEditMode}>
        {editMode ? 'Disable Edit Mode' : 'Enable Edit Mode'}
      </button>

      {/* Render the SVG */}
      <div>
        <USMapSVG ref={svgRef} />
      </div>
    </div>
  );
};

export default USMap;
