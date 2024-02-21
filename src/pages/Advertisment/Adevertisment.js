import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {collection, getDocs, limit, orderBy, query, startAfter} from 'firebase/firestore';
import {db} from "../../config/firebase";
import Logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';
import LogoSearch from "../../assets/hvala.png"
import {MyNavbar} from '../../components/Navbar/Navbar';
import AutoCard from "../../assets/auto.png"
import ClothesCard from "../../assets/clothes.png"
import ElectronicsCard from "../../assets/phone.png"
import HomeCard from "../../assets/house.png"

export const Advertisement = () => {
    const [ads, setAds] = useState([]);
    const [lastDoc, setLastDoc] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const aStyle = {
        textDecoration: 'none',
    }

    const logoSearch = {
        marginRight: "10px",
        width: "140px"
    }
    const collapse = {
        backgroundColor: "#ffa600",
        color: "azure"
    }

    const drop = {
        position: "absolute",
        zIndex: 1,
        top: "16%",
        boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.5)"
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
            <div className="container" id="advertMedia">
                <form className="d-flex py-4">
                    <a href="/advertisment">
                        <img src={LogoSearch} alt="Logo" style={logoSearch}/>
                    </a>
                    <button className="btn btn me-2 d-none d-lg-block" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseExample" style={collapse}>Категории
                    </button>

                    <div className="collapse" id="collapseExample" style={drop}>
                        <ul id="categories" className="list-group">
                            <li className="list-group-item"><a href="/advertisment/category/estate">Недвижимость</a>
                            </li>
                            <li className="list-group-item"><a href="/advertisment/category/transport">Транспорт</a>
                            </li>
                            <li className="list-group-item"><a href="/advertisment/category/clothes">Одежда</a></li>
                            <li className="list-group-item"><a href="/advertisment/category/electronics">Электроника</a>
                            </li>
                            <li className="list-group-item"><a href="/advertisment/category/house_goods">Товары для
                                дома</a></li>
                            <li className="list-group-item"><a
                                href="/advertisment/category/building_materials_and_tools">Стройматериалы и
                                инструменты</a></li>
                            <li className="list-group-item"><a href="/advertisment/category/transport_goods">Товары для
                                транспорта</a></li>
                            <li className="list-group-item"><a href="/advertisment/category/home_appliance">Бытовая
                                техника</a></li>
                            <li className="list-group-item"><a href="/advertisment/category/service">Услуги</a></li>
                            <li className="list-group-item"><a href="/advertisment/category/child_goods">Товары для
                                детей</a></li>
                            <li className="list-group-item"><a href="/advertisment/category/health_and_beauty">Товары
                                для красоты и здоровья</a></li>
                            <li className="list-group-item"><a href="/advertisment/category/sport">Спорт</a></li>
                            <li className="list-group-item"><a href="/advertisment/category/hobby_n_Relax">Хобби и
                                отдых</a></li>
                            <li className="list-group-item"><a href="/advertisment/category/subcat14">Товары для
                                животных</a></li>
                            <li className="list-group-item"><a href="/advertisment/category/rest">Прочее</a></li>
                        </ul>
                    </div>
                    <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                </form>
            </div>

            <Container>
                <Row xs={2} sm={2} md={3} lg={6}>
                    <Col>
                        <a href="/advertisment/category/transport">
                            <Image src={AutoCard} fluid className="lenta mt-3" alt="..."/>
                        </a>
                    </Col>
                    <Col>
                        <a href="/advertisment/category/estate">
                            <Image src={HomeCard} fluid className="lenta mt-3" alt="..."/>
                        </a>
                    </Col>
                    <Col>
                        <a href="/advertisment/category/clothes">
                            <Image src={ClothesCard} fluid className="lenta mt-3" alt="..."/>
                        </a>
                    </Col>
                    <Col>
                        <a href="/advertisment/category/electronics">
                            <Image src={ElectronicsCard} fluid className="lenta mt-3" alt="..."/>
                        </a>
                    </Col>
                    <Col>
                        <a href="/advertisment/category/transport">
                            <Image src={AutoCard} fluid className="lenta mt-3" alt="..."/>
                        </a>
                    </Col>
                    <Col>
                        <a href="/advertisment/category/transport">
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