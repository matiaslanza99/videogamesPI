const {Router} = require("express");
const {
    getAllGamesHandler,
    getGameByIDHandler,
    getGameByNameHandler,
    getGameByGenereHandler,
    createGameHandler,
} = require("../handlers/videogamesHandler")
const {
s
} = require("../handlers/generesHandler")
const gamesRoutes = Router();

gamesRoutes.get("/",getAllGamesHandler);

gamesRoutes.get("/detail/:id", getGameByIDHandler);

gamesRoutes.get("/name",getGameByNameHandler);

gamesRoutes.get("/genere/:genere",getGameByGenereHandler);

gamesRoutes.post("/create",createGameHandler);


module.exports = gamesRoutes;