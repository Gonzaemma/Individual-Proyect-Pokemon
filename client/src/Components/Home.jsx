import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Navbar from "./Navbar";
import Card from "./Card";
import { getPokemons, getTypes } from "../Actions";
import { filterByType, filterByCreated, orderByAttack, orderByName, clearPokes } from "../Store/Slices";
import { Link } from "react-router-dom";

import HomeCSS from '../Styles/Home.module.css';
import PaginatorBar from "./PaginatorBar";

export default function Home(){
    //ESTADOS LOCALES Y GLOBALES//
    const dispatch = useDispatch();
    const { pokemons, types } = useSelector(state => state.reducer);

    useEffect(()=>{
        !pokemons.length && dispatch(getPokemons());
        !types.length && dispatch(getTypes());
    },[dispatch])


    /* HANDLERS */
    function handleClick(e){
        e.preventDefault();
        dispatch(clearPokes());
        dispatch(getPokemons());
        
    }
    function handleTypeChange(e){
        dispatch(filterByType(e.target.value));
        setCurrentPage(1);
    }
    function handleOriginChange(e){
        if(e.target.checked){
            discheck(e);
            dispatch(filterByCreated(e.target.value));
            setCurrentPage(1);
        }else{
            dispatch(filterByCreated("all"));
            setCurrentPage(1);
        }
    }
    function handleAlphaChange(e){
        if(e.target.checked){
            discheck(e);
            dispatch(orderByName(e.target.value));
            setCurrentPage(1);
        }else{
            dispatch(orderByName("none"));
            setCurrentPage(1);
        }
    }
    function handleAttackChange(e){
        if(e.target.checked){
            discheck(e);
            dispatch(orderByAttack(e.target.value));
            setCurrentPage(1);
        }else{
            dispatch(orderByAttack("none"));
            setCurrentPage(1)
        }
    }

    function discheck(actual){ //alta función random me mandé acá :v
        var checks;
        if(actual.target.className === "origen"){
            checks = document.querySelectorAll(".origen");
            checks.forEach(e=>{
                e.checked = false;
            })
            actual.target.checked = true;
        }else{
            checks = document.querySelectorAll(".alpha, .fuerza");
            checks.forEach(e=>{
                e.checked = false;
            })
            actual.target.checked = true;
        }
    }



    /* ------------ Operaciones para el paginado ------------ {HomeCSS.inputCheck}*/
    var pokesPorPag = 12;
    const [currentPage, setCurrentPage] = useState(1);
    var totalPokes = pokemons.length;
    const cantPages = Math.ceil(totalPokes/pokesPorPag);
    var lastItem = currentPage*pokesPorPag;
    var firstItem = lastItem-pokesPorPag;
    const slicedPokemons = pokemons.slice(firstItem, lastItem);
    const paginator = pageNumber =>{
        setCurrentPage(pageNumber);
    };

    return(
        <div className={HomeCSS.body}>
        <Navbar/>
        <h1>POKEMON APP!</h1>

        <div className={HomeCSS.panel}>
            <div className={HomeCSS.filterDiv}>
                    <h3>Ordering!</h3>

                    <div className={HomeCSS.filterDiv2}>
                        <div className={HomeCSS.filterDiv3}>
                            <h4>Alfabéticamente</h4>
                            <label><input type="checkbox" name="Alfabético" value="ASC"
                            onChange={e=>handleAlphaChange(e)}
                            className="alpha"/>Ascendente  </label>
                            <label><input type="checkbox" name="Alfabético" value="DESC"
                            onChange={e=>handleAlphaChange(e)}
                            className="alpha"/>Descendente</label>
                        </div>
                        <div className={HomeCSS.filterDiv3}>
                            <h4>Por fuerza</h4>
                            <label><input type="checkbox" name="Fuerza" value="ASC"
                            onChange={e=>handleAttackChange(e)}
                            className="fuerza"/>Ascendente</label>
                            <label><input type="checkbox" name="Fuerza" value="DESC"
                            onChange={e=>handleAttackChange(e)}
                            className="fuerza"/>Descendente</label>
                        </div>
                    </div>

            </div>

            <div className={HomeCSS.reloadDiv}>
                <img src="https://static.wikia.nocookie.net/bcd45199-694a-4c47-80e5-c02921faeb2c" 
                alt=":c" className={HomeCSS.reloadImg}/>
                <button onClick={e=>{handleClick(e)}}
                className={HomeCSS.reloadButton}>Reload!</button>
            </div>

            <div className={HomeCSS.filterDiv}>
                <h3>Filters!</h3>

                <div className={HomeCSS.filterDiv2}>
                    <div className={HomeCSS.filterDiv3}>
                        <h4>Origen de datos</h4>
                        <label><input type="checkbox" name="origen" value="all"
                        onChange={e=>handleOriginChange(e)}
                        className="origen"/>Ambos (todos)</label>
                        <label><input type="checkbox" name="origen" value="existing"
                        onChange={e=>handleOriginChange(e)}
                        className="origen"/>Existentes (API)</label>
                        <label><input type="checkbox" name="origen" value="created"
                        onChange={e=>handleOriginChange(e)}
                        className="origen"/>Creados (DB)</label>
                    </div>

                    <div className={HomeCSS.filterDiv3}>
                        <h4>Tipos</h4>
                        <select name="Por tipo" onChange={e => handleTypeChange(e)} >
                            <option value="all">Todos los tipos</option>
                            {types?.map(t=>(
                            <option key={t.id} value={t.name}>{t.name}</option>))}
                        </select>
                    </div>

                </div>
            </div>
        </div>


    {/* SECCIÓN DE PAGINADO Y CARDS DE POKEMONS*/}
        <PaginatorBar cantPages={cantPages} paginator={paginator}/>
            {
                slicedPokemons.length ? (
                    <div className={HomeCSS.cardContainer}>
                        {slicedPokemons.map(p=>{
                            return(
                                <Link key={p.id} to={"/pokemon/"+p.id}>
                                    <Card image={p.image} name={p.name} types={p.types}/>
                                </Link>
                            )
                        })}
                    </div>
                ) : <div>
                <img className={HomeCSS.loading}
                 src="https://i.pinimg.com/originals/3c/2d/1b/3c2d1b10bb5529519c29b88ee64f7ef5.png" alt="nada" />
                <h3>CAPTURANDO POKEMONS...</h3>
                </div>
            }
        </div>
    )
}

/* Borradores :v 
   pendiente: ver el loading cuando no existen pokemons de un tipo
   https://e1.pngegg.com/pngimages/889/193/png-clipart-goku-son-goku.png

   https://64.media.tumblr.com/cf16ffbe17ad33951fc567529bc649b5/tumblr_mrco5jwNIT1rpn9eno1_500.gifv
*/