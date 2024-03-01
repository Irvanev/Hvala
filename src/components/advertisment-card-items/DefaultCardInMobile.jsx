import React from "react";
import Logo from "../../assets/logo.png";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

const DefaultCardInMobile = () => {

    const productCard = {
        width: "100%",
        maxWidth: "900px",
        paddingTop: "60px",
    };

    const prodImage = {
        width: "100%",
        height: "auto",
    };

    const profileImage = {
        width: "60px",
        height: "60px",
    };

    return (
        <Container className="d-lg-none" style={productCard}>
            <Row className="product-card">
                <Image
                    src={Logo}
                    style={prodImage}
                    alt="Product Image"
                    className="product-image"
                />
                <Col xs={12}>
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
                    <Container>
                        <Row className="d-flex justify-content-between">
                            <Button variant="primary" className="btn flex-grow-1 mb-3">
                                Написать
                            </Button>
                            <Button variant="secondary" className="btn flex-grow-1 mb-3">
                                Позвонить
                            </Button>
                        </Row>
                    </Container>
                    <Row className="d-flex justify-content-between mt-3">
                        <Col>
                            <h5 className="mb-0">Vitaly</h5>
                            <Row className="d-flex align-items-center">
                                <Col>
                                    <span className="bi bi-star-fill text-warning"></span>
                                    <span className="bi bi-star-fill text-warning"></span>
                                    <span className="bi bi-star-fill text-warning"></span>
                                    <span className="bi bi-star-fill text-warning"></span>
                                    <span className="bi bi-star text-secondary"></span>
                                </Col>
                                <a
                                    href="reviews.html"
                                    className="text-decoration-none ms-3"
                                >
                                    5 отзывов
                                </a>
                            </Row>
                        </Col>
                        <Image
                            src={Logo}
                            alt="Seller Image"
                            roundedCircle
                            style={profileImage}
                        />
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default DefaultCardInMobile;