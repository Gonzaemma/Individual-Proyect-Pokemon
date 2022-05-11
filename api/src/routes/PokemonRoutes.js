const router = require('express').Router();

const axios = require('axios');
const {Pokemon, Type} = require('../db');

router.post('/', async (req, res)=>{
    console.log("ENTRÉ AL POST.");
    const {
        id, name, hp
    } = req.body; //este es el destructuring de la info que llega por body

    try{
        const pokeCreated = await Pokemon.create({
            id, name, hp
        });
    
        res.send("pokemon creado!!!");
    }catch(e){
        console.log("Error en el post!", e.message);
    }
})

module.exports = router;