import { useHistory, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { db } from "../../config/firebase";
import Logo from "../../assets/logo.png";
import star from '../../assets/star.png';
import halfStar from '../../assets/rating2.png';
import emptyStar from '../../assets/star2.png';
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./cardItem.css";
import { MyNavbar } from "../../components/Navbar/Navbar";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  Carousel,
  Row,
  Col,
  Image,
  Button,
  Modal,
  Container,
  Placeholder,
  Breadcrumb,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const CardItem = () => {
  const { id } = useParams();
  const [adData, setAdData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const goBack = () => {
    history.goBack();
  };

  const stars = Array(5).fill(null).map((_, index) => {
    if (userData?.raiting > index) {
      if (userData?.raiting > index + 0.5) {
        return <img src={star} alt="star" width="20" height="20" />;
      } else {
        return <img src={halfStar} alt="half star" width="20" height="20" />;
      }
    } else {
      return <img src={emptyStar} alt="empty star" width="20" height="20" />;
    }
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Поделиться страницей',
        url: window.location.href
      }).then(() => {
        console.log('Успешное открытие диалога "Поделиться"');
      })
        .catch((error) => {
          console.log('Ошибка при открытии диалога "Поделиться"', error);
        });
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          console.log('Ссылка скопирована в буфер обмена');
          alert('Ссылка скопирована в буфер обмена');
        })
        .catch((err) => {
          console.log('Ошибка при копировании ссылки в буфер обмена', err);
        });
    }
  };

  const handleCallClick = () => {
    if (isUserLoggedIn) {
      setShowModal(true);
    } else {
      setShowModal(true);
      //history.push('/login');
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

  const profileImage = {
    width: "60px",
    height: "60px",
  };

  const productImage = {
    width: "600px",
    height: "500px",
    objectFit: "cover",
    backgroundColor: "#f8f9fa",
  };

  const productPhone = {
    backgroundColor: "orange",
    color: "white",
    border: "none",
  };

  const forCon = {
    paddingTop: "70px",
  };

  const productCard = {
    width: "100%",
    maxWidth: "900px",
    paddingTop: "60px",
  };

  const prodImage = {
    width: "100%",
    height: "auto",
  };

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

      <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light d-lg-none">
        <div className="container">
          <ul className="navbar-nav me-auto mb-md-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                onClick={goBack}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav d-flex">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" onClick={handleShare}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                  className="bi bi-share" viewBox="0 0 16 16">
                  <path d="M4 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm8-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-8 2v3.586l2.828-2.828a1 1 0 0 1 1.414 0 1 1 0 0 1 0 1.414L4 12.414V10a2 2 0 1 0 0-4zm8 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <MyNavbar />

      {isLoading ? (
        <Container
          className="mt-2 d-none d-lg-block"
          aria-hidden="true"
          style={forCon}
        >
          <Row>
            <Col>
              <Breadcrumb>
                <Breadcrumb.Item href="/advertisment">Главная</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Catgory</Breadcrumb.Item>
                <Breadcrumb.Item active>SubCategory</Breadcrumb.Item>
              </Breadcrumb>
              <h2 id="product-title placeholder col-3">
                <Placeholder animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
              </h2>
              <Image
                id="product-image"
                src={Logo}
                alt=""
                className="img-fluid"
                style={productImage}
              />
              <div className="mt-2">
                <h5>
                  <Placeholder animation="glow">
                    <Placeholder xs={6} />
                  </Placeholder>
                </h5>
                <h5>
                  <Placeholder animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                    <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                    <Placeholder xs={8} />
                  </Placeholder>
                </h5>
              </div>
            </Col>
            <Col>
              <h2 id="product-price placeholder-glow">
                <Placeholder animation="glow">
                  <Placeholder xs={3} />
                </Placeholder>
              </h2>
              <Placeholder.Button
                style={productPhone}
                className=" d-block mb-3"
                xs={12}
              />
              <Placeholder.Button
                className=" d-block mb-3"
                style={productPhone}
                xs={12}
              />
              <div
                className="d-flex justify-content-between mt-3"
                id="seller-info"
              ></div>
            </Col>
          </Row>
        </Container>
      ) : (
        <div>
          <div className="container d-none d-lg-block" style={forCon}>
            <div className="row">
              <div className="col-6">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a style={{ textDecoration: "none", color: "grey" }} href="/advertisment">Главная</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a style={{ textDecoration: "none", color: "grey" }} href={`/advertisments/${adData?.category}`}>
                        {t(adData?.category)}
                      </a>
                    </li>
                    {adData?.subcategory ? (
                      <li className="breadcrumb-item active" aria-current="page">
                        {t(adData?.subcategory)}
                      </li>
                    ) : null}
                  </ol>
                </nav>
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
                        style={{ objectFit: "contain", height: "100px", width:"100px" }}
                        src={url}
                        alt={`Slide ${index + 1}`}
                        onClick={() => handleSelect(index)}
                        thumbnail
                      />
                    </Col>
                  ))}
                </Row>
                <h3>{t('description')}</h3>
                <div>
                  {adData?.description && (
                    <div className="mt-3">
                      <p id="product-description">{adData.description}</p>
                    </div>
                  )}
                  <h3>{t('characteristics')}</h3>
                  {adData?.condition && (
                    <div>
                      <span id="product-description">
                        {t('condition')}: <strong>{t(adData.condition)}</strong>
                      </span>
                    </div>
                  )}
                  {adData?.brand && (
                    <div>
                      <span id="product-description">
                        {t('brand')}: <strong>{t(adData.brand)}</strong>
                      </span>
                    </div>
                  )}
                  {adData?.model && (
                    <div>
                      <span id="product-description">
                        {t('model')}: <strong>{t(adData.model)}</strong>
                      </span>
                    </div>
                  )}
                  {adData?.memory && (
                    <div>
                      <span id="product-description">
                        {t('memory')}: <strong>{t(adData.memory)}Gb</strong>
                      </span>
                    </div>
                  )}
                  {adData?.screen_size && (
                    <div>
                      <span id="product-description">
                        {t('size_screen')}:<strong>{t(adData.screen_size)}</strong>
                      </span>
                    </div>
                  )}
                  {adData?.size && (
                    <div>
                      <span id="product-description">
                        {t('size')}: <strong>{t(adData.size)}</strong>
                      </span>
                    </div>
                  )}
                  {adData?.location && (
                    <div className="mt-3">
                      <h5>{t('location')}</h5>
                      <span id="product-description">{t(adData.location)}</span>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${adData.location}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ marginLeft: "10px" }}
                      >
                        {t('showOnMap')}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-3" style={{paddingTop: "40px"}}>
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
                        <h5>{userData?.raiting}{stars}</h5>
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
              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Номер телефона</Modal.Title>
                </Modal.Header>
                <Modal.Body>{adData?.phone}</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Закрыть
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <Container className="d-lg-none" style={productCard}>
          <Row className="product-card">
            <Image
              src={adData?.photoUrls[0] || Logo}
              style={prodImage}
              alt="Product Image"
              className="product-image"
            />
            <Col xs={12}>
              <h3 className="product-title mt-3">
                <span className="placeholder col-3"></span>
              </h3>
              <h5 className="product-title">
                <span className="placeholder col-12"></span>
              </h5>
              <h5 className="product-title">
                <span className="placeholder col-12"></span>
                <span className="placeholder col-12"></span>
                <span className="placeholder col-12"></span>
                <span className="placeholder col-12"></span>
              </h5>
              <Row className="d-flex justify-content-between">
                <Button variant="primary" className="flex-grow-1 me-2">
                  Написать
                </Button>
                <Button variant="secondary" className="flex-grow-1">
                  Позвонить
                </Button>
              </Row>
              <Row className="d-flex justify-content-between mt-3">
                <Col>
                  <h5 className="mb-0">Vitaly</h5>
                  <Row className="d-flex align-items-center">
                    <Col>
                      <span className="bi bi-star-fill text-warning"></span>
                      <span className="bi bi-star-fill text-warning"></span>
                      <span className="bi bi-star-fill text-warning"></span>
                      <span className="bi bi-star-fill text-warning"></span>
                      <span className="bi bi-star text-secondary"></span>
                    </Col>
                    <a
                      href="reviews.html"
                      className="text-decoration-none ms-3"
                    >
                      5 отзывов
                    </a>
                  </Row>
                </Col>
                <Image
                  src={Logo}
                  alt="Seller Image"
                  roundedCircle
                  style={profileImage}
                />
              </Row>
            </Col>
          </Row>
        </Container>
      ) : (
        <div className="container d-lg-none" style={productCard}>
          <nav aria-label="breadcrumb" className="mt-3">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a style={{ textDecoration: "none", color: "grey" }} href="/advertisment">{t("home_navbar")}</a>
              </li>
              <li className="breadcrumb-item">
                <a style={{ textDecoration: "none", color: "grey" }} href={`/advertisments/${adData?.category}`}>
                  {t(adData?.category)}
                </a>
              </li>
              {adData?.subcategory ? (
                <li className="breadcrumb-item active" aria-current="page">
                  {t(adData?.subcategory)}
                </li>
              ) : null}
            </ol>
          </nav>
          <div className="product-card">
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
                          style={{maxWidth: "100%"}}
                      />
                    </div>
                  </Carousel.Item>
              ))}
            </Carousel>
            <Row className="mt-3">
              {adData?.photoUrls.map((url, index) => (
                  <Col xs={3} md={2} key={index} className="mt-3">
                    <Image
                        style={{objectFit: "contain", height: "70px", width: "70px"}}
                        src={url}
                        alt={`Slide ${index + 1}`}
                        onClick={() => handleSelect(index)}
                        thumbnail
                    />
                  </Col>
              ))}
            </Row>
            <h2 className="product-title mt-3"><strong>{adData?.price + "€"}</strong></h2>
            <h5 className="product-title" style={{ color: "grey" }}>{adData?.title}</h5>
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-primary flex-grow-1 me-2">
                Написать
              </button>
              <button className="btn btn-secondary flex-grow-1" onClick={handleCallClick}>
                Позвонить
              </button>
            </div>
            <h3 className="mt-3">{t("description")}</h3>
            <div>
              {adData?.description && (
                  <div className="mt-3">
                    <p id="product-description">{adData.description}</p>
                  </div>
              )}
              <h3>{t('characteristics')}</h3>
              {adData?.condition && (
                  <div>
                      <span id="product-description">
                        {t('condition')}: <strong>{t(adData.condition)}</strong>
                      </span>
                  </div>
              )}
              {adData?.brand && (
                  <div>
                      <span id="product-description">
                        {t('brand')}: <strong>{t(adData.brand)}</strong>
                      </span>
                  </div>
              )}
              {adData?.model && (
                  <div>
                      <span id="product-description">
                        {t('model')}: <strong>{t(adData.model)}</strong>
                      </span>
                  </div>
              )}
              {adData?.memory && (
                  <div>
                      <span id="product-description">
                        {t('memory')}: <strong>{t(adData.memory)}Gb</strong>
                      </span>
                  </div>
              )}
              {adData?.screen_size && (
                  <div>
                      <span id="product-description">
                        {t('size_screen')}:<strong>{t(adData.screen_size)}</strong>
                      </span>
                  </div>
              )}
              {adData?.size && (
                  <div>
                      <span id="product-description">
                        {t('size')}: <strong>{t(adData.size)}</strong>
                      </span>
                  </div>
              )}
              {adData?.location && (
                  <div className="mt-3">
                    <h5>{t('location')}</h5>
                    <span id="product-description">{t(adData.location)}</span>
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${adData.location}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ marginLeft: "10px" }}
                    >
                      {t('showOnMap')}
                    </a>
                  </div>
              )}
            </div>
            <Link to={`/seller/${userData?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="d-flex justify-content-between mt-3">
                <div>
                  <h5 className="mb-0">{userData?.name || "User"}</h5>
                  <div className="d-flex align-items-center">
                    <h5>{userData?.raiting}{stars}</h5>
                  </div>
                </div>
                <img
                  src={userData?.photoUrl || Logo}
                  alt="Seller Image"
                  className="rounded-circle"
                  style={profileImage}
                />
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
