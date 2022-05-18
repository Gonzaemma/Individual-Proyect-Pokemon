import React from "react";
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <div>
            <h1>WELCOME to my PokeApp!</h1>
            <Link to='/home'>
                <button>Got'em all!</button>
            </Link>
        </div>
    )
}