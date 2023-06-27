import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllGeneres ,createGame } from "../../redux/actions/actions";
import NavBar from "../../components/navBar/navBar";
import "../create/create.style.css";

function Create() {
  const dispatch = useDispatch();
  const allGeneres = useSelector((state) => state.generes);

  const [generes, setGeneres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    dispatch(getAllGeneres());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
    rating: "",
    released:"",

  });

  const [error,setError] = useState({
    name: "",
    description: "",
    image: "",
    rating: "",
    released:"",

  })



const validate = (input) =>{

  let error = {}

  
  if (input.name.trim().length === 0) {
    error.name = "Ingrese un nombre.";
  } 

 
  if (input.description.trim().length === 0) {
    error.description = "Ingrese una descripción.";
  }

 
  if (input.image.trim().length === 0) {
    error.image = "Ingrese una URL de imagen.";
  } 


  if (input.rating < 0 || input.rating > 5) {
    error.rating = "Ingrese una calificación válida (entre 0 y 5).";
  }else if((input.rating.trim().length === 0) ){
    error.rating = "Ingrese una calificación.";
  }


  if (input.released.trim().length === 0) {
    error.released = "Ingrese una fecha de lanzamiento.";
  } else {
    var releasedFormat = /^\d{2}-\d{2}-\d{4}$/;
    if (!releasedFormat.test(input.released.trim())) {
      error.released = "El formato de fecha debe ser nn-nn-nnnn.";
    } else {
      var dateComponents = input.released.trim().split("-");
      var day = parseInt(dateComponents[0], 10);
      var month = parseInt(dateComponents[1], 10);
      var year = parseInt(dateComponents[2], 10);
  
      if (day < 1 || day > 31) {
        error.released = "El día debe estar entre 1 y 31.";
      } else if (month < 1 || month > 12) {
        error.released = "El mes debe estar entre 1 y 12.";
      } else if (year < 2023 || year > 2030) {
        error.released = "El año debe estar entre 2023 y 2030.";
      }
    }
  }

  return error;
  
}


  const handleChange = (event) => {
   
  setInput({
    ...input,
    [event.target.name]: event.target.value
  });
  
  setError(
    validate({
      ...input,
      [event.target.name]: event.target.value
    })
  );
  
}

const handleSubmit = (event) => {
  event.preventDefault();
  if (Object.keys(error).length === 0 && Object.keys(generes).length > 0 && Object.keys(selectedPlatforms).length > 0) {
    const gameData = {
      ...input,
      genreIds: generes,
      platforms: selectedPlatforms
    };
    dispatch(createGame(gameData))
    .then((response) => {
      if (response) {// Se creó
        alert("¡El juego se creó exitosamente!");
        setSuccess(true); // Actualiza el estado de éxito si la respuesta fue exitosa
        setInput({
          name: "",
          description: "",
          image: "",
          rating: "",
          released: ""
        });
        setGeneres([]);
        setSelectedPlatforms([]);
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
      
  } else {
    alert("Faltan datos");
  }
};


const handleCheckChangePlatfomrs = (event) => {
  const platformValue = event.target.value;
  if (event.target.checked) {
    setSelectedPlatforms([...selectedPlatforms, platformValue]);
    console.log("platform del jueguito",[...selectedPlatforms, platformValue])
  } else {
    setSelectedPlatforms(selectedPlatforms.filter((platform) => platform !== platformValue));
    console.log("platform del jueguito",[...selectedPlatforms, platformValue])
  }
};

const handleCheckChange = (event) => {
  const genreId = parseInt(event.target.value);
  if (event.target.checked) {
    setGeneres([...generes, genreId]);
    console.log("checksAgregados",generes)
  } else {
    setGeneres(generes.filter((id) => id !== genreId));
    console.log("checksQuitad",generes)
  }
};


  return(
    <div className="createContainer"> 
      <NavBar />
        <form className="formContainer" onSubmit={handleSubmit}>
          <h1>Carga tu juego</h1>
          <label className="titleInput">Nombre</label>
          <input name="name" value={input.name} onChange={handleChange} className="campo" placeholder="Ej: Grand Theft Auto VI"/>
          <p className="error">{error.name && error.name}</p>

          <label className="titleInput">Descripción</label>
          <input name="description" value={input.description} onChange={handleChange} className="campo" placeholder="10 letras min."/>
          <p className="error">{error.description && error.description}</p>



          <label className="titleInput">Plataformas</label>
          <input name="platforms" value={selectedPlatforms.join(", ")} readOnly className="campo"/>
          <div className="cbTable">
          <p><input type="checkbox" name="Xbox One"  className="pcont" value="Xbox One" checked={selectedPlatforms.includes("Xbox One")} onChange={handleCheckChangePlatfomrs}/> <label>Xbox One</label></p>
          <p><input type="checkbox" name="PlayStation 5" className="pcont" value="PlayStation 5" checked={selectedPlatforms.includes("PlayStation 5")} onChange={handleCheckChangePlatfomrs}/><label>PlayStation 5</label></p>
          <p><input type="checkbox" name="PlayStation 4" className="pcont" value="PlayStation 4" checked={selectedPlatforms.includes("PlayStation 4")} onChange={handleCheckChangePlatfomrs}/><label>PlayStation 4</label></p>
          <p><input type="checkbox" name="PC" value="PC" className="pcont" checked={selectedPlatforms.includes("PC")} onChange={handleCheckChangePlatfomrs}/><label>PC</label></p>
          <p><input type="checkbox" name="Nintendo Switch" className="pcont" value="Nintendo Switch" checked={selectedPlatforms.includes("Nintendo Switch")} onChange={handleCheckChangePlatfomrs}/><label>Nintendo Switch</label></p>
          <p className="error">{error.platforms && error.platforms}</p>
          </div>





          <label className="titleInput" >Fecha de salida</label>
          <input name="released" value={input.released} onChange={handleChange} className="campo" placeholder="25-12-2025"/>
            <p className="error">{error.released && error.released}</p>

          <label className="titleInput">Rating</label>
              <input name="rating" value={input.rating} onChange={handleChange} className="campo" placeholder="Entre 0 y 5"/>
              <p className="error">{error.rating && error.rating}</p>


          <label className="titleInput">URL de la imagen</label>
            <input name="image" value={input.image} onChange={handleChange} className="campo" placeholder="www.urlimagen.com"/>
            <p className="error">{error.image && error.image}</p>


            <label className="titleInput">Géneros:</label>
                  <div className="cbTable">
                      {allGeneres.map((genre) => (
                        <p key={genre.id} className="pcont">
                              <input
                                type="checkbox"
                                name="genres"
                                value={genre.id}
                                checked={generes.includes(genre.id)}
                                onChange={handleCheckChange}
                                />
                          
                            <label>
                              {genre.name}
                            </label>
                          
                        </p>
                      ))}
                    
                  </div>
                  <p className="error">{error.genre && error.genre}</p>
                  <button type="submit" handleSubmit={handleSubmit}>ENVIAR</button>
                  {success && <p className="success"></p>}
        </form>
    </div>

  )
}
export default Create;