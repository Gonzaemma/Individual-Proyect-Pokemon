import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTypes, postPokemon } from "../Actions";
import Navbar from "./Navbar";
import CreationCSS from "../Styles/Creation.module.css"

export default function PokemonCreate(){
    const {types} = useSelector(state=>state.reducer);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(!types.length){
            dispatch(getTypes());
        }
        setErrors(validator({
            name:"", types: [1,2], image: ".png"
        }));
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
        if(e.target.value !== "Select types..."){
            if(!input.types.includes(e.target.value)){
                setInput({...input, types: [...input.types, e.target.value]});
                setErrors(validator({...input, types: [...input.types, e.target.value]}));
            }
        }
    }
    function handleTypeDelte(t){
        let deleted={...input, types: input.types.filter(f=>f!==t)};
        setInput(deleted);
        setErrors(validator(deleted));
    }
    function handleSubmit(e){
        e.preventDefault();
        !input.image.length &&
        setInput({...input, image: "https://cdna.artstation.com/p/assets/images/images/017/645/126/large/antoine-van-bergen-pokeball-avb2.jpg?1556806249"});
        dispatch(postPokemon(input)); //dispatch??
        setInput(emptyState);
        setErrors(validator({
            name:"", types: [1,2], image: ".png"
        }));
    }
    return(
        <div className={CreationCSS.formDiv}>
            <Navbar/>
            <h1>Crea y guarda un pokémon propio!</h1>
            <form onSubmit={e=>{handleSubmit(e)}} className={CreationCSS.formStyle}>
                <div>
                    <h3 className={CreationCSS.inlineH3}>Nombre: </h3>
                    <input type="text" name="name" value={input.name} required
                    onChange={e=>handleInputChange(e)}
                    className={CreationCSS.inputText}/>
                    {errors.name && <p className={CreationCSS.error}>{errors.name}</p>}
                    
                </div>
                <div>
                    <h3 className={CreationCSS.inlineH3}>Tipos: </h3>
                    <select name="types" onChange={e=>handleTypeSelect(e)}>
                        <option value={null}>Select types...</option>
                        {types.map(t=>(
                            <option value={t.name} key={t.id}> {t.name} </option>
                        ))
                    }
                    </select>
                    {errors.types && <p className={CreationCSS.error}>{errors.types}</p>}
                    
                </div>
                <div className={CreationCSS.stats}>
                    <h3 className={CreationCSS.noILH3}>Estadísticas: </h3>
                    <label>HP: </label>
                    <input type="number" name="hp" value={input.hp} required
                    min="10" max="500"  onChange={e=>handleInputChange(e)}
                    className={CreationCSS.inputText}/>
                    <label>Attack: </label>
                    <input type="number" name="attack" value={input.attack} required
                    min="0" max="1000"  onChange={e=>handleInputChange(e)}
                    className={CreationCSS.inputText}/>
                    <label>Defense: </label>
                    <input type="number" name="defense" value={input.defense} required
                    min="1" max="1000"  onChange={e=>handleInputChange(e)}
                    className={CreationCSS.inputText}/>
                    <label>Speed: </label>
                    <input type="number" name="speed" value={input.speed} required
                    min="1" max="1000"  onChange={e=>handleInputChange(e)}
                    className={CreationCSS.inputText}/>
                    
                </div>
                <div className={CreationCSS.PyA}>
                    <h3 className={CreationCSS.noILH3}>Peso y Altura</h3>
                    <label>Peso: </label>
                    <input type="number" name="weight" value={input.weight}
                    min="1" max="100" onChange={e=>handleInputChange(e)}
                    className={CreationCSS.inputText}/>
                    <label>Altura: </label>
                    <input type="number" name="height" value={input.height}
                    min="1" max="500" onChange={e=>handleInputChange(e)}
                    className={CreationCSS.inputText}/>
                    
                </div>
                <div className={CreationCSS.imageURL}>
                    <label>URL de imagen: </label>
                    <input type="text" name="image" value={input.image}
                    onChange={e=>handleInputChange(e)}
                    className={CreationCSS.inputText}/>
                    {errors.image && <p className={CreationCSS.error}>{errors.image}</p>}
                    
                </div>
                {!errors.name && !errors.types && <button type="submit"
                className={CreationCSS.submit}> SUBMIT </button>}
            </form>
            <div className={CreationCSS.typeBar}>
                {/* Zona para desmarcar tipos! */}
                {input.types && input.types.map((t, i) => (
                    <div key={i} className={CreationCSS.X}>
                        <span>{t} </span> <button key={i} onClick={()=>handleTypeDelte(t)}> X </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
//{!Object.keys(errors).length && <button type="submit"> SUBMIT </button>}