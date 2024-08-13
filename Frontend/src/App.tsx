import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Signin from './pages/Signin';
import Signup from './pages/SignUp';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
