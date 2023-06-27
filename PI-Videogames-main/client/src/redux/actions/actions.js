import axios from "axios";
export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_GAME_BY_ID = "GET_GAME_BY_ID";
export const GET_GAME_BY_NAME= "GET_GAME_BY_NAME";
//export const GET_GAMES_BY_GENERE = "GET_GAMES_BY_GENERE";
export const GET_ALL_GENERES = "GET_ALL_GENERES";
export const CREATE_GAME = "CREATE_GAME"
export const ORDER = "ORDER";
export const FONT = "FONT";
export const RATING = "RATING";
export const GENRE = "GENRE";
export const DEFAULT = "DEFAULT";


export function getAllGames(){
    return async function (dispatch){
        try{
            const response = await axios.get("http://localhost:3001/videogames");
            return dispatch({
                type:GET_ALL_GAMES,
                payload:response.data
            })
        }catch(error){
            alert(error)
        }
    }
}

export function getAllGeneres(){
    return async function(dispatch) {
        try{
            const response = await axios.get('http://localhost:3001/generes');
            dispatch({
                type: GET_ALL_GENERES,
                payload: response.data,
            });
        }catch(error){
            alert(error);
        }

    }
}
export function getGameByID(id){
    return async function (dispatch){
        try{
            const response = await axios.get(`http://localhost:3001/videogames/detail/${id}`);
            dispatch({
                type: GET_GAME_BY_ID,
                payload: response.data,
            });
        }catch(error){
            alert(error)
        }
    }
}

export function getGameByName(name){
    return async function(dispatch){
        try{
            const response = await axios.get(`http://localhost:3001/videogames/name?name=${name}`)
            return dispatch({
                type:GET_GAME_BY_NAME,
                payload: response.data
            })
        }catch(error){
            alert(error)
        }
    }
}
/*
export function getGameByGenere(genere){
    return async function(dispatch){
        try{
            const response = await axios.get(`http://localhost:3001/videogames/${genere}`)
            return dispatch({
                type:GET_GAMES_BY_GENERE,
                payload: response.data
            })
        }catch(error){
            alert(error)
        }
    }
}*/

export function createGame(gameData) {
    return async function(dispatch) {
      try {
        const response = await axios.post('http://localhost:3001/videogames/create',gameData);
        console.log('response',response);
        dispatch({
          type: 'CREATE_GAME',
          payload: response.data
        });
        return response.data;
      } catch (error) {
        alert(error);
      }
    };
  }

export const orderCards = (order) =>{
    return {
        type: ORDER, 
        payload: order
    }
};

export const filterFont = (gender)=> {
    return {
        type: FONT,
        payload: gender
    }
};

export const filterRating = (order) =>{
    return {
        type: RATING, 
        payload: order
    }
};
export const filterGenre = (genre) =>{
    return {
        type: GENRE, 
        payload: genre
    }
};
export const setDefault = () => {
    return {
      type: DEFAULT
    };
  };


