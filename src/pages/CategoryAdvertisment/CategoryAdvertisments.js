import React, { useEffect, useState } from 'react';
import {MyNavbar} from '../../components/Navbar/Navbar';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import Categories from '../../components/category';
import {useHistory, useParams} from 'react-router-dom';
import {Card, Container, Form, Row, Col} from 'react-bootstrap';
import Logo from '../../assets/logo.png'
import {db} from "../../config/firebase";

export const CategoryAdvertisments = () => {
    const { category } = useParams();
    const history = useHistory();
    const [advertisments, setAdvertisments] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'advertisment'), where('category', '==', category));
    
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newAdvertisments = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
    
            setAdvertisments(newAdvertisments);
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
                        }
                    }
                    @media (min-width: 1000px) {
                        body {
                            padding-top: 3.5rem;
                            padding-bottom: 3.5em;
                        }
                    }
                    .list-group a {
                    text-decoration: none;
                    color: black;
                    }
                    .list-group a:hover {
                        color: #ffa600;
                    }
                    `}
            </style>

            <MyNavbar/>

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



            <Categories/>

            <Container>
                <Row>
                    <Col md={3}>
                        <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        <Row className='mt-3'>
                            <Col>
                                <Form.Control placeholder="Цена мин" type="number"/>
                            </Col>
                            <Col>
                                <Form.Control placeholder="Цена макс" type="number"/>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={9}>
                        {advertisments.map((ad) => (
                        <Card style={{ height: '200px' }} className='mt-3'>
                            <Row>
                                <Col md={4}>
                                    <Card.Img style={{ height: '200px', width: '250px' }} src={Logo} alt="Ad Image" />
                                </Col>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title>{ad.title}</Card.Title>
                                        <Card.Text>{ad.description}</Card.Text>
                                        <Card.Text>Price: {ad.price}</Card.Text>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                        ))}
                    </Col>
                </Row>
            </Container>

        </div>
    );
}