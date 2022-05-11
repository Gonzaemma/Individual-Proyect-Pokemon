const router = require('express').Router();

const axios = require('axios');

const {Pokemon, Type} = require('../db');

const getPokes = async (name)=>{
    try{
        if(name){ //si existe un name quiere decir que hay consulta por query
            console.log("existe name y es: ",name);
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
            if(finded) {
                console.log("entró al if de la db!");  //borrar esto luego
                return {finded: finded};
            }  //si ya lo encontró en la BD, retorna
            console.log("No encontrado en la DB!\n");
            /* ///////////////////////////////////////////////////// */

            //PENDIENTE CÓMO MANEJAR EL REJECT DE LA API POR QUERY, DA ERROR!! :C

            try{
                var finded2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
            }catch(e){
                return {finded: []};
            }

            console.log("finded2 ahora es: ", finded2);
            if(finded2){
                console.log("entró al if del llamado a api, no debería");
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
                 console.log("entró al if de finded... y pokeJson es: ", pokeJson);
                return { finded: pokeJson};
            }
            console.log("Si no encntró tampoco en la APi, retorna un array vacío.");
            return {finded: []};

        }else{ //sino, debo llevar toda la info (40 pokes de api + los de la db)
            console.log("entro al 'else' del llamado por query.");
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
        console.log("Entré al 'APIinfo()'.");
        var pokes40 = [];

        const recursiva = async function (link="https://pokeapi.co/api/v2/pokemon", page=1){
            console.log("Entré a la función recursiva!!\n");
            var mapedInfo = [];
            if(page<=2){
                var primerLlamado = await axios.get(link);
                console.log("pasé el primer llamado del axios");
                var mapedLinks = primerLlamado.data.results.map(async (poke) =>{
                    var segundosLlamados = await axios.get(poke.url);
                    console.log("entré al map de de primerLlamado. Data correcta");
                    return segundosLlamados.data;
                });
                console.log("pasé todo el mapeo de links... el array de segundos llamados es: ", mapedLinks);
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
        console.log("'pokes40' existe! trajo de la api y es: ", pokes40);
        return pokes40;
    } catch (error) {
        console.log("Error en traer datos de la api. ", error.messege);
    }
}

router.get('/',async (req,res)=>{
    try {
        const { name } = req.query;
        var { finded } = await getPokes(name);
        res.json(finded);
    } catch (error) {
        console.error('Error en el getPokemons. ',error.messege);
    }
})

module.exports = router;

