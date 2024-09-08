import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WorldMap from './webpages/WorldMap';
import USMap from './webpages/USMap';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/world-map" element={<WorldMap />} />
        <Route path="/us-map" element={<USMap />} />
        <Route path="/" element={<WorldMap />} />
      </Routes>
    </Router>
  );
}

export default App;
