import Logo from '../../assets/logo.png';
import { Container, Row, Col, Card, Image, Modal, Button } from 'react-bootstrap';
import { auth, db } from "../../config/firebase";
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from "react";
import { MyNavbar } from '../../components/Navbar/Navbar';
import { useParams, useHistory } from "react-router-dom";
import { signOut } from "firebase/auth";
import star from "../../assets/star.png";
import halfStar from "../../assets/rating2.png";
import emptyStar from "../../assets/star2.png";
import { Link } from "react-router-dom";

export const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [reviews, setReviews] = useState([]);
    const [advertisment, setAdvertisment] = useState([]);

    useEffect(() => {
        const fetchUserAndReviews = async () => {
            const userId = localStorage.getItem('userId');
            let user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                const usersRef = collection(db, 'users');
                const q = query(usersRef, where('id', '==', userId));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    user = doc.data();
                    localStorage.setItem('user', JSON.stringify(user));
                });
            }

            const feedbackRef = collection(db, 'feedback');
            const feedbackQuery = query(feedbackRef, where('to_uid', '==', userId));
            const feedbackSnapshot = await getDocs(feedbackQuery);
            const feedbackCount = feedbackSnapshot.size;

            const reviews = feedbackSnapshot.docs.map(doc => doc.data());
            setReviews(reviews);

            // Ваш запрос к базе данных здесь
            const advertisementRef = collection(db, 'advertisment');
            const advertisementQuery = query(advertisementRef, where('from_uid', '==', userId));
            const advertisementSnapshot = await getDocs(advertisementQuery);
            const advertisements = advertisementSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

            setAdvertisment(advertisements);

            setUser({ ...user, reviewCount: feedbackCount });
        };

        fetchUserAndReviews();
    }, []);

    const goBack = () => {
        history.goBack();
    }
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            alert(error.message);
        }
    }

    const stars = Array(5).fill(null).map((_, index) => {
        if (user?.rating > index) {
            if (user?.rating > index + 0.5) {
                return <img src={star} alt="star" width="20" height="20" />;
            } else {
                return <img src={halfStar} alt="half star" width="20" height="20" />;
            }
        } else {
            return <img src={emptyStar} alt="empty star" width="20" height="20" />;
        }
    });

    function getReviewText(count) {
        if (count === 0) return 'Нет отзывов';
        if (count === 1) return '1 Отзыв';
        if (count > 1 && count < 5) return `${count} Отзыва`;
        return `${count} Отзывов`;
    }

    return (
        <div>

            <style type="text/css">
                {`
                .profile-sections a {
                  display: block;
                  margin-bottom: 10px;
                  text-decoration: none;
                  color: black;
                }
            
                .profile-picture img {
                    border-radius: 50%;
                    width: 100px;
                    height: 100px;
                }
                @media (max-width: 1000px) {
                    body {
                        padding-bottom: 6rem;
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
                    }
                    .imageAdvertisment {
                        width: 100%;
                        height: 220px;
                        object-fit: cover;
                    }
                    .card {
                        height: 400px;
                    }
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
                .col .img-fluid {
                    border: 1px solid rgb(200, 200, 200);
                    border-radius: 10px;
                }
                `}
            </style>

            <MyNavbar />

            <Container id="info" className="d-none d-lg-block">
                <Row>
                    <Col xs={3} className="profile">
                        <div className="profile-picture">
                            <Image src={user?.photoUrl || Logo} alt="photoProfile" id="userPhoto" />
                        </div>
                        <h2 className="profile-name" id="userName">{user?.name || 'Name'}</h2>
                        <div className="profile-reviews d-flex align-items-center">
                            <span className="me-2">{user?.rating.toFixed(1) || '0.0'}</span>
                            {stars}
                        </div>
                        <a onClick={handleShow} style={{ cursor: 'pointer' }}>
                            <h4>{getReviewText(user?.reviewCount || 0)}</h4>
                        </a>
                        <div className="profile-sections">
                            <a href="/settings">Настройки</a>
                            <a href="/message">Сообщения</a>
                        </div>
                    </Col>
                    <Col xs={9}>
                        <Container className="album mt-3">
                            <Row xs={2} sm={2} md={3} lg={4} className="g-3" id="cardAds">
                                {advertisment.length > 0 ? (
                                    advertisment.map((advertisment) => (
                                        <Col key={advertisment.id}>
                                            <Link to={`/advertisment/${advertisment.id}`} style={{ textDecoration: "none" }}>
                                                <Card className="shadow-sm">
                                                    <Card.Img
                                                        variant="top"
                                                        src={
                                                            (advertisment.photoUrls &&
                                                                advertisment.photoUrls[0]) ||
                                                            Logo
                                                        }
                                                        alt="imageAdvertisment"
                                                        className="imageAdvertisment"
                                                    />
                                                    <Card.Body>
                                                        <Card.Text>
                                                            <span className="location-text">
                                                                {advertisment.title}
                                                            </span>
                                                            <strong>
                                                                {advertisment.price + "€"}
                                                                <br />
                                                            </strong>
                                                            <span className="location-text">
                                                                {advertisment.location}
                                                            </span>
                                                            <span className="date-text">
                                                                {new Date(
                                                                    advertisment.time_creation.seconds * 1000
                                                                ).toLocaleString("ru", {
                                                                    day: "numeric",
                                                                    month: "long",
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                            </span>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Link>
                                        </Col>
                                    ))
                                ) : (
                                    <div>
                                        <Card className="mb-3">
                                            <Row className="g-0">
                                                <Col md={8}>
                                                    <Card.Body>
                                                        <Card.Title id="title">Здесь будут ваши объявления</Card.Title>
                                                        <Card.Text id="price"></Card.Text>
                                                    </Card.Body>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </div>
                                )}
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>

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
                    <ul className="navbar-nav d-flex">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" onClick={handleLogout}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                    className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                        d="M10 12.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8zm-1.5-.5h-7v-8h7v8zm1.5 0a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10 0h-8A1.5 1.5 0 0 0 0 1.5v9A1.5 1.5 0 0 0 1.5 12h8a.5.5 0 0 1 .5.5zM14.354 5.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L13.293 6H6.5a.5.5 0 0 1 0-1h6.793l-1.647-1.646a.5.5 0 0 1 .708-.708l3 3z" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <Container className="d-lg-none">
                <Row className='text-center'>
                    <Col>
                        <div className="profile-picture my-3">
                            <Image src={user?.photoUrl || Logo} alt="photoProfile" id="userPhoto" className="mx-auto" />
                        </div>
                        <h2 className="profile-name" id="userName">{user?.name || 'Name'}</h2>
                        <div className="profile-reviews">
                            <span>{user?.rating.toFixed(1) || '0.0'}</span>
                            {stars}
                            <p id="kolRating">{user?.reviewCount || '17'} Отзывов</p>
                        </div>
                        <div className="profile-sections">
                            <a href="/settings">Настройки</a>
                            <a href="/message">Сообщения</a>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Container className="album mt-3">
                        <Row xs={2} sm={2} md={3} lg={4} className="g-3" id="cardAds">
                            {advertisment.length > 0 ? (
                                advertisment.map((advertisment) => (
                                    <Col key={advertisment.id}>
                                        <Link to={`/advertisment/${advertisment.id}`} style={{ textDecoration: "none" }}>
                                            <Card className="shadow-sm">
                                                <Card.Img
                                                    variant="top"
                                                    src={
                                                        (advertisment.photoUrls &&
                                                            advertisment.photoUrls[0]) ||
                                                        Logo
                                                    }
                                                    alt="imageAdvertisment"
                                                    className="imageAdvertisment"
                                                />
                                                <Card.Body>
                                                    <Card.Text>
                                                        <span className="location-text">
                                                            {advertisment.title}
                                                        </span>
                                                        <strong>
                                                            {advertisment.price + "€"}
                                                            <br />
                                                        </strong>
                                                        <span className="location-text">
                                                            {advertisment.location}
                                                        </span>
                                                        <span className="date-text">
                                                            {new Date(
                                                                advertisment.time_creation.seconds * 1000
                                                            ).toLocaleString("ru", {
                                                                day: "numeric",
                                                                month: "long",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            })}
                                                        </span>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    </Col>
                                ))
                            ) : (
                                <div>
                                    <Card className="mb-3">
                                        <Row className="g-0">
                                            <Col md={3}>
                                                <Image className="img-fluid rounded-start" alt="" id="adPhoto" />
                                            </Col>
                                            <Col md={8}>
                                                <Card.Body>
                                                    <Card.Title id="title">Здесь будут ваши объявления</Card.Title>
                                                    <Card.Text id="price"></Card.Text>
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </Card>
                                </div>
                            )}
                        </Row>
                    </Container>
                </Row>
            </Container>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Отзывы</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review.id}>
                                <h5>{review.description}</h5>
                            </div>
                        ))
                    ) : (
                        <p>Нет отзывов</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}