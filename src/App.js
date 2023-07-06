import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frontpage from './Components/Frontpage';
import Topbar from './Components/Topbar';
import Company from './Components/Company';
import EmployeeView from './Components/EmployeeView';
import Sidebar from './Components/Sidebar';
import EmployeePage from './Components/EmployeePage';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Topbar/>
        <Routes>
          <Route path = "/" element = { < Frontpage />} />
          <Route path = "/Company" element = { < Company />} />
          <Route path = "/Employees" element = { <EmployeeView/> } />
          <Route path = '/employee/:idUser' element = { <EmployeePage/> } />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
