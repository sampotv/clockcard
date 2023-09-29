import React from "react";
import { Link } from 'react-router-dom'

export default function Frontpage() {


    return (
        <div>
            <h2 className="button">Tervetuloa kellokorttipalveluun</h2>
            <Link className="button"to ="/Login" title="Kirjaudu">Kirjaudu sisään</Link>
            <Link className="button" to ="/Register" title="Luo itsellesi tunnus">Luo tunnus</Link>
        </div>
    )
}