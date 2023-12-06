import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MonthlyHours() {

    const [getEmp, setGetEmp] = useState([]);
    const [getAdd, setGetAdd] = useState([]);
    const [getLength, setGetLength] = useState([]);
    const [getTotal, setGetTotal] = useState([]);
    const {idUser, month} = useParams();

    useEffect( () => {
        async function employeeget() {
        const getemp = await fetch(`http://localhost:5002/employee/${idUser}`).then((res) =>
          res.json()
        )
        setGetEmp(getemp) }
        employeeget()
      }, [idUser]);

      useEffect( () => {
        async function shiftlength() {
        const getlength = await fetch(`http://localhost:5002/shiftlength/${idUser}`).then((res) =>
          res.json()
        )
        setGetLength(getlength) }
        shiftlength()
      }, [idUser]);

      useEffect( () => {
        async function shiftadd() {
        const getadd = await fetch(`http://localhost:5002/totalmonth/${idUser}/9`).then((res) =>
          res.json()
        )
        setGetAdd(getadd) }
        shiftadd()
      }, [idUser]);

      useEffect( () => {
        async function monthtotal() {
        const gettotal = await fetch(`http://localhost:5002/monthtotal/${idUser}/9`).then((res) =>
          res.json()
        )
        setGetTotal(gettotal) }
        monthtotal()
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
      
        {getTotal.map((monthtotal) =>       
        <div className='formflex'>
        <div className='formstation' ><div className='slidetextright' >Shift start: {monthtotal.start}</div></div>
        <div className='formstation' ><div className='slidetextright'>Shift end: {monthtotal.end} </div></div>
        <div className='formstation' ><div className='slidetextright'>Shift length: {monthtotal.shiftlength} </div></div>
       
        </div>
        )} 
        {getAdd.map((add) =>       
        <div className='formflex'>
        <div className='formstation' ><div className='slidetextright' >Total time: {add.totaltime}</div></div>    
        </div>
        )} 
        <div>
          
          </div>
    </div></div>
  )
}

export default MonthlyHours



/*<select className=''
            type="text"
            value={month}
            placeholder="Valitse kuukausi"
            onChange={(e) => setMonth(e.target.value)}>
            <option value="6">6</option>
            <option value="9">9</option>
            
          </select>
*/