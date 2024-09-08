import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addState, removeState } from '../redux/visitedSlice'; // Redux actions for states
import { ReactComponent as USMapSVG } from '../assets/usa.svg'; // Import the US map SVG as a React component

const USMap: React.FC = () => {
  const visitedStates = useSelector((state: any) => state.visited.states); // Redux state for visited states
  const dispatch = useDispatch();
  const svgRef = useRef<SVGSVGElement>(null); // Reference to the SVG

  // Function to toggle the visited state of a US state
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

      // Function to handle click
      const handleClick = (event: any) => {
        const stateId = event.target.id;
        toggleStateVisited(stateId);
      };

      // Update the fill color based on whether the state is visited or not
      paths.forEach((path) => {
        const stateId = path.id;
        if (visitedStates.includes(stateId)) {
          path.setAttribute('fill', 'green'); // Visited color
        } else {
          path.setAttribute('fill', 'gray'); // Not visited color
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
  }, [visitedStates]); // Effect runs whenever visitedStates changes

  return (
    <div>
      <h1>US Map</h1>
      <div>
        {/* Bind the SVG reference for direct manipulation */}
        <USMapSVG ref={svgRef} />
      </div>
    </div>
  );
};

export default USMap;
