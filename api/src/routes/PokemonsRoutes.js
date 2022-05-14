const router = require('express').Router();

const axios = require('axios');

const {Pokemon, Type} = require('../db');

const getPokes = async (name)=>{
    try{
        if(name){ //si existe un name quiere decir que hay consulta por query
            var finded = await Pokemon.findOne({
                where: {name: name},
                include: {
                    model: Type, as: "types",
                    attributes: ["name"],
                    through: {attributes:[]}
                },
                attributes: {
                    exclude: ["createdAt", "udateAt"]
                }            
            });
            if(finded) return {finded: finded};  //si ya lo encontró en la BD, retorna

            /* ///////////////////////////////////////////////////// */

            //el get buscando por query a la api crasheaba la app directamente cuando no encontraba resultados.
            //la solución que hallé fue capturar el error para que pueda continuar la ejecución :c
            try{
                var finded2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
            }catch(e){
                return {finded: false};
            }

            if(finded2){
                /* var {image, name, types, id, stats (hp, attack, defence, speed), height, weight} */
                var pokeJson = {
                    name: finded2.data.name,
                    id: finded2.data.id,
                    height: finded2.data.height,
                    weight: finded2.data.weight,
                    image: finded2.data.sprites.other.dream_world.front_default,
                    hp: finded2.data.stats[0].base_stat,
                    attack: finded2.data.stats[1].base_stat,
                    defense: finded2.data.stats[2].base_stat,
                    speed: finded2.data.stats[5].base_stat,
                    types: finded2.data.types.map(t => t.type.name)
                 };
                return { finded: pokeJson};
            }
            console.log("Si no encntró tampoco en la APi, retorna false.");
            return {finded: false};

        }else{ //sino, debo llevar toda la info (40 pokes de api + los de la db)
            const pokeApi = await APIinfo();
            const pokeDB = await DBinfo();
            const pokeTotal = pokeApi.concat(pokeDB);
            return {finded: pokeTotal};
        }
    }catch(e){
        console.log('error en el getPokes()', e.messege);
    }
};

const DBinfo = async function (){
    try{
        const dbInfo = await Pokemon.findAll({
            include: {
                model: Type, as: "types",
                attributes: ["name"],
                through: {attributes:[]}
            },
            attributes:{
                exclude: ["createdAt", "updatedAt"]
            }
        })
        //tal vez haga falta un map acá? tal vez...
        return dbInfo;
    }catch(e){
        console.log("Error en traer los datos de la DB. ", e.messege);
    }
}

const APIinfo = async function (){
    try {
        var pokes40 = [];

        const recursiva = async function (link="https://pokeapi.co/api/v2/pokemon", page=1){
            var mapedInfo = [];
            if(page<=2){
                var primerLlamado = await axios.get(link);
                var mapedLinks = primerLlamado.data.results.map(async (poke) =>{
                    var segundosLlamados = await axios.get(poke.url);
                    return segundosLlamados.data;
                });
                const infoPromisesArray = await axios.all(mapedLinks);
                mapedInfo = infoPromisesArray.map(poke =>{
                    return {
                            name: poke.name,
                            id: poke.id,
                            height: poke.height,
                            weight: poke.weight,
                            image: poke.sprites.other.dream_world.front_default,
                            hp: poke.stats[0].base_stat,
                            attack: poke.stats[1].base_stat,
                            defense: poke.stats[2].base_stat,
                            speed: poke.stats[5].base_stat,
                            types: poke.types.map(t => t.type.name)
                         }
                    });
                page++;
                return mapedInfo.concat(await recursiva(primerLlamado.data.next, page));
            }else{
                return mapedInfo;
            }
        }//fin función recursiva.
        pokes40 = await recursiva(); //recursiva devuelve un arreglo de 40 pokemons de la api.
        //console.log("'pokes40' existe! trajo de la api y es: ", pokes40);
        return pokes40;
    } catch (error) {
        console.log("Error en traer datos de la api. ", error.messege);
    }
}

router.get('/',async (req,res)=>{
    try {
        const { name } = req.query;
        var { finded } = await getPokes(name);
        if(finded){
            res.status(200).json(finded);
        }else{
            res.status(404).send("Pokemon not found.")
        }
    } catch (error) {
        console.error('Error en el getPokemons. ',error.messege);
    }
});

router.get('/:id', async (req, res)=>{
    const id = req.params.id;

    if(id.includes('-') && id.length==36){ //esto quiere decir que se trata de un UUID
        try{
            var pokeDB = await Pokemon.findByPk(id,
                {
                    attributes: {
                        exclude: ['createdAt', 'UpdatedAt']
                    },
                    include: {
                        model: Type, as: 'types',
                        attributes: ['id', 'name'],
                        through: {attributes:[]}
                    }
                });
                pokeDB.id && res.json(pokeDB);
        }catch(e){
            res.status(404).send({msg: 'No se encontró el pokemon especificado. (DB) ', error: e.message})
        }
    }else{//Hay que buscar en la api
        try{
            var resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const pokeAPI = {
                id: resp.data.id,
                name: resp.data.name,
                height: resp.data.height,
                weight: resp.data.weight,
                image: resp.data.sprites.other.dream_world.front_default,
                hp: resp.data.stats[0].base_stat,
                attack: resp.data.stats[1].base_stat,
                defense: resp.data.stats[2].base_stat,
                speed: resp.data.stats[5].base_stat,
                types: resp.data.types.map(t => t.type.name)
            }

            res.json(pokeAPI);
        }catch(e){
            res.status(404).send({msg: 'No se encontró el pokemon especificado. (API) ', error: e.message})
        }
    }

});

router.post('/', async (req, res)=>{
    console.log("ENTRÉ AL POST.");
    //luego si quiero, verificar los datos que me llegan
    try{
        const {
            name, hp, attack, defense, speed, height, weight, types
        } = req.body; //este es el destructuring de la info que llega por body
    
        const [createdPokemon, isCreated] = await Pokemon.findOrCreate({
            where:{name},
            defaults:{
                name, hp, attack, defense, speed, height, weight
            }
        });

        if(isCreated){
            console.log("pokemon creado, entro al if created");
            //debe tener tipos en la base de datos antes
            let selectedTypes = await Type.findAll({
                where:{ name: types },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            });
            createdPokemon.addType(selectedTypes);
            res.status(201).send("pokemon creado exitosamente");
        }else{
            console.log("Pokemon no creado!");
            res.status(409).send("El pokemon que intenta crear YA EXISTE en la base de datos");
        }
    }catch(e){
        console.log("Error en el post!", e.message);
    }
});

module.exports = router;

