import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {collection, getDocs, limit, orderBy, query, startAfter} from 'firebase/firestore';
import {db} from "../../config/firebase";
import Logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';
import {MyNavbar} from '../../components/Navbar/Navbar';
import AutoCard from "../../assets/auto.png"
import ClothesCard from "../../assets/clothes.png"
import ElectronicsCard from "../../assets/phone.png"
import HomeCard from "../../assets/house.png"
import Categories from '../../components/category';

export const Advertisement = () => {
    const [ads, setAds] = useState([]);
    const [lastDoc, setLastDoc] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const aStyle = {
        textDecoration: 'none',
    }

    const collapse = {
        backgroundColor: "#ffa600",
        color: "azure"
    }



    const fetchAds = async (afterDoc) => {
        setIsLoading(true);
        let adsQuery = query(collection(db, 'advertisment'), orderBy('time_creation', 'desc'), limit(20));
        if (afterDoc) {
            adsQuery = query(collection(db, 'advertisment'), orderBy('time_creation', 'desc'), startAfter(afterDoc), limit(20));
        }
        const adsSnapshot = await getDocs(adsQuery);
        const adsList = adsSnapshot.docs
            .map(doc => ({id: doc.id, ...doc.data()}))
            .filter(advertisment => Object.keys(advertisment).length > 1); // фильтруем пустые документы
        setLastDoc(adsSnapshot.docs[adsSnapshot.docs.length - 1]);
        setAds(prevAds => [...prevAds, ...adsList]);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchAds();
    }, []);

    return (
        <div>

            <style type="text/css">
                {`
                @media (max-width: 1000px) {
                  .imageAdvertisment {
                    width: 100%;
                    height: 150px;
                    object-fit: cover;
                  }
                  .card {
                    height: 320px;
                    }
                    body {
                        padding-bottom: 6.0rem;
                    }
                }
                @media (min-width: 1000px) {
                  .imageAdvertisment {
                      width: 100%;
                      height: 220px;
                      object-fit: cover;
                  }
                  .card {
                    height: 400px;
                    }
                    body {
                        padding-top: 3.5rem;
                        padding-bottom: 3.5em;
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
            <Categories/>

            <Container>
                <Row xs={2} sm={2} md={3} lg={6}>
                    <Col>
                        <a href="/advertisment/transport">
                            <Image src={AutoCard} fluid className="lenta mt-3" alt="..."/>
                        </a>
                    </Col>
                    <Col>
                        <a href="/advertisment/estate">
                            <Image src={HomeCard} fluid className="lenta mt-3" alt="..."/>
                        </a>
                    </Col>
                    <Col>
                        <a href="/advertisment/clothes">
                            <Image src={ClothesCard} fluid className="lenta mt-3" alt="..."/>
                        </a>
                    </Col>
                    <Col>
                        <a href="/advertisment/electronics">
                            <Image src={ElectronicsCard} fluid className="lenta mt-3" alt="..."/>
                        </a>
                    </Col>
                    <Col>
                        <a href="/advertisment/transport">
                            <Image src={AutoCard} fluid className="lenta mt-3" alt="..."/>
                        </a>
                    </Col>
                    <Col>
                        <a href="/advertisment/transport">
                            <Image src={AutoCard} fluid className="lenta mt-3" alt="..."/>
                        </a>
                    </Col>
                </Row>
            </Container>

            <Container className="album mt-3">
                <Row xs={2} sm={2} md={3} lg={4} className="g-3" id="cardAds">
                    {ads.map((advertisment, index) => (
                        <Col key={index}>
                            <Link key={advertisment.id} to={`/advertisment/${advertisment.id}`} style={aStyle}>
                                <Card className="shadow-sm">
                                    <Card.Img variant="top" src={(advertisment.photoUrls && advertisment.photoUrls[0]) || Logo}
                                              alt="imageAdvertisment" className="imageAdvertisment"/>
                                    <Card.Body>
                                        <Card.Text>
                                            <span className="location-text">{advertisment.title}</span>
                                            <strong>{advertisment.price + '€'}<br/></strong>
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


            <div className="container mt-3 d-flex justify-content-center">
                {isLoading ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <button className='btn' style={collapse} type="button" onClick={() => fetchAds(lastDoc)}>Показать еще</button>
                )}
            </div>

        </div>
    );
}