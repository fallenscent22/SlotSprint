import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Slots from './pages/Slots';
import Confirmation from './pages/Confirmation';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/slots/:sport" element={<Slots />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;