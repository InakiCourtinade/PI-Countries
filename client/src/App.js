import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router-dom";
import LandingPage from "./components/LandingPage"
import Home from './components/Home';
import Detail from './components/CountryDetail';
import CreateActivity from './components/CreateActivity';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path ="/" component={LandingPage}/>
      <Route exact path = "/home" component={Home}/>
      <Route exact path ="/countries/:id" component={Detail}/>
      <Route exact path="/postActivity" component={CreateActivity}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
