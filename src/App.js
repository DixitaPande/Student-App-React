import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addStudent" element={<AddStudent />} />
        <Route path="/editStudent/:id" element={<EditStudent />} />
      </Routes>
    </div>
  );
}

export default App;
