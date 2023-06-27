import './App.css';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LandingPage from './views/landingPage/landingPage';
import Home from './views/home/home';
import Detail from "./views/detail/detail";
import Create from "./views/create/create";
import Search from "./views/search/search";
function App() {
  
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/home" component={Home}/>
          <Route path="/detail/:id" component={Detail}/>
          <Route path="/create" component={Create}/>
          <Route path="/search" component={Search}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
