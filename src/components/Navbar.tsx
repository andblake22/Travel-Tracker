import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/us">US Map</Link>
        </li>
        <li>
          <Link to="/world">World Map</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
