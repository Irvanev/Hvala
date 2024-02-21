import {useHistory, useParams} from 'react-router-dom';
import {doc, getDoc} from 'firebase/firestore';
import {db} from "../../config/firebase";
import Logo from '../../assets/logo.png';
import React, {useEffect, useState} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './cardItem.css';
import {MyNavbar} from '../../components/Navbar/Navbar';
import {Carousel, Row, Col, Image, Button, Modal} from 'react-bootstrap';
import {useTranslation} from "react-i18next";

export const CardItem = () => {
    const {id} = useParams();
    const [adData, setAdData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const [index, setIndex] = useState(0);
    const {t} = useTranslation();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // предположим, что это состояние отслеживает, вошел ли пользователь в систему
    const [showModal, setShowModal] = useState(false);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };


    const goBack = () => {
        history.goBack();
    }

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
            const docRef = doc(db, 'advertisment', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setAdData(docSnap.data());
            } else {
                console.log("No such document!");
            }
            setIsLoading(false);
        };

        fetchData();
    }, [id]);

    const productData = {
        width: '100%',
        maxWidth: '900px',
        paddingTop: '60px',
    }

    const profileImage = {
        width: '60px',
        height: '60px',
    }

    const productImage = {
        width: '600px',
        height: '500px',
        objectFit: 'cover',
        backgroundColor: '#f8f9fa',
    }

    const productPhone = {
        backgroundColor: 'orange',
        color: 'white',
    }

    const forCon = {
        paddingTop: '70px',
    }

    const productCard = {
        width: "100%",
        maxWidth: "900px",
        paddingTop: "60px",
    }

    const prodImage = {
        width: "100%",
        height: "auto"
    }

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
                            <a className="nav-link active" aria-current="page" onClick={goBack}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                     className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <MyNavbar/>

            {isLoading ? (
                <div>
                    <div className="container mt-2 d-none d-lg-block" aria-hidden="true" style={forCon}>
                        <div className="row">
                            <div className="col">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="/index.html">Главная</a></li>
                                        <li className="breadcrumb-item"><a href="#">Catgory</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">SubCategory</li>
                                    </ol>
                                </nav>
                                <h2 id="product-title placeholder col-3">
                                    <span className="placeholder col-6"></span>
                                </h2>
                                <img id="product-image" src={Logo} alt="" className="img-fluid"
                                     style={productImage}/>
                                <div className="mt-2">
                                    <h5>
                                        <span className="placeholder col-7"></span>
                                    </h5>
                                    <h5>
                                        <span className="placeholder col-7"></span>
                                    </h5>

                                    <h5>
                                        <span className="placeholder col-7"></span>
                                    </h5>

                                    <h5>
                                        <span className="placeholder col-12"></span>
                                    </h5>

                                </div>
                            </div>
                            <div className="col">
                                <h2 id="product-price placeholder-glow">
                                    <span className="placeholder col-2"></span>
                                </h2>
                                <a id="product-phone" href="" className="btn d-block mb-3 disabled placeholder"
                                   style={productPhone}></a>
                                <a id="product-phone" href="" className="btn d-block mb-3 disabled placeholder"
                                   style={productPhone}></a>
                                <div className="d-flex justify-content-between mt-3" id="seller-info">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="container d-none d-lg-block" style={forCon}>
                        <div className="row">
                            <div className="col">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="/advertisment">Главная</a></li>
                                        <li className="breadcrumb-item"><a
                                            href="/advertisment/:category">{t(adData?.category)}</a>
                                        </li>
                                        <li className="breadcrumb-item active"
                                            aria-current="page">{t(adData?.subcategory)}</li>
                                    </ol>
                                </nav>
                                <h2 id="product-title">{adData?.title}</h2>
                                <Carousel activeIndex={index} onSelect={handleSelect}>
                                    {adData?.photoUrls.map((url, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block w-100"
                                                src={url}
                                                alt={`Slide ${index + 1}`}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                                <Row className="mt-3">
                                    {adData?.photoUrls.map((url, index) => (
                                        <Col xs={4} md={2} key={index}>
                                            <Image
                                                style={{objectFit: "cover", height: "100px"}}
                                                src={url}
                                                alt={`Slide ${index + 1}`}
                                                onClick={() => handleSelect(index)}
                                                thumbnail
                                            />
                                        </Col>
                                    ))}
                                </Row>
                                <h3>Описание</h3>
                                <div>
                                    {adData?.description && (
                                        <div className="mt-3">
                                            <p id="product-description">{adData.description}</p>
                                        </div>
                                    )}
                                    <h3>Характеристики</h3>
                                    {adData?.condition && (
                                        <div>
                                            <span
                                                id="product-description">Состояние: <strong>{t(adData.condition)}</strong></span>
                                        </div>
                                    )}
                                    {adData?.brand && (
                                        <div>
                                            <span
                                                id="product-description">Бренд: <strong>{t(adData.brand)}</strong></span>
                                        </div>
                                    )}
                                    {adData?.model && (
                                        <div>
                                            <span
                                                id="product-description">Модель: <strong>{t(adData.model)}</strong></span>
                                        </div>
                                    )}
                                    {adData?.memory && (
                                        <div>
                                            <span id="product-description">Память: <strong>{t(adData.memory)}Gb</strong></span>
                                        </div>
                                    )}
                                    {adData?.screen_size && (
                                        <div>
                                            <span id="product-description">Размер
                                                экрана<strong>{t(adData.screen_size)}</strong>
                                            </span>
                                        </div>
                                    )}
                                    {adData?.location && (
                                        <div className="mt-3">
                                            <h5>Расположение</h5>
                                            <span id="product-description">{t(adData.location)}</span>
                                            <a href={`https://www.google.com/maps/search/?api=1&query=${adData.location}`}
                                               target="_blank" rel="noopener noreferrer" style={{marginLeft: '10px'}}>Показать
                                                на карте</a>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col">
                                <h2 id="product-price">{adData?.price + '€'}</h2>
                                <a id="product-phone" onClick={handleCallClick} className="btn d-block mb-3"
                                   style={productPhone}>Позвонить</a>
                                <a id="product-phone" href="" className="btn d-block mb-3"
                                   style={productPhone}>Написать</a>
                                <div className="d-flex justify-content-between mt-3" id="seller-info">
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
                <div className="container d-lg-none" style={productCard}>
                    <div className="product-card">
                        <img src={adData?.photoUrls[0] || Logo} style={prodImage} alt="Product Image"
                             className="product-image"/>
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
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-primary flex-grow-1 me-2">Написать</button>
                            <button className="btn btn-secondary flex-grow-1">Позвонить</button>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <div>
                                <h5 className="mb-0">Vitaly</h5>
                                <div className="d-flex align-items-center">
                                    <div>
                                        <span className="bi bi-star-fill text-warning"></span>
                                        <span className="bi bi-star-fill text-warning"></span>
                                        <span className="bi bi-star-fill text-warning"></span>
                                        <span className="bi bi-star-fill text-warning"></span>
                                        <span className="bi bi-star text-secondary"></span>
                                    </div>
                                    <a href="reviews.html" className="text-decoration-none ms-3">5 отзывов</a>
                                </div>
                            </div>
                            <img src={Logo} alt="Seller Image" className="rounded-circle"
                                 style={profileImage}/>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container d-lg-none" style={productCard}>
                    <div className="product-card">
                        <Carousel activeIndex={index} onSelect={handleSelect}>
                            {adData?.photoUrls.map((url, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100"
                                        src={url}
                                        alt={`Slide ${index + 1}`}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        <Row className="mt-3">
                            {adData?.photoUrls.map((url, index) => (
                                <Col xs={3} md={2} key={index} className="mt-3">
                                    <Image
                                        style={{objectFit: "contain", height: "50px"}}
                                        src={url}
                                        alt={`Slide ${index + 1}`}
                                        onClick={() => handleSelect(index)}
                                        thumbnail
                                    />
                                </Col>
                            ))}
                        </Row>
                        <h3 className="product-title mt-3">${adData?.price + '€'}</h3>
                        <h5 className="product-title">${adData?.title}</h5>
                        <p className="product-description">${adData?.description}</p>
                        <ul className="product-features">
                            <li>Характеристика 1</li>
                            <li>Характеристика 2</li>
                        </ul>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-primary flex-grow-1 me-2">Написать</button>
                            <button className="btn btn-secondary flex-grow-1">Позвонить</button>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <div>
                                <h5 className="mb-0">Vitaly</h5>
                                <div className="d-flex align-items-center">
                                    <div>
                                        <span className="bi bi-star-fill text-warning"></span>
                                        <span className="bi bi-star-fill text-warning"></span>
                                        <span className="bi bi-star-fill text-warning"></span>
                                        <span className="bi bi-star-fill text-warning"></span>
                                        <span className="bi bi-star text-secondary"></span>
                                    </div>
                                    <a href="reviews.html" className="text-decoration-none ms-3">5 отзывов</a>
                                </div>
                            </div>
                            <img src={Logo} alt="Seller Image" className="rounded-circle"
                                 style={profileImage}/>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}
 