import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGames,
  getAllGeneres,
  orderCards,
  filterFont,
  filterRating,
  filterGenre,
  setDefault
} from "../../redux/actions/actions";

import Cards from "../../components/cards/cards";
import NavBar from "../../components/navBar/navBar";

import "../home/home.style.css";

function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.videogames);
  const allGamesFilters = useSelector((state) => state.videogamesCopy);
  const allGeneres = useSelector((state) => state.generes);

  const [currentGames, setCurrentGames] = useState([]);
  const [currentGamesFilter, setCurrentGamesFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [generes, setGeneres] = useState([]);
  const [workingWithCopy, setWorkingWithCopy] = useState(false);

  const pageSize = 15;

  useEffect(() => {
    dispatch(getAllGeneres());
    dispatch(getAllGames())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setCurrentGames(allGames.slice(startIndex, endIndex));
  }, [allGames, currentPage]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setCurrentGamesFilters(allGamesFilters.slice(startIndex, endIndex));
  }, [allGamesFilters, currentPage]);

  useEffect(() => {
    setGeneres(allGeneres);
  }, [allGeneres]);

  const handleOrder = (event) => {
    setWorkingWithCopy(true);
    dispatch(orderCards(event.target.value));
  };

  const handleFont = (event) => {
    setWorkingWithCopy(true);
    dispatch(filterFont(event.target.value));
  };

  const handleRating = (event) => {
    setWorkingWithCopy(true);
    dispatch(filterRating(event.target.value));
  };

  const handleGenre = (event) => {
    setWorkingWithCopy(true);
    dispatch(filterGenre(event.target.value));
  };

  const handleDefault = () => {
    setWorkingWithCopy(false);
    dispatch(setDefault())
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(allGames.length / pageSize);

  return (
    <div className="Home">
      <NavBar />
      <h1 className="home-title">HOME</h1>

      {loading ? (
        <p className="cargando">Cargando...</p>
      ) : (
        <>
          <div className="filtredContainer">
            <span>Generos</span>
            <select onChange={handleGenre}>
              <option value="NN">Seleccione un valor</option>
              {generes.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>

            <span>Fuente</span>
            <select onChange={handleFont}>
              <option value="">Seleccione una opción</option>
              <option value="API">API</option>
              <option value="BDD">BDD</option>
            </select>
            <br></br>
            <span>Ordenar de manera</span>
            <select onChange={handleOrder}>
              <option value="">Seleccione una opción</option>
              <option value="A">Ascendente</option>
              <option value="D">Descendente</option>
            </select>
            <span>Calificación por</span>
            <select onChange={handleRating}>
              <option value="">Seleccione una opción</option>
              <option value="A">Mejor Calificados</option>
              <option value="D">Peor Calificados</option>
            </select>
            <p>
              <button onClick={handleDefault}>RESTABLECER</button>
            </p>
          </div>
          {workingWithCopy ? (
            <Cards allGames={currentGamesFilter} />
          ) : (
            <Cards allGames={currentGames} />
          )}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={page === currentPage ? "active" : ""}
                >
                  {page}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
