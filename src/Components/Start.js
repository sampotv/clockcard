import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

function AddSlot(props){

    const { userJwt } = props
    if(userJwt != null) {
        var decoded = jwt_decode(userJwt);
    }
    let navigate = useNavigate();
   

    const [item, setItem] = useState([]);
    const [messageStart, setMessageStart] = useState();
    const [messageStop, setMessageStop] = useState();

    let startShift = async (e) => {
        e.preventDefault();
        
        try {
            let res = await fetch(`http://localhost:5002/shiftstart/${decoded.idUser}`, {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': 'Bearer ' + props.userJwt
                },
                body: JSON.stringify({

                    idUser: decoded.idUser
                }),
              }).then((res) =>
                res.json());
                //navigate(`/addslot/${decoded.idCompany}`, { replace: true });
                
              if (res.status === 200) {

        
                setMessageStart('Error occured');
              } else {
                
                setMessageStart("Vuoro aloitettu");
                //navigate(`/empty`);
                setTimeout(() => {
                  //navigate(`/addslot/${decoded.idCompany}`, { replace: true });
                }  
              )}
            } catch (err) {
              console.log(err);
        
            }
          };

    let stopShift = async (e) => {
            e.preventDefault();
            
            try {
                let res = await fetch(`http://localhost:5002/shiftend/${decoded.idUser}`, {
                    method: 'POST',
                    headers: {
                      "Content-Type": "application/json",
                      'Authorization': 'Bearer ' + props.userJwt
                    },
                    body: JSON.stringify({
    
                        idUser: decoded.idUser
                    }),
                  }).then((res) =>
                    res.json());
                    //navigate(`/addslot/${decoded.idCompany}`, { replace: true });
                    
                  if (res.status === 200) {
    
            
                    setMessageStop('Error occured');
                  } else {
                    
                    setMessageStop("Vuoro lopetettu");
                    //navigate(`/empty`);
                    setTimeout(() => {
                      //navigate(`/addslot/${decoded.idCompany}`, { replace: true });
                    }  
                  )}
                } catch (err) {
                  console.log(err);
            
                }
              };

/*
          useEffect(() => {
            async function storage() {
                const response = await axios.get(
                    `https://warehouse1.herokuapp.com/lastslot/${decoded.idCompany}`);
                    setItem(response.data);  }
                    storage();        
                  }, [decoded.idCompany]);
        */

        if (userJwt == null){
          return (
              <div><h2>You are logged out.</h2>
              <Link to={`/Login`} ><button className='loginBox'type='submit'>Login</button></Link>
              </div>
          )}
    return (
        <div className="">
            <h1>Aloita/Lopeta vuoro</h1>
            <form className="addSlot" onSubmit={startShift}>
            <button className='appButton'type='submit'>Aloita vuoro</button>
            <div className="message">{messageStart} </div>
            </form>
           <div>
           <form className="addSlot" onSubmit={stopShift}>
            <button className='appButton'type='submit'>Lopeta vuoro</button>
            <div className="message">{messageStop} </div>
            </form>
           </div>
        </div>
        
    )
}
export default AddSlot;
