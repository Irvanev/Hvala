import React from "react";
import Logo from '../../assets/logo.png';
import styles from './card-advertisment.module.css';
import {Col, Card, Placeholder} from "react-bootstrap";

const DefaultCardAdvertisment = () => {
    return (
        <Col>
            <Card className={styles.card}>
                <Card.Img variant="top" src={Logo}
                    alt="imageAdvertisment" className={styles.imageAdvertisment}
                />
                <Card.Body>
                    <Card.Text>
                            <Placeholder animation="glow">
                                <Placeholder xs={12} />
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

export default DefaultCardAdvertisment;