import React from "react";
import {Link} from 'react-router-dom';
import LandingCSS from '../Styles/Landing.module.css';

export default function LandingPage(){
    return(
        <div className={LandingCSS.generalDiv}>
            <h1>WELCOME to my PokeApp!</h1>
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
             alt="pokemon :v"
             className={LandingCSS.logo} />
            <Link className={LandingCSS.link} to='/home'>
            <img src="https://www.freepnglogos.com/uploads/explosion-png/explosion-png-dbszabo-deviantart-23.png"
                 alt=":c"
                 className={LandingCSS.blow} />
                <button className={LandingCSS.catchem}> <b> Catch'em all! </b> </button>
            </Link>
        </div>
    )
}