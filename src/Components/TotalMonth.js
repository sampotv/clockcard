import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from "axios";

function TotalMonth(props) {

    const { userJwt } = props
    if(userJwt != null) {
        var decoded = jwt_decode(userJwt);
    }

    const [monthly, setMonthly] = useState('');

    useEffect(() => {
        async function month() {
            const response = await axios.get(
                `http://localhost:5002/totalmonth/${decoded.idUser}`);
                setMonthly(response.data);  }
                month();        
              }, [decoded.idUser]);
    
    if (userJwt == null){
      return (
          <div><h2>You are logged out.</h2>
          <Link to={`/Login`} ><button className='loginBox'type='submit'>Login</button></Link>
          </div>
      )}

  return (
    <div>TotalMonth
        {monthly.map((month) => (
            <div>
                {month.totaltime} {month.idUser}
            </div>
        )
        
        )        }

</div>
  )
}

export default TotalMonth