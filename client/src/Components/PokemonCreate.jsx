import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTypes, postPokemon } from "../Actions";
import Navbar from "./Navbar";

export default function PokemonCreate(){
    const {types} = useSelector(state=>state.reducer);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(!types.length){
            dispatch(getTypes());
        }
    },[dispatch]);

    const emptyState ={
        name: "",
        image: "",
        weight: 0,
        height: 0,
        types: [],
        hp: 0, attack: 0, defense: 0, speed: 0,
    }
    const [input, setInput] = useState(emptyState);
    const [errors, setErrors] = useState({});
    

    function validator(input){
        var errors = {};
        if(input.name.length < 1) errors.name = "Ingrese un nombre.";
        if(input.name.length > 18) errors.name = "Nombre demasiado largo";
        if(!(/^([a-zA-Z])+$/.test(input.name)) && input.name.length >=1) errors.name = "Sólo puede contener letras";
        if(!input.types.length) errors.types = "Debes escoger al menos 1 tipo";
        if(!/\.(gif|jpeg|jpg|png|svg|bmp|tiff|tga)$/.test(input.image))
         errors.image = "Debe ingresar un URL de imagen válido";
        return errors;
    }

    function handleInputChange(e){
        e.preventDefault();
        if(e.target.name !== "name"){
            setInput({...input, [e.target.name]:e.target.value,})
        }else{
            setInput({...input, [e.target.name]:e.target.value.toLowerCase()});
        }
        setErrors(validator({...input, [e.target.name]:e.target.value}))
    }
    function handleTypeSelect(e){
        e.preventDefault();
        if(!input.types.includes(e.target.value)){
            setInput({...input, types: [...input.types, e.target.value]});
            setErrors(validator({...input, types: [...input.types, e.target.value]}));
        }
    }
    function handleTypeDelte(t){
        let deleted={...input, types: input.types.filter(f=>f!==t)};
        setInput(deleted);
        setErrors(validator(deleted));
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(postPokemon(input)); //dispatch??
        setInput(emptyState);
        if(input.name.length < 1) errors.name = "Ingrese un nombre.";
    }
    return(
        <div className="formContainer">
            <Navbar/>
            <h1>Crea y guarda un pokémon propio!</h1> <br />
            <form onSubmit={e=>{handleSubmit(e)}}>
                <div>
                    <label>Nombre: </label>
                    <input type="text" name="name" value={input.name} required
                    onChange={e=>handleInputChange(e)}/>
                    {errors.name && <p>{errors.name}</p>}
                    <br />
                </div>
                <div>
                    <label>Tipos: </label>
                    <select name="types" onChange={e=>handleTypeSelect(e)}>
                        <option value={null}>Select types...</option>
                        {types.map(t=>(
                            <option value={t.name} key={t.id}> {t.name} </option>
                        ))
                    }
                    </select>
                    {errors.types && <p>{errors.types}</p>}
                    <br />
                </div>
                <div>
                    <h3>Estadísticas: </h3>
                    <label>HP: </label>
                    <input type="number" name="hp" value={input.hp} required
                    min="10" max="500"  onChange={e=>handleInputChange(e)}/>
                    <label>Attack: </label>
                    <input type="number" name="attack" value={input.attack} required
                    min="0" max="1000"  onChange={e=>handleInputChange(e)}/>
                    <label>Defense: </label>
                    <input type="number" name="defense" value={input.defense} required
                    min="1" max="1000"  onChange={e=>handleInputChange(e)}/>
                    <label>Speed: </label>
                    <input type="number" name="speed" value={input.speed} required
                    min="1" max="1000"  onChange={e=>handleInputChange(e)}/>
                    <br />
                </div>
                <div>
                    <h3>Peso y Altura</h3>
                    <label>Peso: </label>
                    <input type="number" name="weight" value={input.weight}
                    min="1" max="100" onChange={e=>handleInputChange(e)}/>
                    <label>Altura: </label>
                    <input type="number" name="height" value={input.height}
                    min="1" max="500" onChange={e=>handleInputChange(e)}/>
                    <br />
                </div>
                <div>
                    <label>URL de una imagen: </label>
                    <input type="text" name="image" value={input.image}
                    onChange={e=>handleInputChange(e)}/>
                    {errors.image && <p>{errors.image}</p>}
                    <br />
                </div>
                {!Object.keys(errors).length && <button type="submit"> SUBMIT </button>}
            </form>
            <div>
                {/* Zona para desmarcar tipos! */}
                {input.types && input.types.map((t, i) => (
                    <div key={i}>
                        <span>{t}</span><button key={i} onClick={()=>handleTypeDelte(t)}> X </button>
                    </div>
                ))}
            </div>
        </div>
    )
}