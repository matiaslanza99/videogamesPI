
function cleanGames(results){
    const resultado = results.map(game => {
        return {
          id: game.id,
          name: game.name,
          rating:game.rating,
          image: game.background_image,
          genre: game.genres.map(genre => genre.name).join(', ')
        };
      })
      return resultado;
    };
    function cleanGame(result){
            return {
              id: result.id,
              name: result.name,
              description: result.description,
              image: result.background_image,
              genre: result.genres.map(genre => genre.name).join(', '),
              platforms: result.platforms.map(platform => platform.name).join(', '),
              rating: result.rating
            };
    };
    
module.exports = { 
    cleanGames,
    cleanGame
}