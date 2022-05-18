import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Navbar from "./Navbar";
import Card from "./Card";
import { getPokemons, getTypes } from "../Actions";
import { filterByType, filterByCreated, orderByAttack, orderByName } from "../Store/Slices";
import { Link } from "react-router-dom";

import HomeCSS from '../Styles/Home.module.css';

export default function Home(){
    //ESTADOS LOCALES Y GLOBALES//
    const dispatch = useDispatch();
    const { pokemons, types } = useSelector(state => state.reducer);
    //const {types} = useSelector(state=>state.reducer);

    useEffect(()=>{
        !pokemons.length && dispatch(getPokemons());
        !pokemons.length && dispatch(getTypes()); //probar luego cn el &&
    },[dispatch])

    /* HANDLERS */
    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
    }
    function handleTypeChange(e){
        dispatch(filterByType(e.target.value));
        //setCurrentPage(1);
    }
    function handleOriginChange(e){
        dispatch(filterByCreated(e.target.value));
    }
    function handleAlphaChange(e){
        //e.preventDefault();
        dispatch(orderByName(e.target.value));
        //setReRender(e.target.value);
    }
    function handleAttackChange(e){
        //e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        //setReRender(e.target.value);
    }

    return(
        <div className={HomeCSS.body}>
        <Navbar/>
        <h1>POKEMONS HOME</h1>
        <button onClick={e=>{handleClick(e)}}>Volver a cargar los pokemons</button>

        <div className={HomeCSS.filterDiv}>
            <h3>Filters!</h3>
            <select name="Por tipo" onChange={e => handleTypeChange(e)} >
                <option value="all">Todos los tipos</option>
                {types?.map(t=>(
                    <option key={t.id} value={t.name}>{t.name}</option>
                ))
                }
            </select> <br />
            <select name="Por origen" onChange={e => handleOriginChange(e)}>
                <option value="all">Todos los pokemons</option>
                <option value="existing">Existente (API)</option>
                <option value="created">Creado (BD)</option>
            </select> <br />
        </div>

        <div className={HomeCSS.filterDiv}>
                <h3>Ordering!</h3>
                <span>Alfabéticamente</span>
                <select name="Alfabético" onChange={e=>handleAlphaChange(e)}>
                    <option value="none">Sin orden</option>
                    <option value="ASC">Ascendente</option>
                    <option value="DESC">Descendente</option>
                </select>
                <span>Por fuerza</span>
                <select name="Fuerza" onChange={e=>{handleAttackChange(e)}}>
                    <option value="none">Sin orden</option>
                    <option value="ASC">Ascendente</option>
                    <option value="DESC">Descendente</option>
                </select>
        </div>

    {/* SECCIÓN DE PAGINADO Y CARDS DE POKEMONS*/}
        <div className={HomeCSS.cardContainer}>
            {
                pokemons.length ? (
                    pokemons.map(p=>{
                        return(
                            <Link key={p.id} to={"/pokemon/"+p.id}>
                                <Card image={p.image} name={p.name} types={p.types}/>
                            </Link>
                        )
                    })
                ) : <h3>Loading...</h3>
            }
        </div>
        </div>
    )
}