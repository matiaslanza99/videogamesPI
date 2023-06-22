const {Videogames,VideogameGenres} = require("../db");
const axios = require("axios");
const {searchGenereAPI,cleanGames,cleanGame} = require("../utils/index");
require('dotenv').config();
const {API_KEY} = process.env;
const { Op } = require("sequelize");


const getAllGames = async () => {
        let page = 1;
        const maxPages = 5; // Número máximo de páginas a recorrer
        const baseUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;
      
        let allResults = [];
      
        for (let i = 0; i < maxPages; i++) {
          const url = page === 1 ? baseUrl : `${baseUrl}&page=${page}`;
          const response = await axios.get(url);
          const { results , next } = response.data;
          const crtClean = cleanGames(results); 

          allResults = allResults.concat(crtClean);
      
          if (next) {
            page++;
          } else {
            break;
          }
        }

        const allBDD = await Videogames.findAll();

        return [...allResults,...allBDD];
    }


const getGameByID = async(id,typeid)=>{

    if(typeid === "api"){
      const game = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data
      const prepare = cleanGame(game);
      return prepare;
    }else{
      const game = await Videogames.findByPk(id)
      return game;
    }
}

const getGameByName = async (name) => {
  const lowercaseName = name.toLowerCase(); // Convertir el nombre a minúsculas
  const games = await Videogames.findAll({
    where: {
      name: {
        [Op.like]: `%${lowercaseName}%`, // Utilizar coincidencia parcial con el comodín %
      },
    },
  });
  if (games.length > 0) {
    return games;
  } else {
    const game = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${lowercaseName}`)).data;
    return game.results; // Devolver el juego individual como un array
  }
};

const getGameByGenere = async(id)=>{
    const gamesAndGeneres = VideogameGenres.findByPk(id);
    if(gamesAndGeneres){
        const gamesgener = await Videogames.findAll(
          { 
            where:{
              id:gamesAndGeneres
            }
        }) 
        return gamesgener
    }
}

const createGame = async (name,description,platforms,image,released,rating,genreIds) => {
 
  const game = await Videogames.findOne({ where: { name } });

  if (game) {
    return(`El juego con nombre: ${game.name} ya existe en la base de datos.`);
  } else {
    const newGame = await Videogames.create({
      name,
      description,
      platforms,
      image,
      released,
      rating
    });
    await Promise.all(
      genreIds.forEach(async (genreId) => {
        await VideogameGenres.create({
          videogameId: newGame.id,
          genereId: genreId,
        });
      })
    );

    return `Juego con nombre: ${newGame.name} creado exitosamente.`;
  }
};



module.exports={
    getAllGames,
    getGameByID,
    getGameByName,
    getGameByGenere,
    createGame,
    
}