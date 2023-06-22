const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogamesRoutes = require("./videogamesRoutes")
const generesRoutes = require("./generesRoutes")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames",videogamesRoutes);
router.use("/generes",generesRoutes);

module.exports = router;
