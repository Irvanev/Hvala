import { useHistory, useParams, useLocation } from "react-router-dom";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./cardItem.css";
import { MyNavbar } from "../../components/Navbar/Navbar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fetchSimilarAdvertisements } from "../../services/AdvertismentsCardCategory";
import { useTranslation } from "react-i18next";
import DefaultCardInPc from "../../components/advertisment-card-items/DefaultCardInPc";
import CustomCard from "../../components/card/CustomCard";
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
  const [similarAds, setSimilarAds] = useState([]);
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
        const data = docSnap.data();
        setAdData(data);

        fetchSimilarAdvertisements(data.category, data.subcategory, id, 8)
          .then(setSimilarAds)
          .catch(() => setSimilarAds([]));

        const fromUid = data.from_uid;

        const userQuery = query(collection(db, "users"), where("id", "==", fromUid));
        const userQuerySnapshot = await getDocs(userQuery);

        userQuerySnapshot.forEach((docSnapUser) => {
          setUserData(docSnapUser.data());
        });

        try {
          await updateDoc(docRef, { views_count: increment(1) });
          setAdData((prev) => prev ? { ...prev, views_count: (prev.views_count ?? 0) + 1 } : null);
        } catch (e) {
          console.warn("Could not increment views:", e);
        }
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
        <title>{adData?.title ? `${adData.title} | Hvala` : 'Hvala'}</title>
        <meta name="description" content={adData?.description ? (adData.description.length > 160 ? `${adData.description.slice(0, 157)}...` : adData.description) : 'Oglas na Hvala - oglasna stranica Crna Gora'} />
        <meta property="og:title" content={adData?.title} />
        <meta property="og:description" content={adData?.description} />
        <meta property="og:image" content={adData?.photoUrls?.[0] || Logo} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={fullUrl} />
        {adData && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Hvala", item: "https://hvala.app" },
                { "@type": "ListItem", position: 2, name: adData.category ? t(adData.category) : "Oglasi", item: `https://hvala.app/advertisments/${adData.category || 'rest'}` },
                { "@type": "ListItem", position: 3, name: adData.title || "", item: fullUrl }
              ]
            })}
          </script>
        )}
        {adData && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": adData.title || "",
              "description": (adData.description || "").slice(0, 500),
              ...(adData.photoUrls?.[0] && { image: adData.photoUrls[0] }),
              "url": fullUrl,
              "mainEntityOfPage": { "@type": "WebPage", "@id": fullUrl },
              ...(adData.price != null && {
                offers: {
                  "@type": "Offer",
                  price: adData.price,
                  priceCurrency: adData.currency === "eur" ? "EUR" : "RSD"
                }
              })
            })}
          </script>
        )}
      </Helmet>
      {adData && <h1 className="visually-hidden">{adData.title}</h1>}
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
        <CardInPc adData={adData} adId={id} t={t} index={index} handleSelect={handleSelect} handleCallClick={handleCallClick} showModal={showModal} handleCloseModal={handleCloseModal} userData={userData} />
      )}

      {isLoading ? (
        <DefaultCardInMobile />
      ) : (
        <CardInMobile adData={adData} adId={id} t={t} index={index} handleSelect={handleSelect} handleCallClick={handleCallClick} userData={userData} />
      )}
      {!isLoading && similarAds.length > 0 && (
        <div className="container mt-4 mb-4">
          <h3 className="mb-3" style={{ fontSize: '1.25rem', fontWeight: 600 }}>{t('similar_ads')}</h3>
          <div className="row g-3">
            {similarAds.map((ad) => (
              <div key={ad.id} className="col-6 col-md-4 col-lg-3">
                <CustomCard
                  id={ad.id}
                  images={ad.photoUrls || []}
                  price={ad.price ?? 0}
                  currency={ad.currency || 'eur'}
                  title={ad.title || ''}
                  location={ad.location || ''}
                  date={ad.time_creation}
                  showButtons={false}
                  showFavorite={false}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div >
  );
};
