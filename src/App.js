import Navbar from "./components/Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Authorization } from "./pages/Auth/Authorization";
import { Registration } from './pages/Register/Registration';
import { Advertisement } from "./pages/Advertisment/Adevertisment";
import { CardItem } from './pages/AdvertismentCard/CardItem';
import { Profile } from "./pages/Profile/Profile";
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
  return (
    <div>
        <Router>
          <Switch>
            <Route path={"/advertisment/:id"} component={CardItem}/>
            <Route exact path={"/advertisment"} component={Advertisement}/>
            <Route exact path={"/sign_up"} component={Registration}/>
            <Route exact path={"/sign_in"} component={Authorization}/>
            <Route path={"/profile"} component={Profile}/>
        </Switch>
        </Router>
    </div>
  );
}

export default App;
