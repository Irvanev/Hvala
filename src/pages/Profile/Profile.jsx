import Logo from '../../assets/logo.png';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { MyNavbar } from '../../components/Navbar/Navbar';
import { Link } from "react-router-dom";
import {useTranslation} from 'react-i18next';
import ProfileCardForPc from '../../components/profile-card/ProfileInfoForPc';
import { fetchUser, fetchReviews, fetchAdvertisements, deleteAdvertisement } from '../../services/ProfileService';
import NavBarForProfileMobile from '../../components/Navbar/NavbarForProfileMobile';
import ProfileInfoForMobile from '../../components/profile-card/ProfileInfoForMobile';
import ModalForNumberReports from '../../components/profile-card/ModalForNumberReports';
import DeleteModal from '../../components/profile-card/DropDownWithModal';

export const Profile = () => {
    const {t} = useTranslation();
    const [user, setUser] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [reviews, setReviews] = useState([]);
    const [advertisment, setAdvertisements] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const userId = localStorage.getItem('userId');
            const user = await fetchUser(userId);
            const { reviews, feedbackCount } = await fetchReviews(userId);
            const advertisements = await fetchAdvertisements(userId);
            setUser({ ...user, reviewCount: feedbackCount });
            setReviews(reviews);
            setAdvertisements(advertisements);
        };

        fetchData();
    }, []);

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
                    <ProfileCardForPc user={user} handleShow={handleShow} />
                    <Col xs={9}>
                        <Container className="album mt-3">
                            <Row xs={2} sm={2} md={3} lg={3} className="g-3" id="cardAds">
                                {advertisment.length > 0 ? (
                                    advertisment.map((advertisment) => (
                                        <Col key={advertisment.id}>
                                            <Card className="shadow-sm">
                                                <Link to={`/advertisment/${advertisment.id}`} style={{ textDecoration: "none" }}>
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
                                                </Link>
                                                <Card.Body>
                                                    <Card.Text>
                                                        <Link to={`/advertisment/${advertisment.id}`} style={{ textDecoration: "none", color: "black" }}>
                                                            <span className="location-text">
                                                                {advertisment.title}
                                                            </span>
                                                        </Link>
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
                                                    <DeleteModal advertisment={advertisment} />
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))
                                ) : (
                                    <div>
                                        <Card className="mb-3">
                                            <Row className="g-0">
                                                <Col md={8}>
                                                    <Card.Body>
                                                        <Card.Title id="title">{t('yourAdsWillBeHere')}</Card.Title>
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

            <NavBarForProfileMobile />

            <Container className="d-lg-none">
                <ProfileInfoForMobile user={user} />
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
                                                    <Card.Title id="title">{t('yourAdsWillBeHere')}</Card.Title>
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

            <ModalForNumberReports show={show} handleClose={handleClose} reviews={reviews} />

        </div>
    );
}