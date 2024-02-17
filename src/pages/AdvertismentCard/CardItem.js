import {useParams} from 'react-router-dom';
import {doc, getDoc} from 'firebase/firestore';
import {db} from "../../config/firebase";
import Logo from '../../assets/logo.png';
import React, {useEffect, useState} from 'react';

export const CardItem = () => {
    const {id} = useParams();
    const [adData, setAdData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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

    return (

        <div>
            {isLoading ? (
                <div>
                    <div class="container mt-2 d-none d-lg-block" aria-hidden="true" style={forCon}>
                        <div class="row">
                            <div class="col">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="/index.html">Главная</a></li>
                                        <li class="breadcrumb-item"><a href="#">Catgory</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">SubCategory</li>
                                    </ol>
                                </nav>
                                <h2 id="product-title placeholder col-3">
                                    <span class="placeholder col-6"></span>
                                </h2>
                                <img id="product-image" src={adData?.image || Logo} alt="" class="img-fluid"
                                     style={productImage}/>
                                <div class="mt-2">
                                    <h5>
                                        <span class="placeholder col-7"></span>
                                    </h5>
                                    <h5>
                                        <span class="placeholder col-7"></span>
                                    </h5>

                                    <h5>
                                        <span class="placeholder col-7"></span>
                                    </h5>

                                    <h5>
                                        <span class="placeholder col-12"></span>
                                    </h5>

                                </div>
                            </div>
                            <div class="col">
                                <h2 id="product-price placeholder-glow">
                                    <span class="placeholder col-2"></span>
                                </h2>
                                <a id="product-phone" href="" class="btn d-block mb-3 disabled placeholder"
                                   style={productPhone}></a>
                                <a id="product-phone" href="" class="btn d-block mb-3 disabled placeholder"
                                   style={productPhone}></a>
                                <div class="d-flex justify-content-between mt-3" id="seller-info">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div class="container mt-2 d-none d-lg-block" style={forCon}>
                        <div class="row">
                            <div class="col">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="/advertisment">Главная</a></li>
                                        <li class="breadcrumb-item"><a href="/advertisment/:category">Catgory</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">SubCategory</li>
                                    </ol>
                                </nav>
                                <h2 id="product-title">{adData?.title}</h2>
                                <img id="product-image" src={adData?.photoUrls[0] || Logo} alt="" class="img-fluid"
                                     style={productImage}/>
                                <div class="mt-2">
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
                            <div class="col">
                                <h2 id="product-price">{adData?.price + '€'}</h2>
                                <a id="product-phone" href="" class="btn d-block mb-3"
                                   style={productPhone}>Позвонить</a>
                                <a id="product-phone" href="" class="btn d-block mb-3" style={productPhone}>Написать</a>
                                <div class="d-flex justify-content-between mt-3" id="seller-info">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
 