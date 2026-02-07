import React from "react";
import { Card, Col, Placeholder } from "react-bootstrap";
import Logo from "../../assets/logo_def.png";

const DefaultCardCategory = () => {
    return (
        <Col>
            <Card className="shadow-sm" style={{height: '400px'}}>
                <Card.Img variant="top" src={Logo} style={{height: '250px', objectFit: 'cover'}}
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