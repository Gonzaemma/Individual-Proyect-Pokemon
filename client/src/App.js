import './App.css';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {getPokemons} from './Actions'


function App() {

  const dispatch = useDispatch();

useEffect(()=>{
  console.log("Entré al useEffect!!.\n");
  dispatch(getPokemons());
},[dispatch]);

  return (
    <div className="App">
      <h1>Henry Pokemon</h1>
    </div>
  );
}

export default App;
