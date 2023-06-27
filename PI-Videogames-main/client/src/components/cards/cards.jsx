import Card from "../card/card";
import "../cards/cards.style.css";

function Cards({allGames}){
    const gamesList = allGames;
    let count = 0;
    return(
        <div className="cards-list">
            {
                gamesList?.map((videogames)=>{
                    return(
                        <Card
                            key={count++} 
                            id={videogames.id} 
                            image={videogames.image} 
                            name={videogames.name} 
                            genre={videogames.genre}
                            rating={videogames.rating} 
                        />
                    )
                })
            }
        </div>
    )
}
export default Cards;