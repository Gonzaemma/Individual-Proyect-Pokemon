const router = require('express').Router();

const axios = require('axios');
const { DataTypes } = require('sequelize/types');

const {Pokemon, Type} = require('../db');

const getPokes = async (name)=>{
    try{
        if(name){ //si existe un name quiere decir que hay consulta por query
            var finded = await Pokemon.findOne({
                where: {name: name},
                include: {
                    model: Type, as: "types",
                    attributes: ["name","id"],
                    through: {attributes:[]}
                },
                attributes: {
                    exclude: ["createdAt", "udateAt"]
                }            
            });
            if(finded) return {finded};
            finded = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).data;
            if(finded){
                /* var {image, name, types, id, stats (hp, attack, defence, speed, height, weight)} */
                return {

                }
            }



        }else{ //sino, debo llevar toda la info (40 pokes de api + los de la db)

        }


    }catch(e){
        console.error('error en el getPokes()', e.messege);
    }
};

router.get('/',(req,res)=>{
    try {
        const { name } = req.query;
        const { total } = await getPokes(name);
        res.json(total);
    } catch (error) {
        console.error('Error en el getPokemons. ',error.messege);
    }
})

