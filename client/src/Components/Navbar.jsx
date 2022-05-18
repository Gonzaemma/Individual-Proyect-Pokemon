import React, { useState } from "react";
import {NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../Actions";


export default function Navbar(){
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleInputSearch(e){
        e.preventDefault();
        setName(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(getPokemonByName(name));
        navigate('/home');
    }
    function handleClick(e){
        navigate('/home');
    }

    return(
        <div>
            <button onClick={e=>handleClick(e)}> Home </button>
            <button><NavLink to='/pokemon'> Create a Pokémon </NavLink></button>
            <form onSubmit={e=>handleSubmit(e)}>
            <label>Buscar un pokémon: </label>
                <input id="search" type="search" placeholder="tipe a name"
                value={name} onChange={e=>handleInputSearch(e)}/>
            </form>
        </div>
    )
}