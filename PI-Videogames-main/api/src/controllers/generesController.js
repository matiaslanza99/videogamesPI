const {Generes} = require("../db");
const axios = require("axios");
require('dotenv').config();
const {API_KEY} = process.env;


const getAllGeneres = async () => {

    const count = await Generes.count();

    if(count === 0){
        
        const gnrAPI =((await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data).results;
        
        const genersToCreate = gnrAPI.map((gener) => ({
            id:gener.id,
            name: gener.name  
        }));
        genersToCreate.forEach(element => {
            Generes.create(element);
        });
    }
    const gnrBDD = await Generes.findAll();
    return gnrBDD;


}

module.exports={
    getAllGeneres,
}