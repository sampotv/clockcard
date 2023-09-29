import React, { useState } from 'react';

import '../App.css';

function Register(props) {

  const { userJwt } = props
console.log(userJwt)
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ firstname, setFname ] = useState('');
    const [ lastname, setLname ] = useState('');
    const [ message, setMessage] = useState('');  // to store success or error message
  
let addSubmit = async (e) => {
    e.preventDefault();
    
 try {        
    let res = await fetch(`http://localhost:5002/user` , {
    method: 'POST',
    headers: {"Content-Type": "application/json",
  },
    body: JSON.stringify( {
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname
    }),
}).then((res)=>
res.json());

    if (res.status === 200) {
        
        setUsername('');
        setPassword('');
        setFname('');
        setLname('');
        setMessage('Käyttäjä lisätty!');
    } else {
        setMessage("Error occured");
    }
} catch(err){
    console.log(err);

    }
};


  return (
    <div className="alignCenter">
        <p>
        Luo itsellesi uusi käyttäjätunnus
        </p>
            <form onSubmit={ addSubmit}>
                <div className='addText'>Anna käyttäjänimi: 
                  <input type="text"  value = { username} placeholder='Käyttäjätunnus' className='addBox' onChange = {(e) => setUsername(e.target.value)}></input></div>
                <div className='addText'>Anna salasana:
                  <input type="password"  value = { password }placeholder='Salasana' className='addBox' onChange = {(e) => setPassword(e.target.value)}></input></div>
                <div className='addText'>Etunimi: 
                  <input type="text" value ={ firstname } placeholder='Etunimi' className='addBox' onChange = {(e) => setFname(e.target.value)}></input></div>
                <div className='addText'>Sukunimi: 
                  <input type="text" value ={ lastname } placeholder='Sukunimi' className='addBox' onChange = {(e) => setLname(e.target.value)}></input></div>

                <div><button className='loginButton'type='submit'>Luo käyttäjä</button></div>
                <div className="message">{message ? <p>Käyttäjätunnus luotu</p> : null}</div>
            </form>
    </div>
  )
}
export default Register;
