import React from 'react';
import { Container, Breadcrumb, Carousel, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CharactersForCard from './CharactersForCard';
import Logo from '../../assets/logo.png'

const CardInMobile = ({ adData, t, index, handleSelect, handleCallClick, userData, stars }) => {

    return (
        <Container className="d-lg-none mt-3">
            <Breadcrumb className="mt-3">
                <Breadcrumb.Item href="/advertisment">{t("home_navbar")}</Breadcrumb.Item>
                <Breadcrumb.Item href={`/advertisments/${adData?.category}`}>
                    {t(adData?.category)}
                </Breadcrumb.Item>
                {adData?.subcategory && (
                    <Breadcrumb.Item active>{t(adData?.subcategory)}</Breadcrumb.Item>
                )}
            </Breadcrumb>
            <div className="product-card">
                <Carousel activeIndex={index} onSelect={handleSelect}>
                    {adData?.photoUrls.map((url, index) => (
                        <Carousel.Item key={index}>
                            <div
                                style={{
                                    backgroundColor: "#dcdcdc",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <img
                                    className="d-block"
                                    src={url}
                                    alt={`Slide ${index + 1}`}
                                    style={{ maxWidth: "100%" }}
                                />
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
                <Row className="mt-3">
                    {adData?.photoUrls.map((url, index) => (
                        <Col xs={3} md={2} key={index} className="mt-3">
                            <Image
                                style={{ objectFit: "contain", height: "70px", width: "70px" }}
                                src={url}
                                alt={`Slide ${index + 1}`}
                                onClick={() => handleSelect(index)}
                                thumbnail
                            />
                        </Col>
                    ))}
                </Row>
                <h2 className="product-title mt-3"><strong>{adData?.price + "€"}</strong></h2>
                <h5 className="product-title" style={{ color: "grey" }}>{adData?.title}</h5>
                <Container>
                    <Row className="d-flex justify-content-center align-items-center mt-3">
                        <a
                            id="product-phone"
                            onClick={handleCallClick}
                            className="btn d-block flex-grow-1 mb-3"
                            style={{ backgroundColor: "orange", color: "white"}}
                        >
                            {t('call')}
                        </a>
                        <a
                            id="product-write"
                            href=""
                            className="btn d-block flex-grow-1 mb-3"
                            style={{ backgroundColor: "orange", color: "white" }}
                        >
                            {t('to_write')}
                        </a>
                    </Row>
                </Container>
                <CharactersForCard adData={adData} t={t} />
                <Link to={`/seller/${userData?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Row className="d-flex justify-content-between align-items-center mt-3">
                        <Col>
                            <h5 className="mb-0">{userData?.name || "User"}</h5>
                            <div className="d-flex align-items-center">
                                <h5>{userData?.raiting}{stars}</h5>
                            </div>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Image
                                src={userData?.photoUrl || Logo}
                                alt="Seller Image"
                                roundedCircle
                                style={{ width: "60px", height: "60px" }}
                            />
                        </Col>
                    </Row>
                </Link>
            </div>
        </Container>
    );
}

export default CardInMobile;