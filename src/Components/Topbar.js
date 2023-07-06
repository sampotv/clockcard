import React from 'react';
import { Link } from 'react-router-dom'

export default function TopBar() {

   
    function logout(){
        window.location.reload()
    }
    return (
        <div className='topBar'>
            <div className=''>
                <div className=''>EMPLOYEE CLOCKCARD ADMIN TOOL</div>
                    <div className='topBarFlex'>                
                    <div className='topBarElements'><Link to = "/">Frontpage</Link></div>
                    <div className='topBarElements'><Link to = "/Company">Company</Link></div>
                    <div className='topBarElements'><Link to ="/Employees">Employees</Link></div>
                    <div className='topBarElements'><Link to ="/Dayview">Dayview</Link></div>
                    <div className='topBarElements'><Link onClick={logout} to ="/">Logout</Link></div>
                    </div>
            </div>
        </div>
        
    )
}