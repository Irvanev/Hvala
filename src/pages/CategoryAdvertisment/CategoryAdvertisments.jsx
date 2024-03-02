import React, { useEffect, useState } from 'react';
import { MyNavbar } from '../../components/Navbar/Navbar';
import Categories from '../../components/category';
import { useParams } from 'react-router-dom';
import { Container, Form, Row, Col } from 'react-bootstrap';
import NavbarForMobileRouting from '../../components/Navbar/NavbarForMobileRouting';
import DefaultCardCategory from '../../components/advertisment-card-category/DefaultCardCategory';
import CardCategory from '../../components/advertisment-card-category/CardCategory';
import { fetchAdvertismentsByCategory } from '../../services/AdvertismentsCardCategory';

export const CategoryAdvertisments = () => {
    const { category } = useParams();
    const [advertisments, setAdvertisments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    const filteredAdvertisments = advertisments.filter(ad => {
        return (minPrice ? ad.price >= minPrice : true) && (maxPrice ? ad.price <= maxPrice : true);
    });


    useEffect(() => {
        const unsubscribe = fetchAdvertismentsByCategory(category, setAdvertisments, setIsLoading);
        return () => unsubscribe();
    }, [category]);



    return (
        <div>

            <style type="text/css">
                {`
                    @media (max-width: 1000px) {
                        body {
                            padding-bottom: 6.0rem;
                            padding-top: 3.5rem;
                        }
                        .imageAdvertisment {
                            width: 100%;
                            height: 150px;
                            object-fit: cover;
                          }
                          .card {
                            height: 320px;
                            }
                    }
                    @media (min-width: 1000px) {
                        body {
                            padding-top: 3.5rem;
                            padding-bottom: 3.5em;
                        }
                        .card {
                            height: 400px;
                        }
                        .imageAdvertisment {
                            width: 100%;
                            height: 220px;
                            object-fit: cover;
                        }
                    }
                    .list-group a {
                    text-decoration: none;
                    color: black;
                    }
                    .list-group a:hover {
                        color: #ffa600;
                    }
                    .advertisment-description {
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;  
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .location-text {
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;  
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .date-text {
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;  
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .date-text {
                        color: #888888; /* Замените на цвет, который вы хотите использовать */
                    }
                    `}
            </style>

            <MyNavbar />

            <NavbarForMobileRouting />

            <Categories />

            <Container>
                <Row>
                    <Col md={3} className='d-none d-lg-block'>
                        <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        <Row className='mt-3'>
                            <Col>
                                <Form.Control
                                    placeholder="Цена мин"
                                    type="number"
                                    value={minPrice}
                                    onChange={handleMinPriceChange}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    placeholder="Цена макс"
                                    type="number"
                                    value={maxPrice}
                                    onChange={handleMaxPriceChange}
                                />
                            </Col>
                        </Row>
                    </Col>
                    {isLoading ? (
                        <Col md={9}>
                            <Container className="album mt-3">
                                <Row xs={2} sm={2} md={3} lg={4} className="g-3" id="cardAds">
                                    {Array.from({ length: 10 }).map((_, index) => (
                                        <DefaultCardCategory key={index} />
                                    ))}
                                </Row>
                            </Container>
                        </Col>
                    ) : (
                        <Col md={9}>
                            <Container className="album mt-3">
                                <Row xs={2} sm={2} md={3} lg={4} className="g-3" id="cardAds">
                                    {filteredAdvertisments.map((advertisment) => (
                                        <CardCategory key={advertisment.id} advertisment={advertisment} />
                                    ))}
                                </Row>
                            </Container>
                        </Col>
                    )}
                </Row>
            </Container>

        </div>
    );
}