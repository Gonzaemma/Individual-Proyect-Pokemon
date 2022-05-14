const router = require('express').Router();

const axios = require('axios');
const { Type } = require('../db');

const getTypes = async function(){
        //verifico que haya datos en la DB primero.
        const DBtypes = await Type.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });

        if(DBtypes.length){
            console.log("Tipos traídos de la Base de Datos!");
            return {types: DBtypes};
            
        }else{ //debo traer los tipos de la api, y guardarlos en la DB
            const APIdata = await axios.get('https://pokeapi.co/api/v2/type');
            //QUEDA PENDIENTE HACER LAS SUBREQUEST PARA SACAR LOS ID´S! a mimir...
            //pues sacaré los id's de las url, nada de subrequest :v
            var APItypes = APIdata.data.results.map(tipo=>{
                let url=tipo.url; //al final de las url son "/27/", que es el id
                let  id='', i = url.length-2; //paro el índice en el último número
                while(url.charAt(i)!='/'){
                    id=url.charAt(i).concat(id);
                    i--;
                }
                return { id: parseInt(id), name: tipo.name };
            });

            await Type.bulkCreate(APItypes);
            console.log("Tipos traídos de la API!");
            return {types: APItypes}
        }
};

router.get('/', async (req, res)=>{
    try {
        const {types} = await getTypes();
        res.json(types)
    } catch (e) {
        console.log("Error en el get types. ", e.message);
    }
})

module.exports = router;