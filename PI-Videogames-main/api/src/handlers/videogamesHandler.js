const {
    getAllGames,
    getGameByID,
    getGameByName,
    createGame,
    getGameByGenere
} = require("../controllers/videogamesController")

const getAllGamesHandler = async (req,res) => {
    try{
        const games = await getAllGames();
        res.status(200).json(games)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const getGameByIDHandler = async (req,res)=>{
    const { id } = req.params;
    const typeid = isNaN(id) ? "bdd" : "api";
    try{
        const gameIDFound = await getGameByID(id,typeid);
        res.status(200).json(gameIDFound)
    }catch(error){
        res.status(400).json({error:error.message, typeid})
    }
}

const getGameByNameHandler = async (req, res) => {
    const { name } = req.query;
  
    try {
      const gameNameFound = await getGameByName(name);
      res.status(200).json(gameNameFound);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const getGameByGenereHandler = async (req,res)=>{
    const {id} = req.query;
    console.log(id)
    try{
        const gamesFound = await getGameByGenere(id);
        res.status(200).json(gamesFound);
    }catch(error){
        res.status(400).json({error:error.message});
    }
    
}

const createGameHandler = async (req,res)=>{
    const { name, description, platforms, image, released, rating , genreIds} = req.body;
    
    try {
        const newGame = await createGame( name , description , platforms , image , released , rating ,genreIds);
        if (newGame) {
            res.status(201).json(newGame);
          }
      } catch (error) {
        res.status(400).json({error:error.message})
      }
}

const deleteGameHandler = async (req,res)=>{
    const {id} = req.params;
    try {
        const game = await deleteGame(id);
        res.status(200).send(`Juego con nombre: ${newGame.name} eliminado!`);
      } catch (error) {
        res.status(400).json({error:error.message})
      }
}

module.exports = {
    getAllGamesHandler,
    getGameByIDHandler,
    getGameByNameHandler,
    getGameByGenereHandler,
    createGameHandler,
    deleteGameHandler
}