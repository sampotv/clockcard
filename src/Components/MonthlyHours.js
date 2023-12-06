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
        const getadd = await fetch(`http://localhost:5002/totalmonth/${idUser}/${month}`).then((res) =>
          res.json()
        )
        setGetAdd(getadd) }
        shiftadd()
      }, [idUser,month]);

      useEffect( () => {
        async function monthtotal() {
        const gettotal = await fetch(`http://localhost:5002/monthtotal/${idUser}/${month}`).then((res) =>
          res.json()
        )
        setGetTotal(gettotal) }
        monthtotal()
      }, [idUser,month]);


      
  return (
    <div>EmployeePage
    <div>
    {getEmp.map((employee) =>       
       <div className='formflex'>Employee name: 
       <div className='employeeText' ><div className='' > {employee.firstname}</div></div>
       <div className='' ><div className='employeeText'> {employee.lastname} </div></div>
       <div className='formflex'>Valitse kuukausi: 
        <div className='slidetextright10'><div><Link to={`/monthly/${employee.idUser}/1`}><button className='' >1</button></Link></div></div>
        <div className='slidetextright10'><div><Link to={`/monthly/${employee.idUser}/2`}><button className='' >2</button></Link></div></div>
        <div className='slidetextright10'><div><Link to={`/monthly/${employee.idUser}/3`}><button className='' >3</button></Link></div></div>
        <div className='slidetextright10'><div><Link to={`/monthly/${employee.idUser}/4`}><button className='' >4</button></Link></div></div>
        <div className='slidetextright10'><div><Link to={`/monthly/${employee.idUser}/5`}><button className='' >5</button></Link></div></div>
        <div className='slidetextright10'><div><Link to={`/monthly/${employee.idUser}/6`}><button className='' >6</button></Link></div></div>
        <div className='slidetextright10'><div><Link to={`/monthly/${employee.idUser}/7`}><button className='' >7</button></Link></div></div>
        <div className='slidetextright10'><div><Link to={`/monthly/${employee.idUser}/8`}><button className='' >8</button></Link></div></div>
        <div className='slidetextright10'><div><Link to={`/monthly/${employee.idUser}/9`}><button className='' >9</button></Link></div></div>
        <div className='slidetextright10'><div><Link to={`/monthly/${employee.idUser}/10`}><button className='' >10</button></Link></div></div>
        <div className='slidetextright10'><div><Link to={`/monthly/${employee.idUser}/11`}><button className='' >11</button></Link></div></div>
        <div className='slidetextright10'><div><Link to={`/monthly/${employee.idUser}/12`}><button className='' >12</button></Link></div></div>
      </div>       
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