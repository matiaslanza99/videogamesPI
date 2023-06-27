import NavBar from '../../components/navBar/navBar'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGameByID } from '../../redux/actions/actions';
import { useSelector, useDispatch } from "react-redux";
import './detail.style.css';

function Detail() {

  const dispatch = useDispatch();
  const params = useParams();
  const game = useSelector((state)=> state.game)
  const { id } = params;

  const [gameFound, setGame] = useState({});

  useEffect(() => {
    dispatch(getGameByID(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (game) {
      setGame(game);
    }
  }, [game]);
  
  return (
    <div className="detail-container">
      <NavBar />
      <div className="detail">
        <img src={gameFound.image} alt="gameimage" className="game-image" />
        <h1 className="game-heading">{game.name}</h1>
        <p>{gameFound.genre}</p>
        <h3>Fecha de salida {gameFound.released}</h3>
        <p>{gameFound.description}</p>
        <h3>Rating {gameFound.rating}</h3>
        <h3>Plataformas {gameFound.platforms}</h3>
      </div>
    </div>
  );
}

export default Detail;
