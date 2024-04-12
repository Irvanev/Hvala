import { useHistory, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import star from '../../assets/star.png';
import halfStar from '../../assets/rating2.png';
import emptyStar from '../../assets/star2.png';
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./cardItem.css";
import { MyNavbar } from "../../components/Navbar/Navbar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import NavbarForMobileRouting from "../../components/Navbar/NavbarForMobileRouting";
import DefaultCardInPc from "../../components/advertisment-card-items/DefaultCardInPc";
import DefaultCardInMobile from "../../components/advertisment-card-items/DefaultCardInMobile";
import CardInPc from "../../components/advertisment-card-items/CardInPc";
import CardInMobile from "../../components/advertisment-card-items/CardInMobile";

export const CardItem = () => {
  const { id } = useParams();
  const [adData, setAdData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const isUserAuthenticated = localStorage.getItem('isAuthenticated');

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };


  const stars = Array(5).fill(null).map((_, index) => {
    if (userData?.rating > index) {
      if (userData?.rating > index + 0.5) {
        return <img src={star} alt="star" width="20" height="20" />;
      } else {
        return <img src={halfStar} alt="half star" width="20" height="20" />;
      }
    } else {
      return <img src={emptyStar} alt="empty star" width="20" height="20" />;
    }
  });

  const handleCallClick = () => {
    if (isUserAuthenticated) {
      setShowModal(true);
    } else {
      setShowModal(true);
      history.push('/login');
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
                    padding-bottom: 3.5rem;
                  }
                }
                
                `}
      </style>

      <NavbarForMobileRouting />

      <MyNavbar />

      {isLoading ? (
        <DefaultCardInPc />
      ) : (
        <CardInPc adData={adData} t={t} index={index} handleSelect={handleSelect} handleCallClick={handleCallClick} showModal={showModal} handleCloseModal={handleCloseModal} userData={userData} stars={stars} fromUid />
      )}

      {isLoading ? (
        <DefaultCardInMobile />
      ) : (
        <CardInMobile adData={adData} t={t} index={index} handleSelect={handleSelect} handleCallClick={handleCallClick} userData={userData} stars={stars} />
      )}
    </div >
  );
};
