import React, { useState  } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frontpage from './Components/Frontpage';
import Topbar from './Components/Topbar';
import Company from './Components/Company';
import EmployeeView from './Components/EmployeeView';
import Sidebar from './Components/Sidebar';
import EmployeePage from './Components/EmployeePage';
import Adminpage from './Components/Adminpage';
import Login from './Components/Login';
import RegisterUser from './Components/RegisterUser';
import Shift from './Components/Shift'
import StartShift from './Components/StartShift';
import Start from './Components/Start';
import TotalMonth from './Components/TotalMonth'
import MonthlyHours from './Components/MonthlyHours';

const jwtFromStorage = window.localStorage.getItem('appAuthData');

function App() {

  const [ userJwt, setUserJwt ] = useState(jwtFromStorage);

  return (<div>
    <div>Auth status: { userJwt != null ? "Logged in": "Not logged in" } </div>
  
    <div className="App">
        <BrowserRouter>
        <Topbar/>
        <Routes>
          <Route path = "/" element = { < Frontpage />} />
          <Route path = "/Company" element = { < Company />} />
          <Route path = "/Employees" element = { <EmployeeView  setUserJwt={ userJwt }/> } />
          <Route path = '/employee/:idUser' element = { <EmployeePage setUserJwt={ userJwt }/> } />
          <Route path = '/adminpage' element = { <Adminpage/> } />
          <Route path = '/login' element = { <Login setUserJwt={ setUserJwt }/>} />
          <Route path = '/register' element = {<RegisterUser  setUserJwt={ userJwt }/>} />
          <Route path = '/shift' element = { <Shift userJwt={ userJwt }/> } />
          <Route path = '/shiftstart/:userId' element = { <StartShift userJwt={ userJwt }/> } />
          <Route path = '/start' element = { <Start userJwt={ userJwt }/>} />
          <Route path = '/monthly/:idUser/:month' element = { <MonthlyHours userJwt={ userJwt } /> } />
          <Route path = '/monthly' element = { <TotalMonth userJwt={ userJwt } /> } />
        </Routes>
        </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
