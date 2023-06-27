import {
        GET_ALL_GAMES,
        GET_GAME_BY_ID,
        GET_GAME_BY_NAME,
        GET_ALL_GENERES,
        ORDER,
        FONT,
        RATING,
        CREATE_GAME,
        DEFAULT,
        GENRE

} from "../actions/actions";

const initialState = {
    videogames:[],
    videogamesCopy:[],
    generes:[],
    game:{}
}
function rootReducer(state=initialState,action){
    switch (action.type){
        case GET_ALL_GAMES:
            return {
                ...state,
                videogames:action.payload,
                videogamesCopy:[...action.payload],    
            };
        case GET_GAME_BY_ID:
            return{
                ...state,
                game:action.payload, 
            }
        case GET_GAME_BY_NAME: 
            return{
                ...state,
                videogames:action.payload,
            };
        case GET_ALL_GENERES:
            return{
                ...state,
                generes:action.payload, 
            }
        case CREATE_GAME:
            return {
                ...state,
                videogames: [...state.videogames, action.payload]
                
            };
            case ORDER:
              const sortedVideogamesCopy = [...state.videogamesCopy];
              return {
                ...state,
                videogamesCopy: action.payload === "A"
                  ? sortedVideogamesCopy.sort((a, b) => a.name.localeCompare(b.name))
                  : sortedVideogamesCopy.sort((a, b) => b.name.localeCompare(a.name))
            };
            
            case RATING:
              const ratedVideogamesCopy = [...state.videogamesCopy];
              return {
                ...state,
                videogamesCopy: action.payload === "D"
                  ? ratedVideogamesCopy.sort((a, b) => a.rating - b.rating)
                  : ratedVideogamesCopy.sort((a, b) => b.rating - a.rating)
            };
            
            case FONT:
              const filteredVideogamesCopy = [...state.videogames];
              const newVideogames = action.payload === "API"
                ? filteredVideogamesCopy.filter(game => !isNaN(game.id))
                : filteredVideogamesCopy.filter(game => isNaN(game.id));
              return {
                ...state,
                videogamesCopy: newVideogames.sort((a, b) => a.name.localeCompare(b.name))
            };

            case GENRE: {
              const filteredVideogamesCopy = [...state.videogames].filter(game => !isNaN(game.id));
              const newVideogames = filteredVideogamesCopy.filter(game => game.genre.includes(action.payload));
              return {
                ...state,
                videogamesCopy: newVideogames.sort((a, b) => a.name.localeCompare(b.name))
              };
            }
        case DEFAULT:
                return {
                  ...state,
                  videogamesCopy: [...state.videogames]
                };
        default:
            return state;
    }
}
export default rootReducer;