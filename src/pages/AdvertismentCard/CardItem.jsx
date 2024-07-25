import { useHistory, useParams, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./cardItem.css";
import { MyNavbar } from "../../components/Navbar/Navbar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import DefaultCardInPc from "../../components/advertisment-card-items/DefaultCardInPc";
import DefaultCardInMobile from "../../components/advertisment-card-items/DefaultCardInMobile";
import CardInPc from "../../components/advertisment-card-items/CardInPc";
import CardInMobile from "../../components/advertisment-card-items/CardInMobile";
import { NavBarShare } from "../../components/Navbar/NavBarShare";
import Logo from '../../assets/logo.png'

import { Helmet } from 'react-helmet';

export const CardItem = () => {
  const { id } = useParams();
  const [adData, setAdData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const isUserAuthenticated = auth.currentUser;

  const location = useLocation();
  const fullUrl = `${window.location.origin}${location.pathname}`;

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleCallClick = () => {
    if (isUserAuthenticated) {
      setShowModal(true);
    } else {
      setShowModal(true);
      history.push('/sign_in');
    }
  };
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "advertisment", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAdData(docSnap.data());

        const fromUid = docSnap.data().from_uid;

        const userQuery = query(collection(db, "users"), where("id", "==", fromUid));
        const userQuerySnapshot = await getDocs(userQuery);

        userQuerySnapshot.forEach((doc) => {
          setUserData(doc.data());
        });
      } else {
        console.log("No such document!");
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <Helmet>
        <title>{adData?.title}</title>
        <meta property="og:title" content={adData?.title} />
        <meta property="og:description" content={adData?.description} />
        <meta property="og:image" content={adData?.photoUrls[0] || Logo} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content="website" />
      </Helmet>
      <style type="text/css">
        {`
                .carousel-item img {
                    width: 100%;
                    height: 400px;
                    object-fit: contain;
                }
                @media (max-width: 1000px) {
                    body {
                      padding-top: 3.5rem;
                      padding-bottom: 6rem;
                    }
                }
                @media (min-width: 1000px) {
                  body {
                    padding-top: 3.5rem;
                    padding-bottom: 3.5rem;
                  }
                }
                
                `}
      </style>

      <NavBarShare />

      <MyNavbar />

      {isLoading ? (
        <DefaultCardInPc />
      ) : (
        <CardInPc adData={adData} t={t} index={index} handleSelect={handleSelect} handleCallClick={handleCallClick} showModal={showModal} handleCloseModal={handleCloseModal} userData={userData} fromUid />
      )}

      {isLoading ? (
        <DefaultCardInMobile />
      ) : (
        <CardInMobile adData={adData} t={t} index={index} handleSelect={handleSelect} handleCallClick={handleCallClick} userData={userData} />
      )}
    </div >
  );
};
