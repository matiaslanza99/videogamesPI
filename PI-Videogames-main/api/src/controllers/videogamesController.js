const {Generes,Videogames,VideogameGenres} = require("../db");
const axios = require("axios");
const {cleanGames,cleanGame,cleanGamesBDD} = require("../utils/index");
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
      const generes = await getGenresByGame(id);
      const genreNames = generes.map(genre => genre.name).join(', ')
      const prepare = cleanGamesBDD(game,genreNames)
      return prepare;
    }
}

const getGameByName = async (name) => {
  const lowercaseName = name.toLowerCase(); 
  const games = await Videogames.findAll({
    where: {
      name: {
        [Op.like]: `%${lowercaseName}%`,
      },
    },
  });
  if (games.length > 0) {
    return games;
  } else {
    const game = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${lowercaseName}`)).data;
    return game.results; 
  }
};

const getGameByGenere = async (id) =>{
    const matchs = await VideogameGenres.findAll({ 
            where:{
              genereId:id,
            }
    });
    const results = await Videogames.findAll({
      where:{
        id:matchs.map(match => match.videogameId),
      }
    })
    return results;
}        

const createGame = async (name,description,platforms,image,released,rating,genreIds) => {
 
  const game = await Videogames.findOne({ where: { name } });

  if (game) {
    return ("Juego ya existente.");
  } else {
    const newGame = await Videogames.create({
      name,
      description,
      platforms,
      image,
      released,
      rating
    });
    const generes = await Promise.all(
      genreIds.map(async (genreId) => {
        await VideogameGenres.create({
          videogameId: newGame.id,
          genereId: genreId,
        });
      })
    );
    if(generes)return newGame;
  }
};

const getGenresByGame = async (id) => {
  const matches = await VideogameGenres.findAll({
    where: {
      videogameId: id,
    },
  });
  console.log("estos matchearon",matches)
  const results = await Generes.findAll({
    where:{
      id:matches.map(match => match.genereId),
    }
  })
  console.log("estos resultaron",results)
  return results;
}



module.exports={
    getAllGames,
    getGameByID,
    getGameByName,
    getGameByGenere,
    createGame,
    
}