import React from "react";
import {Link} from 'react-router-dom';
import LandingCSS from '../Styles/Landing.module.css';

export default function LandingPage(){
    return(
        <div className={LandingCSS.generalDiv}>
            <h1>WELCOME to my PokeApp!</h1>
            <Link to='/home'>
                <button className={LandingCSS.gotem}>Got'em all!</button>
            </Link>
        </div>
    )
}