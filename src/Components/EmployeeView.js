import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function EmployeeView() {

    const [ employee, setEmployee] = useState([]);


useEffect( () => {
    async function employee() {
    const response = await axios.get(
    `http://localhost:5002/employee`);
    setEmployee(response.data); }
    employee();
}, [])

    return (
        <div>
            <h2>Employee stats</h2>
            {employee.map((employee) =>       
                <div className='formflex' >
                <div className='employeeText' >
                    {employee.firstname}</div>
                <div className='' ><div className='employeeText' >
                    {employee.lastname}</div></div>
                    <div><Link to={`/employee/${employee.idUser}`}><button className='' >Open employee page</button></Link></div>
                    <div><Link to={`/monthly/${employee.idUser}/9`}><button className='' >Open monthly hours</button></Link></div>                                        
                </div>          
        )}
        </div>
    )
}