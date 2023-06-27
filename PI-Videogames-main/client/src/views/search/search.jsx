import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllGeneres, getAllGames, getGameByName } from "../../redux/actions/actions";
import Cards from "../../components/cards/cards";
import NavBar from "../../components/navBar/navBar";
import "../home/home.style.css";

function Search() {

  const dispatch = useDispatch();

  const allGeneres = useSelector((state) => state.generes);
  const allGames = useSelector((state) => state.videogames);

  const [currentGames, setCurrentGames] = useState([]);
  const [generes, setGeneres] = useState([]);

  const [searchType, setSearchType] = useState(true);
  const [genereSuggestions, setGenereSuggestions] = useState([]);
  const [gamesSuggestions, setGamesSuggestions] = useState([]);

  const [searchValue, setSearchValue] = useState('');
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    dispatch(getAllGeneres());
    dispatch(getAllGames());
  }, [dispatch]);
  
  useEffect(() => {

    if (!generes) {
      setGeneres(generes);
    }
  }, [allGeneres, generes]);

  useEffect(() => {

    if (searchType) {
      if (searchValue === "") {
        setCurrentGames([]);
        setGamesSuggestions([]);
      } else {
       
        const filteredGames = allGames.filter(
          (game) => game.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setGamesSuggestions(filteredGames.map((game) => game.name));
        setCurrentGames(filteredGames);
      }
    } else {
      
      const filteredGenres = allGeneres.filter(
        (genre) => genre.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setGenereSuggestions(filteredGenres.map((genre) => genre.name));
    }
  
  }, [searchValue, allGames, allGeneres, searchType])


  const handleTypeChange = (event) => {
    if (event.target.value === "N") {
      setSearchType(true);
    } else {
      setSearchType(false);
    }
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    setShowCards(false);
  }

  const handleSuggestionClick = (value) => {
    setSearchValue(value);
  };

  const handleClick = (event) => {
    event.preventDefault(); 

    if (searchType) {
      dispatch(getGameByName(searchValue));
    } else {
      console.log("searchName",event.target.value);
    }

    setShowCards(true);
  };

  return (
    <div className="Home">
      <NavBar />
      <h1 className="home-title">BUSCAR</h1>

      <div className="selectContainer">
        <span>Buscar por </span>
        <select value={searchType ? "N" : "G"} onChange={handleTypeChange}>
          <option value="N"> Nombre </option>
          <option value="G"> Genero </option>
        </select>
      </div>

      <div className="barContainer">
        <input onChange={handleChange} placeholder="Búsqueda" value={searchValue} />
        <button onClick={handleClick} type="button"> Buscar </button>
      </div>

      {showCards ? (
        
        <div>
          <Cards
            allGames={currentGames.map((game) => ({
              ...game,
              image: game.image ? game.image : game.background_image
            }))}
          />
        </div>
      ) : searchType ? (
        <div>
          {gamesSuggestions.length > 0 ? (
            gamesSuggestions.slice(0, 7).map((game) => (
              <h3 key={game.id}><button onClick={() => handleSuggestionClick(game)}>{game}</button> </h3>
            ))
          ) : (
            <p>No hay sugerencias disponibles</p>
          )}
        </div>
      ) : (
        <div>
          {genereSuggestions.length > 0 ? (
            genereSuggestions.map((genre) => (
              <h3 key={genre.id}><button onClick={() => handleSuggestionClick(genre)}>{genre}</button></h3>
            ))
          ) : (
            <p>No hay sugerencias disponibles</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
