import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Neworder from './components/Neworder';

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/dash' element={<Neworder/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
