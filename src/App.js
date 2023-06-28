import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frontpage from './Components/Frontpage';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path = "/" element = { < Frontpage />} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
