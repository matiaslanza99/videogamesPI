const cheerio = require('cheerio');
function removeHTMLTags(htmlString) {
  const $ = cheerio.load(htmlString);
  $('*').each((index, element) => {
    $(element).replaceWith($(element).text());
  });
  return $.text();
}

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
}
function cleanGame(result){

  return {
       id: result.id,
       name: result.name,
       description: removeHTMLTags(result.description),
       image: result.background_image,
       genre: result.genres.map(genre => genre.name).join(', '),
       platforms:result.platforms.map(platform => platform.platform.name).join(', '),
       released:result.released,
       rating: result.rating
     };
}

function cleanGamesBDD(result,genre){

  return {
       id: result.id,
       name: result.name,
       description: result.description,
       image: result.image,
       platforms: result.platforms.map(platform => platform).join(', '),
       released:result.released,
       rating: result.rating,
       genre:genre
     };
}


module.exports = { 
    cleanGames,
    cleanGame,
    cleanGamesBDD
}