import { createSlice } from "@reduxjs/toolkit";
//import axios from 'axios';

const initialState = {
    pokemons: [], //actualPokemons
    detail: null,
    allPokemons: [],
    types: [],
    //pokemonsCache: [] ? para quitar filtros al estado anterior o stackear ord+filters
}

export const sliceReducer = createSlice({
    name: "reducer",
    initialState,
    reducers: { //esto vendría a ser el switch del antiguo reducer. Ahora podemos "mutar" el estado!
        setAllPokemons: (state, action)=>{
            state.allPokemons = action.payload; //toolkit internamente hace los cambios "inmutables" al estado.
            state.pokemons = action.payload;
        },
        setDetail: (state, action)=>{
            state.detail = action.payload;
        },
        setPokemonByName: (state, action)=>{
            state.pokemons = [action.payload];
        },
        setTypes: (state, action)=>{
            state.types = action.payload;
        },
        filterByType: (state, action)=>{
            if(action.payload !== "all"){
                state.pokemons = state.allPokemons
                .filter(p => p.types.find(t=> t.name === action.payload))
            }else{
                state.pokemons = state.allPokemons;
            }
        },
        filterByCreated: (state, action)=>{
            if(action.payload !== "all"){
                state.pokemons = action.payload==="created" ?
                state.allPokemons.filter(p => p.createdInDb) :
                state.allPokemons.filter(p => !p.createdInDb)
            }else{
                state.pokemons = state.allPokemons;
            }
        },
        orderByName: (state, action)=> {
            var auxPokes = [...state.allPokemons];
                switch(action.payload){
                    case "ASC":
                        state.pokemons = auxPokes.sort((a,b)=>{
                            if(a.name<b.name) return -1; if(a.name>b.name) return 1; return 0;
                        });
                        break;
                    case "DESC":
                        state.pokemons = auxPokes.sort((a,b)=>{
                            if(a.name<b.name) return 1; if(a.name>b.name) return -1; return 0;
                        });
                        break;
                    case "none":
                        state.pokemons = auxPokes;
                        break;
                    default: break;      
                }
        },
        orderByAttack: (state, action)=>{ //fijarse de stackear filtros con ordenamientos
            var auxPokes2 = [...state.allPokemons];
            switch(action.payload){
                case "ASC":
                    state.pokemons = auxPokes2.sort((a,b)=>( a.attack - b.attack ));
                    break;
                case "DESC":
                    state.pokemons = auxPokes2.sort((a,b)=>( b.attack - a.attack ));
                    break;
                case "none":
                    state.pokemons = state.allPokemons;
                    break;
                default: break;    
            }
        }
    }
})

export const { 
    setAllPokemons,
    setDetail,
    setPokemonByName,
    setTypes,
    filterByType,
    filterByCreated,
    orderByName,
    orderByAttack
 } = sliceReducer.actions; //action creators.
//para armar los objetos action. Los exportamos hacia las actions O directamente a los componentes!.

export default sliceReducer.reducer; //acá exporto por defacult mi reducer para inyectarlo al store!

