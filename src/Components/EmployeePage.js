import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EmployeePage() {

    const [getEmp, setGetEmp] = useState([]);
    const [getShift, setGetShift] = useState([]);
    const {idUser} = useParams();

    useEffect( () => {
        async function employeeget() {
        const getemp = await fetch(`http://localhost:5002/employee/${idUser}`).then((res) =>
          res.json()
        )
        setGetEmp(getemp) }
        employeeget()
      }, [idUser]);

      useEffect( () => {
        async function shiftget() {
        const getshift = await fetch(`http://localhost:5002/shift/${idUser}`).then((res) =>
          res.json()
        )
        setGetShift(getshift) }
        shiftget()
      }, [idUser]);

  return (
    <div>EmployeePage
    <div>
    {getEmp.map((employee) =>       
       <div className='formflex'>Employee name: 
       <div className='employeeText' ><div className='' > {employee.firstname}</div></div>
       <div className='' ><div className='employeeText'> {employee.lastname} </div></div>      
       </div>
       )} 
    {getShift.map((shift) =>       
        <div className='formflex'>
        <div className='formstation' ><div className='slidetextright' >Shift start: {shift.shiftstart}</div></div>
        <div className='formstation' ><div className='slidetextright'>Shift end: {shift.shiftend} </div></div>
        <div className='formstation' ><div className='slidetextright'>Shift length: {shift.shiftlength} </div></div>
       
        </div>
        )}  
    </div></div>
  )
}

export default EmployeePage