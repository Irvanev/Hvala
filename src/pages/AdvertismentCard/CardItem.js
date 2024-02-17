import {useHistory, useParams} from 'react-router-dom';
import {doc, getDoc} from 'firebase/firestore';
import {db} from "../../config/firebase";
import Logo from '../../assets/logo.png';
import React, {useEffect, useState} from 'react';
import Navbar from "../../components/Navbar/Navbar";
import { Carousel } from 'react-responsive-carousel';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './cardItem.css';
export const CardItem = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const {id} = useParams();
    const [adData, setAdData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();


    const openModal = (url) => {
        setCurrentImage(url);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const goBack = () => {
        history.goBack();
    }

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
        objectFit: 'contain',
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

    const prodImage  = {
        width: "100%",
        height: "auto"
    }

    return (
        <div>

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

            <Navbar/>

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
                    <div className="container mt-2 d-none d-lg-block" style={forCon}>
                        <div className="row">
                            <div className="col">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="/advertisment">Главная</a></li>
                                        <li className="breadcrumb-item"><a href="/advertisment/:category">Catgory</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">SubCategory</li>
                                    </ol>
                                </nav>
                                <h2 id="product-title">{adData?.title}</h2>
                                {!isModalOpen && (
                                    <Carousel showStatus={false}>
                                        {adData?.photoUrls.map((url, index) => (
                                            <div key={index} onClick={() => openModal(url)}>
                                                <img src={url} alt="" />
                                            </div>
                                        ))}
                                    </Carousel>
                                )}
                                {/* ... */}
                                <Modal
                                    isOpen={isModalOpen}
                                    onRequestClose={closeModal}
                                    contentLabel="Image Modal"
                                >
                                    <img src={currentImage} alt="" />
                                    <button onClick={closeModal}>Close</button>
                                </Modal>
                                <div className="mt-2">
                                    <h5></h5>
                                    <p id="product-description">{adData?.description}</p>
                                    <h5></h5>
                                    <p id="product-category">{adData?.category}</p>
                                    <h5></h5>
                                    <p id="product-condition"></p>
                                    <h5></h5>
                                    <p id="product-subcategory"></p>
                                </div>
                            </div>
                            <div className="col">
                                <h2 id="product-price">{adData?.price + '€'}</h2>
                                <a id="product-phone" href="" className="btn d-block mb-3"
                                   style={productPhone}>Позвонить</a>
                                <a id="product-phone" href="" className="btn d-block mb-3"
                                   style={productPhone}>Написать</a>
                                <div className="d-flex justify-content-between mt-3" id="seller-info">
                                </div>
                            </div>
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
                        <Carousel showStatus={false}>
                            {adData?.photoUrls.map((url, index) => (
                                <div key={index}>
                                    <img src={url} alt="" />
                                </div>
                            ))}
                        </Carousel>
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
 