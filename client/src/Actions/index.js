import axios from "axios";
import { setAllPokemons } from "../Store/Slices";

export function getPokemons(){
    return async function (dispatch){
        try {
            const pokeData = await axios('http://localhost:3001/pokemons'); //,[] ?
            dispatch(setAllPokemons(pokeData.data))
                //antes despachabamos el objeto action, con su type y su payload
        } catch (error) {
            console.log("Error al llamar los pokemons. ", error.message);
        }
    }
}