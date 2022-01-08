import React from 'react';
import './App.css';
import Elevator from './components/Elevator';

function App() {
  return (
    <div className="App bg-[#323b40]">
      <div className="text-white w-full mx-auto md:max-w-[450px] min-h-screen flex flex-column items-end justify-center">
        <Elevator />
      </div>
    </div>
  );
}

export default App;
