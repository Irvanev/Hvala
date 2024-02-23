import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { Authorization } from "./pages/Auth/Authorization";
import { Registration } from './pages/Register/Registration';
import { Advertisement } from "./pages/Advertisment/Adevertisment";
import { CardItem } from './pages/AdvertismentCard/CardItem';
import { Profile } from "./pages/Profile/Profile";
import { Message } from "./pages/message/Message";
import { AddItem } from "./pages/AddAdvertisment/AddItem";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {useState} from "react";
import LanguageModal from './LanguageModal';
import PrivateRoute from "./components/PrivateRoute";
import {CategoryAdvertisments} from "./pages/CategoryAdvertisment/CategoryAdvertisments";
import Help from './pages/Help';
import SellerProfile from './pages/Profile/SellerProfile';
import ProfileSettings from './pages/Profile/Settings';
import Contact from "./pages/contact";


function App() {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
    };

  return (
    <div>
        <LanguageModal show={showModal} handleClose={handleClose} />
        <Router>
            <Switch>
              <Route exact path={"/help"} component={Help}/>
              <Route exact path={"/contacts"} component={Contact}/>
              <Route exact path={"/settings"} component={ProfileSettings}/>
              <Route exact path={"/seller/:id"} component={SellerProfile}/>
              <Route path={"/advertisment/:id"} component={CardItem}/>
              <Route exact path={"/advertisment"} component={Advertisement}/>
              <Route exact path={"/sign_up"} component={Registration}/>
              <Route exact path={"/sign_in"} component={Authorization}/>
              <Route exact path={"/advertisments/:category"} component={CategoryAdvertisments}/>
                <PrivateRoute exact path={"/message"} component={Message}/>
                <PrivateRoute exact path={"/addItem"} component={AddItem}/>
                <PrivateRoute path={"/profile"} component={Profile}/>
                <Redirect from="/" to="/advertisment" />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
