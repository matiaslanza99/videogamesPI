import {Link} from "react-router-dom";
import "../card/card.style.css";

function Card({ id, image, name, genre ,rating }) {
    return (
      <div className="card-container">
        <div className="image-container">
          <img className="imagen" src={image} alt="imagen" />
        </div>
        <div className="text-container">
          <Link to={`/detail/${id}`} className="link-style">
            <h3 className="nombre">{name}</h3>
            <h3 className="nombre">{id}</h3>
            <h3 className="nombre">{rating}</h3>
            <h3 className="genero">{genre}</h3>
            
          </Link>
        </div>
      </div>
    );
  }

export default Card;