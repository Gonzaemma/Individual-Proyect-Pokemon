import axios from "axios";
import {
    setAllPokemons, 
    setDetail,
    setPokemonByName,
    setTypes
} from "../Store/Slices";

export function getPokemons(){
    return async function (dispatch){
        try {
            const pokeData = await axios.get('http://localhost:3001/pokemons',[]); //,[] ?
            dispatch(setAllPokemons(pokeData.data))
                //antes despachabamos el objeto action, con su type y su payload
        } catch (error) {
            console.log("Error al llamar los pokemons. ", error.message);
        }
    }
}

export function getPokemonDetail(id){
    return async (dispatch)=>{
        try {
            const pokeDetail = await axios.get(`http://localhost:3001/pokemons/${id}`);
            dispatch(setDetail(pokeDetail.data)); //en caso de error, retorna un obj
            //del tipo {msg: mensaje personalizado, error: mensaje del error}
        }catch(e){
            console.log("Error al llamar al detalle del pokemon. ", e.message);
            alert("No se encontró el pokémon ingresado.");
        } finally {
        }
    }
}

export function getPokemonByName(name){
    return async (dispatch)=>{
        try {
            const json = await axios.get(`http://localhost:3001/pokemons?name=${name}`,[]);
            dispatch(setPokemonByName(json.data))
        }catch(e){
            console.log("Error al llamar al pokemon by name. ", e.message);
            alert("No se encontró el pokémon ingresado.");
        }
    }
}

export function postPokemon(payload){
    return async ()=>{
        try{
            //Verificación si ya existe
            var isCreated = await axios.get(`http://localhost:3001/pokemons?name=${payload.name.toLowerCase()}`)
        }catch(e){
            console.log("Error al verificar la creación del pokemon. Puede proceder a crearlo :v"
            ,e.message);
        } finally {
            if(!isCreated){
                axios.post('http://localhost:3001/pokemons', payload);
                return alert("Tu pokemon se ha guardado!");
            }else{
                return alert("Ya existe otro pokémon con ese nombre!");
            }
        }
    }
}

export function getTypes(){
    return async (dispatch)=>{
        try{
            const json = await axios.get(`http://localhost:3001/types`,[]);
            dispatch(setTypes(json.data))
        }catch(e){
            console.log("Error al traer los tipos. ", e.message);
        }
    }
}