import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import LanguageModal from './LanguageModal';
import PrivateRoute from "./components/PrivateRoute";
import { HreflangLinks } from './components/SEO/HreflangLinks';
import { PushNotificationHandler } from './components/PushNotificationHandler';
import { initializePushNotifications } from './services/PushNotificationService';
import { auth } from './config/firebase';
import { ensureReferralCodeForCurrentUser } from './services/hvalacoin/HvalaCoinService';

// Code splitting: загружаем страницы только при переходе (named exports -> default для lazy)
const Authorization = lazy(() => import("./pages/Auth/Authorization").then(m => ({ default: m.Authorization })));
const Registration = lazy(() => import('./pages/Register/Registration').then(m => ({ default: m.Registration })));
const CardItem = lazy(() => import('./pages/AdvertismentCard/CardItem').then(m => ({ default: m.CardItem })));
const Message = lazy(() => import("./pages/message/Message").then(m => ({ default: m.Message })));
const AddItem = lazy(() => import("./pages/AddAdvertisment/AddItem").then(m => ({ default: m.AddItem })));
const CategoryAdvertisments = lazy(() => import("./pages/CategoryAdvertisment/CategoryAdvertisments").then(m => ({ default: m.CategoryAdvertisments })));
const Help = lazy(() => import('./pages/Help'));
const SellerProfile = lazy(() => import('./pages/Profile/SellerProfile'));
const ProfileSettings = lazy(() => import('./pages/Profile/settings/Settings'));
const Contact = lazy(() => import("./pages/contact"));
const EditItem = lazy(() => import('./pages/EditAdvertisment/EditAdvertismt'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolice/privacy').then(m => ({ default: m.PrivacyPolicy })));
const TestAdvertisment = lazy(() => import('./pages/Advertisment/TestAdvertisement'));
const MyProfile = lazy(() => import('./pages/Profile/my-profile/MyProfile'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function LoadingFallback() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    initializePushNotifications();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user?.uid) return;
      try {
        await ensureReferralCodeForCurrentUser();
      } catch (error) {
        console.log("Referral code init skipped:", error?.message || error);
      }
    });

    return () => unsubscribe?.();
  }, []);

  return (
    <div>
      <LanguageModal show={showModal} handleClose={handleClose} />
      <Router>
        <PushNotificationHandler />
        <HreflangLinks />
        <Suspense fallback={<LoadingFallback />}>
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
            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
