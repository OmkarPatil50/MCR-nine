import Landing from './Pages/Landing';
import './App.css';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing />} />
      </Routes>

    </div>
  );
}

export default App;
