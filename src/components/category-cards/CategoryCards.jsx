import React from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import AutoCard from "../../assets/auto.png";
import HomeCard from "../../assets/house.png";
import ClothesCard from "../../assets/clothes.png";
import ElectronicsCard from "../../assets/phone.png";
import styles from './category-cards.module.css';

const CategoryCards = () => {
    return (
        <div>
            <Container>
                <Row xs={2} sm={2} md={3} lg={6}>
                    <Col>
                        <a href="/advertisments/transport" className={styles.link}>
                            <Image src={AutoCard} fluid className={styles.lenta} alt="Card of transport"/>
                        </a>
                    </Col>
                    <Col>
                        <a href="/advertisments/estate" className={styles.link}>
                            <Image src={HomeCard} fluid className={styles.lenta} alt="Card of Estate"/>
                        </a>
                    </Col>
                    <Col>
                        <a href="/advertisments/clothes" className={styles.link}>
                            <Image src={ClothesCard} fluid className={styles.lenta} alt="Card of Clothes"/>
                        </a>
                    </Col>
                    <Col>
                        <a href="/advertisments/electronics" className={styles.link}>
                            <Image src={ElectronicsCard} fluid className={styles.lenta} alt="Card of Electronics"/>
                        </a>
                    </Col>
                    <Col>
                        <a href="/advertisments/transport" className={styles.link}>
                            <Image src={AutoCard} fluid className={styles.lenta} alt="Card of transport"/>
                        </a>
                    </Col>
                    <Col>
                        <a href="/advertisments/transport" className={styles.link}>
                            <Image src={AutoCard} fluid className={styles.lenta} alt="Card of transport"/>
                        </a>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CategoryCards;