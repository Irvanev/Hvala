import React from "react";
import { Card, Col, Placeholder } from "react-bootstrap";
import Logo from "../../assets/logo.png";

const DefaultCardCategory = () => {
    return (
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
    );
}

export default DefaultCardCategory;