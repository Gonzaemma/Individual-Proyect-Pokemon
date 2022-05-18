import React from "react";
import CardCSS from '../Styles/Card.module.css';

export default function Card({image, name, types}){
    return(
        <div className={CardCSS.card}>
            <img src={image} alt="nadita" width="250px"/>
            <h3>{name}</h3>
            <ul>
                {types.map((t,i)=>{
                    return <li key={i}>{t.name}</li>
                })}
            </ul>
        </div>
    )
}