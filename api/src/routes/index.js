const { Router } = require('express');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonsRouter = require('./PokemonsRoutes');
const pokemonRouter = require('./PokemonRoutes');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemonsRouter);
router.use('/pokemon', pokemonRouter);

router.get('/', (req,res)=>{
    res.send("BIENVENIDOS A LA HOME PAGE!");
})

module.exports = router;
