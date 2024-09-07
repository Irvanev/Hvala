import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Authorization } from "./pages/Auth/Authorization";
import { Registration } from './pages/Register/Registration';
import { CardItem } from './pages/AdvertismentCard/CardItem';
import { Message } from "./pages/message/Message";
import { AddItem } from "./pages/AddAdvertisment/AddItem";
import { useState } from "react";
import LanguageModal from './LanguageModal';
import PrivateRoute from "./components/PrivateRoute";
import { CategoryAdvertisments } from "./pages/CategoryAdvertisment/CategoryAdvertisments";
import Help from './pages/Help';
import SellerProfile from './pages/Profile/SellerProfile';
import ProfileSettings from './pages/Profile/settings/Settings';
import Contact from "./pages/contact";
import EditItem from './pages/EditAdvertisment/EditAdvertismt';
import { PrivacyPolicy } from './pages/PrivacyPolice/privacy';
import TestAdvertisment from './pages/Advertisment/TestAdvertisement';
import MyProfile from './pages/Profile/my-profile/MyProfile';


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
          <Route exact path={"/help"} component={Help} />
          <Route exact path={"/contacts"} component={Contact} />
          <Route exact path={"/seller/:id"} component={SellerProfile} />
          <Route path={"/advertisment/:id"} component={CardItem} />
          <Route exact path={"/"} component={TestAdvertisment} />
          <Route exact path={"/sign_up"} component={Registration} />
          <Route exact path={"/sign_in"} component={Authorization} />
          <Route exact path={"/advertisments/:category"} component={CategoryAdvertisments} />
          <Route exact path={"/privacy_policy"} component={PrivacyPolicy} />
          <PrivateRoute exact path={"/settings"} component={ProfileSettings} />
          <PrivateRoute exact path={"/message"} component={Message} />
          <PrivateRoute exact path={"/message/:chatId"} component={Message} />
          <Route exact path={"/edit/:id"} component={EditItem} />
          <PrivateRoute exact path={"/addItem"} component={AddItem} />
          <PrivateRoute path={"/profile"} component={MyProfile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
