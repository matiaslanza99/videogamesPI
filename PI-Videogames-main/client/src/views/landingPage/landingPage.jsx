import { Link } from "react-router-dom";
import "../landingPage/landingPage.style.css";

function LandingPage() {
  return (
    <div className="landingPage">
      <video className="bkVideo" autoPlay loop muted>
        <source src="videoFondo.mp4" type="video/mp4" />
      </video>
      <h1 className="landingPageTitle">VIDEOGAMES PI</h1>
      <Link to="/home">
        <button className="exploreButton">Explorar</button>
      </Link>
    </div>
  );
}

export default LandingPage;
