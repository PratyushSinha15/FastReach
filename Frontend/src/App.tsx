import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './index.css';
import Signin from './pages/Signin';
import Signup from './pages/SignUp';
import Home from './pages/Home';
import TripPlanner from './pages/Trip-Planner';

import RouteSearch from './pages/RouteSearch';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/trip-planner" element={<TripPlanner/>} />
          <Route path="/quick-routes" element={<RouteSearch/>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </Router>
  );
}

export default App;
