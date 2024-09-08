import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCountry, removeCountry } from '../redux/visitedSlice'; // Redux actions
import { ReactComponent as WorldMapSVG } from '../assets/world.svg'; // Import SVG as React component

const WorldMap: React.FC = () => {
  const visitedCountries = useSelector((state: any) => state.visited.countries); // Redux state for visited countries
  const dispatch = useDispatch();
  const svgRef = useRef<SVGSVGElement>(null); // Reference to the SVG

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

      // Function to handle click
      const handleClick = (event: any) => {
        const countryId = event.target.id;
        toggleCountryVisited(countryId);
      };

      // Update the fill color based on whether the country is visited or not
      paths.forEach((path) => {
        const countryId = path.id;
        if (visitedCountries.includes(countryId)) {
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
  }, [visitedCountries]); // Effect runs whenever visitedCountries changes

  return (
    <div>
      <h1>World Map</h1>
      <div>
        {/* Bind the SVG reference for direct manipulation */}
        <WorldMapSVG ref={svgRef} />
      </div>
    </div>
  );
};

export default WorldMap;

