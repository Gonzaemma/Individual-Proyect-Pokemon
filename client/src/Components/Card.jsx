import React from "react";
import CardCSS from '../Styles/Card.module.css';

export default function Card({image, name, types}){
    //alternativa si llega un url de imagen vacío! :v
    if(!image.length) image="https://cdna.artstation.com/p/assets/images/images/017/645/126/large/antoine-van-bergen-pokeball-avb2.jpg?1556806249"
    return(
        <div className={CardCSS.card}>
            <img src={image} alt="nadita" width="250px"/>
            <h2>{name}</h2>
            <ul>
                {types.map((t,i)=>{
                    return <li key={i}>{t.name}</li>
                })}
            </ul>
        </div>
    )
}