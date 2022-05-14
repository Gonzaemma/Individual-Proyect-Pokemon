const { Router } = require('express');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonsRouter = require('./PokemonsRoutes');
const typesRouter = require('./TypesRoutes');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemonsRouter);
router.use('/types', typesRouter);

router.get('/', (req,res)=>{
    res.send("BIENVENIDOS A LA HOME PAGE!");
})

module.exports = router;
