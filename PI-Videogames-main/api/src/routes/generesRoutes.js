const {Router} = require("express");
const {getAllGeneresHandler} = require("../handlers/generesHandler")
const genereRoutes = Router();

genereRoutes.get("/",getAllGeneresHandler);


module.exports = genereRoutes;