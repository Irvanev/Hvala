import React, { useEffect, useState } from 'react';
import { MyNavbar } from '../../components/Navbar/Navbar';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import Categories from '../../components/category';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Card, Container, Form, Row, Col, Placeholder } from 'react-bootstrap';
import Logo from '../../assets/logo.png'
import { db } from "../../config/firebase";

export const CategoryAdvertisments = () => {
    const { category } = useParams();
    const history = useHistory();
    const [advertisments, setAdvertisments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'advertisment'), where('category', '==', category));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newAdvertisments = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setAdvertisments(newAdvertisments);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [category]);

    const goBack = () => {
        history.goBack();
    }

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

            <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light d-lg-none">
                <div className="container">
                    <ul className="navbar-nav me-auto mb-md-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" onClick={goBack}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                    className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

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
                                <Form.Control placeholder="Цена мин" type="number" />
                            </Col>
                            <Col>
                                <Form.Control placeholder="Цена макс" type="number" />
                            </Col>
                        </Row>
                    </Col>
                    {isLoading ? (
                        <Col md={9}>
                            <Container className="album mt-3">
                                <Row xs={2} sm={2} md={3} lg={4} className="g-3" id="cardAds">
                                    <Col>
                                        <Card className="shadow-sm">
                                            <Card.Img variant="top" src={Logo}
                                                alt="imageAdvertisment" className="imageAdvertisment" />
                                            <Card.Body>
                                                <Card.Text>
                                                    <Placeholder animation="glow">
                                                        <Placeholder xs={6} />
                                                    </Placeholder>
                                                    <Placeholder animation="glow">
                                                        <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                                                        <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                                                        <Placeholder xs={8} />
                                                    </Placeholder>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="shadow-sm">
                                            <Card.Img variant="top" src={Logo}
                                                alt="imageAdvertisment" className="imageAdvertisment" />
                                            <Card.Body>
                                                <Card.Text>
                                                    <Placeholder animation="glow">
                                                        <Placeholder xs={6} />
                                                    </Placeholder>
                                                    <Placeholder animation="glow">
                                                        <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                                                        <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                                                        <Placeholder xs={8} />
                                                    </Placeholder>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="shadow-sm">
                                            <Card.Img variant="top" src={Logo}
                                                alt="imageAdvertisment" className="imageAdvertisment" />
                                            <Card.Body>
                                                <Card.Text>
                                                    <Placeholder animation="glow">
                                                        <Placeholder xs={6} />
                                                    </Placeholder>
                                                    <Placeholder animation="glow">
                                                        <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                                                        <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                                                        <Placeholder xs={8} />
                                                    </Placeholder>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="shadow-sm">
                                            <Card.Img variant="top" src={Logo}
                                                alt="imageAdvertisment" className="imageAdvertisment" />
                                            <Card.Body>
                                                <Card.Text>
                                                    <Placeholder animation="glow">
                                                        <Placeholder xs={6} />
                                                    </Placeholder>
                                                    <Placeholder animation="glow">
                                                        <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                                                        <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                                                        <Placeholder xs={8} />
                                                    </Placeholder>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    ) : (
                        <Col md={9}>
                            <Container className="album mt-3">
                                <Row xs={2} sm={2} md={3} lg={4} className="g-3" id="cardAds">
                                    {advertisments.map((advertisment) => (
                                        <Col>
                                            <Link key={advertisment.id} to={`/advertisment/${advertisment.id}`} style={{ textDecoration: "none" }}>
                                                <Card className="shadow-sm">
                                                    <Card.Img variant="top" src={(advertisment.photoUrls && advertisment.photoUrls[0]) || Logo}
                                                        alt="imageAdvertisment" className="imageAdvertisment" />
                                                    <Card.Body>
                                                        <Card.Text>
                                                            <span className="location-text">{advertisment.title}</span>
                                                            <strong>{advertisment.price + '€'}<br /></strong>
                                                            <span className="location-text">{advertisment.location}</span>
                                                            <span className="date-text">
                                                                {new Date(advertisment.time_creation.seconds * 1000).toLocaleString('ru', {
                                                                    day: 'numeric',
                                                                    month: 'long',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })}
                                                            </span>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Link>
                                        </Col>
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