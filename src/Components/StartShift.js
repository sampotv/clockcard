import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Axios from 'axios';

function StartShift(props) {

    const { userJwt } = props
    if(userJwt != null) {
        var decoded = jwt_decode(userJwt);
    }

    const [ shiftstart, setShiftstart] = useState('');
    const [ message, setMessage] = useState();
    

    //const {userId} = useParams('');


    let addSubmit = async (e) => {
        e.preventDefault();
     
    
        console.log(userJwt);
     try {        
        let res = await fetch(`http://localhost:5002/shiftstart/${decoded.idUser}` , {
        method: 'POST',
        headers: {"Content-Type": "application/json",
        'Authorization': 'Bearer ' + props.userJwt
      },
        body: JSON.stringify( {
            //shiftstart: shiftstart,
            idUser: decoded.idUser
        }),
    }).then((res)=>
    res.json());
    //console.log(decoded)
        //console.log(props.userJwt);
        if (res.status === 200) {

            //setShiftstart('');
            setMessage('Vuoro aloitettu!');
        } else {
            setMessage("Vuoro aloitettu");
        }
    } catch(err){
      setMessage("jotain meni pieleen");
        console.log(err);   
        }
    };

    /*
    const startShift = () => {
        Axios.post(`http://localhost:5002/shiftstart/${decoded.idUser}`, {

            idUser: decoded.idUser
       }).then(() =>{
         console.log("success");
       });
     };
*/


     if (userJwt == null){
        return (
            <div><h2> You are logged out.</h2>
            <Link to={`/Login`} ><button className='loginBox'type='submit'>Login</button></Link>
            </div>
        )}

  return (
    <div>
    <div>startShift
    
    </div>
    <form onSubmit={ addSubmit }>
    
    
      
    <button className='appButton' type='submit' >Aloita vuoro</button>
    
    <div className="message">{ message }</div>
    </form>
    </div>
  )
}

export default StartShift;