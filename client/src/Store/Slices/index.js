import { createSlice } from "@reduxjs/toolkit";
//import axios from 'axios';

const initialState = {
    pokemons: [],
    detalle: null,
    allPokemons: [],
    types: [],
}

export const sliceReducer = createSlice({
    name: "reducer",
    initialState,
    reducers: { //esto vendría a ser el switch del antiguo reducer. Ahora podemos "mutar" el estado!
        setAllPokemons: (state, action)=>{
            state.allPokemons = action.payload; //toolkit internamente hace los cambios "inmutables" al estado.
        }
    }
})

export default sliceReducer.reducer; //acá exporto por defacult mi reducer para inyectarlo al store!

export const { setAllPokemons } = sliceReducer.actions; //action creators.
//para armar los objetos action. Los exportamos hacia las actions.

////////// acá podemos escribir directamente las actions del reducer! (o exportarlas)
