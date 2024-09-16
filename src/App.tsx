import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import USMap from './components/USMap';
import WorldMap from './components/WorldMap';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/us" element={<USMap />} />
          <Route path="/world" element={<WorldMap />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
