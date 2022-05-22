import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Home from './Components/Home';
import PokemonCreate from './Components/PokemonCreate';
import PokeDetail from './Components/PokeDetail';
import generalCSS from './Styles/General.module.css' //para que aplique el css, sólo requiere ser importado :O

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/pokemon' element={<PokemonCreate/>} />
        <Route path='/pokemon/:id' element={<PokeDetail/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
