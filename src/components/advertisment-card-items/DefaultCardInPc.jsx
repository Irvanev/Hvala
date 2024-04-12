import React from "react";
import Logo from "../../assets/logo.png";
import { Container, Row, Col, Breadcrumb, Image, Placeholder } from "react-bootstrap";
import {useTranslation} from 'react-i18next';

const DefaultCardInPc = () => {
    const {t} = useTranslation();

    const productImage = {
        width: "600px",
        height: "500px",
        objectFit: "cover",
        backgroundColor: "#f8f9fa",
      };
    
      const productPhone = {
        backgroundColor: "orange",
        color: "white",
        border: "none",
      };

    return (
        <Container
            className="mt-3 d-none d-lg-block"
            aria-hidden="true"
        >
            <Row>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/advertisment">{t('home_navbar')}</Breadcrumb.Item>
                        <Breadcrumb.Item href="#">{t('category')}</Breadcrumb.Item>
                        <Breadcrumb.Item active>{t('subCategory')}</Breadcrumb.Item>
                    </Breadcrumb>
                    <h2 id="product-title placeholder col-3">
                        <Placeholder animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>
                    </h2>
                    <Image
                        id="product-image"
                        src={Logo}
                        alt=""
                        className="img-fluid"
                        style={productImage}
                    />
                    <div className="mt-2">
                        <h5>
                            <Placeholder animation="glow">
                                <Placeholder xs={6} />
                            </Placeholder>
                        </h5>
                        <h5>
                            <Placeholder animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                                <Placeholder xs={8} />
                            </Placeholder>
                        </h5>
                    </div>
                </Col>
                <Col>
                    <h2 id="product-price placeholder-glow">
                        <Placeholder animation="glow">
                            <Placeholder xs={3} />
                        </Placeholder>
                    </h2>
                    <Placeholder.Button
                        style={productPhone}
                        className=" d-block mb-3"
                        xs={12}
                    />
                    <Placeholder.Button
                        className=" d-block mb-3"
                        style={productPhone}
                        xs={12}
                    />
                    <div
                        className="d-flex justify-content-between mt-3"
                        id="seller-info"
                    ></div>
                </Col>
            </Row>
        </Container>
    );
}

export default DefaultCardInPc;