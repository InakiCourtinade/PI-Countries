import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router-dom";
import LandingPage from "./components/LandingPage"
import Home from './components/Home';
import Detail from './components/CountryDetail';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path ="/" component={LandingPage}/>
      <Route exact path = "/home" component={Home}/>
      <Route exact path ="/countries/:id" component={Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
