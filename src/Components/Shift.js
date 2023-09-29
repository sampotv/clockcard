import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Axios from "axios";

 export default function Shift(props) {

    const { userJwt } = props
    if(userJwt != null) {
        var decoded = jwt_decode(userJwt);
    }

    const [ emp, setEmp] = useState([]);
    const [ user, setUser] = useState([]);
    const [ start, setStart] = useState([]); 
    const [ message, setMessage] = useState();

    useEffect(() => {
        async function user() {
            const response = await Axios.get(
                `http://localhost:5002/employee/${decoded.idUser}`);
                setUser(response.data);  }
                user();
            }, [decoded.idUser]);


    /*
useEffect( () => {
    async function emps() {
    const allEmployees = await  fetch(`http://localhost:5002/employee/${decoded.idUser}`)
    .then((res) =>
      res.json()
    )
    console.log(allEmployees)
    setEmp(allEmployees)}
    emps()
  },[decoded.idUser]);
*/

  const startS = () => {
    Axios.post(`http://localhost:5002/shiftstart/:idUser`, {

        idUser: decoded.idUser
   }).then(() =>{
     console.log("success");
   });
 };


 let addSubmit = async (e) => {
    e.preventDefault();
    console.log(userJwt);

 try {        
    let res = await fetch(`http://localhost:5002/shiftstart/${emp.idUser}` , {
    method: 'POST',
    headers: {"Content-Type": "application/json",
    'Authorization': 'Bearer ' + props.userJwt
  },
    body: JSON.stringify( {
        //shiftstart: shiftstart,
        idUser: emp.idUser
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

if (userJwt == null){
    return (
        <div><h2> You are logged out.</h2>
        <Link to={`/Login`} ><button className='loginBox'type='submit'>Login</button></Link>
        </div>
    )}

    return (
        <div>
            
            <div className="paddingTop">

  
            <button type="submit">testinappula ei käytössä</button>
            <h1>{user.map((emp) => (
        <div>
            <div key={emp.idUser} className=''>
            {emp.idUser  } <button onClick={ addSubmit }>idUser</button>
                </div>
               
                </div>
                
          )) }</h1>
      <form onSubmit={ addSubmit }><button>click</button></form>
        
        <div>
            <Link to ={`/shiftstart/${decoded.idUser}`} title="Luo itsellesi tunnus"><button> Aloita vuoro</button></Link>
            </div>
            
            
            </div>
        </div>
    )
}




/*
              <form onSubmit={startshift}><div>
                <div>
                    <select className='addBox2'
                type="text"
                value={status}
                placeholder="status"
                onChange={(e) => setStatus(e.target.value)}>
                <option value="1">Aloita</option>
                <option value="2">2</option>
          </select></div>
          </form>
          */