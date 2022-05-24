import React, {useEffect} from "react";
import Navbar from "./Navbar";
import { getPokemonDetail } from "../Actions";
import { clearDetail } from "../Store/Slices";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DetailCSS from "../Styles/Detail.module.css"

export default function PokeDetail(){ //Antes de React v.4, aquí recibía una "prop"
    const dispatch = useDispatch();
    const {id} = useParams(); //y aquí la copiaba a una const con "props.match.params"
    const { detail } = useSelector(state=>state.reducer);

    useEffect(()=>{
        dispatch(getPokemonDetail(id));
        return dispatch(clearDetail());
    },[dispatch, id])

    return(
        <div>
            <Navbar/>
            {detail ? (<div  className={DetailCSS.detailDiv}>

                <div className={DetailCSS.detailDiv2}>
                    <img src={detail.image} alt="sin foto" /> <br />
                    {typeof detail.id !== "string"? (<h1>#{detail.id} - <b>{detail.name.toUpperCase()}</b></h1>):
                     (<p><b>#</b> {detail.id} - <b>{detail.name.toUpperCase()}</b></p>)}
                </div>

                <div className={DetailCSS.detailDiv2}>
                    <section className={DetailCSS.stats}>
                        <h3>Tipos: </h3>
                        {detail.types.map((t,i)=>
                            <span className={DetailCSS[t.name]} key={i}> {t.name} </span>)}
                    </section>

                    <section className={DetailCSS.stats}>
                        <h3> Estadísticas: </h3>
                        <span className={DetailCSS.stat1}> Salud: {detail.hp} </span>
                        <span className={DetailCSS.stat2}> Fuerza: {detail.attack} </span>
                        <span className={DetailCSS.stat3}> Defensa: {detail.defense} </span>
                        <span className={DetailCSS.stat4}> Velocidad: {detail.speed} </span>
                    </section> 
                    
                    <section className={DetailCSS.stats}>
                        <h3>Medidas: </h3>
                        <span>Altura: {detail.height}</span>
                        <span>Peso: {detail.weight}</span>
                    </section>
                </div>
            </div>): 
                <div className={DetailCSS.loading}>
                    <img src="https://i.pinimg.com/originals/4b/80/c0/4b80c01ccd0042f9b397924752a79661.gif" alt="nada" />
                    <h3>Cargando detalle...</h3>
                </div>
            }
        </div>
    )
}