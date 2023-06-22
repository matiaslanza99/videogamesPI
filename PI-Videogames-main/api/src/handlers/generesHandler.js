const {getAllGeneres} = require("../controllers/generesController")

const getAllGeneresHandler = async (req,res) => {
    try{
        const generes = await getAllGeneres();
        res.status(200).json(generes)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    getAllGeneresHandler,
}