import React, {useEffect} from "react";
import Navbar from "./Navbar";
import { getPokemonDetail } from "../Actions";
import { clearDetail } from "../Store/Slices";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function PokeDetail(){ //Antes de React v.4, aquí recibía una "prop"
    const dispatch = useDispatch();
    const {id} = useParams(); //y aquí la copiaba a una const con "props.match.params"
    const { detail } = useSelector(state=>state.reducer);

    useEffect(()=>{
        dispatch(getPokemonDetail(id));
        return dispatch(clearDetail());
    },[dispatch],id)

    return(
        <div>
            <Navbar/>
            {detail ? (<div>
                <img src={detail.image} alt="sin foto" /> <br />
                <h1>#{detail.id} - <b>{detail.name.toUpperCase()}</b></h1> <br />
                <h3>Tipos: </h3>
                {detail.types.map((t,i)=>
                    <span key={i}> {t.name} </span>)} <br />
                <section>
                    <h3> Estadísitcas: </h3>
                    <span> Salud: {detail.hp} </span>
                    <span> Fuerza: {detail.attack} </span>
                    <span> Defensa: {detail.defense} </span>
                    <span> Velocidad: {detail.speed} </span>
                </section> 
                <br />
                <section>
                    <h3>Medidas: </h3>
                    <span>Altura: {detail.height}</span>
                    <span>Peso: {detail.weight}</span>
                </section>
            </div>): 
                <div>
                    <img src="https://i.pinimg.com/originals/4b/80/c0/4b80c01ccd0042f9b397924752a79661.gif" alt="image not found" />
                    <h3>Cargando detalle...</h3>
                </div>
            }
        </div>
    )
}

{/* <div>
<img src="https://i.pinimg.com/originals/4b/80/c0/4b80c01ccd0042f9b397924752a79661.gif" alt="image not found" />
<h3>Cargando detalle...</h3>
</div> */}