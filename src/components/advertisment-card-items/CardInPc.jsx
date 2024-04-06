// CardItemComponent.jsx
import React from 'react';
import { Container, Row, Col, Breadcrumb, Carousel, Image } from 'react-bootstrap';
import CharactersForCard from './CharactersForCard';
import ModalForNumberPhone from './ModalForNumberPhone';
import { Link } from 'react-router-dom';
import Logo from "../../assets/logo.png"
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import {db} from '../../config/firebase'



const CardInPc = ({ adData, t, index, handleSelect, handleCallClick, showModal, handleCloseModal, userData, stars }) => {

  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const q = query(collection(db, "feedback"), where("from_uid", "==", userId));
      const querySnapshot = await getDocs(q);

      const feedbacks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeedbacks(feedbacks);
    };

    fetchFeedbacks();
  }, [userId]);

  const profileImage = {
    width: "60px",
    height: "60px",
  };

  const productPhone = {
    backgroundColor: "orange",
    color: "white",
    border: "none",
  };

  return (
    <Container className="mt-3 d-none d-lg-block">
      <Row>
        <Col xs={6}>
          <Breadcrumb>
            <Breadcrumb.Item href="/advertisment">Главная</Breadcrumb.Item>
            <Breadcrumb.Item href={`/advertisments/${adData?.category}`}>
              {t(adData?.category)}
            </Breadcrumb.Item>
            {adData?.subcategory && (
              <Breadcrumb.Item active>{t(adData?.subcategory)}</Breadcrumb.Item>
            )}
          </Breadcrumb>
          <h2 id="product-title">{adData?.title}</h2>
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {adData?.photoUrls.map((url, index) => (
              <Carousel.Item key={index}>
                <div
                  style={{
                    backgroundColor: "#dcdcdc",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    className="d-block"
                    src={url}
                    alt={`Slide ${index + 1}`}
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <Row className="mt-3">
            {adData?.photoUrls.map((url, index) => (
              <Col xs={4} md={2} key={index}>
                <Image
                  style={{ objectFit: "contain", height: "100px", width: "100px" }}
                  src={url}
                  alt={`Slide ${index + 1}`}
                  onClick={() => handleSelect(index)}
                  thumbnail
                />
              </Col>
            ))}
          </Row>
          <CharactersForCard adData={adData} t={t} />
        </Col>
        <div className="col-3" style={{ paddingTop: "40px" }}>
          <h2 id="product-price">{adData?.price + "€"}</h2>
          <a
            id="product-phone"
            onClick={handleCallClick}
            className="btn d-block mb-3"
            style={productPhone}
          >
            {t('call')}
          </a>
          <a
            id="product-phone"
            href=""
            className="btn d-block mb-3"
            style={productPhone}
          >
            {t('to_write')}
          </a>
          <div
            className="d-flex justify-content-between mt-3"
            id="seller-info"
          ></div>
          <div className="d-flex justify-content-between mt-3">
            <div>
              <Link to={`/seller/${userData?.id}`} style={{ textDecoration: 'none' }}>
                <h5 className="mb-0">{userData?.name || 'User'}</h5>
              </Link>
              <div className="d-flex align-items-center">
                <h5>{userData?.rating}{stars}</h5>
              </div>
              <div className="d-flex align-items-center">
                <h5>{userData?.rating}{stars}</h5>
              </div>
            </div>
            <Link to={`/seller/${userData?.id}`} style={{ textDecoration: 'none' }}>
              <img
                src={userData?.photoUrl || Logo}
                alt="Seller Image"
                className="rounded-circle"
                style={profileImage}
              />
            </Link>
          </div>
        </div>
        <ModalForNumberPhone adData={adData} showModal={showModal} handleCloseModal={handleCloseModal} />
      </Row>
    </Container>
  );
}

export default CardInPc;