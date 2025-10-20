import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard'; // Assuming you will create this file

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
