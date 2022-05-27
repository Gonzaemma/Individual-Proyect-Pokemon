import React, { useState } from "react";
import {NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../Actions";
import NavbarCSS from "../Styles/Navbar.module.css"


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
        setTimeout(()=>navigate('/home'),1500);
    }

    return(
        <div className={NavbarCSS.navdiv}>
            <section className={NavbarCSS.navButtons}>
                <button><NavLink to='/home'> Home </NavLink></button>
                <button><NavLink to='/pokemon'> Crea un Pokémon </NavLink></button>
            </section>
            <section className={NavbarCSS.searchdiv}>
                <form onSubmit={e=>handleSubmit(e)}>
                <label>Buscar un pokémon: </label>
                    <input id="search" type="search" placeholder="tipe a name"
                    value={name} onChange={e=>handleInputSearch(e)}
                    className={NavbarCSS.inputText}/>
                </form>
            </section>
        </div>
    )
}