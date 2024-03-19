import React, { useState } from 'react';
import { Col, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import styles from './card-advertisment.module.css';

const CardAdvertisementHome = ({ advertisment, index }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleMouseOver = () => {
        setCurrentImageIndex((currentImageIndex + 1) % advertisment.photoUrls.length);
    };

    const handleMouseOut = () => {
        setCurrentImageIndex(0);
    };

    return (
        <Col key={index}>
            <Link key={advertisment.id} to={`/advertisment/${advertisment.id}`} style={{ textDecoration: "none" }}>
                <Card className={styles.card}>
                    <Card.Img variant="top" src={(advertisment.photoUrls && advertisment.photoUrls[currentImageIndex]) || Logo}
                        alt="imageAdvertisment" className={styles.imageAdvertisment}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                    />
                    <Card.Body>
                        <Card.Text>
                            <span className={styles.locationText}>{advertisment.title}</span>
                            <strong>{advertisment.price + '€'}<br /></strong>
                            <span className={styles.locationText}>{advertisment.location}</span>
                            <span className={styles.dateText}>
                                {advertisment.time_creation && advertisment.time_creation.seconds ?
                                    new Date(advertisment.time_creation.seconds * 1000).toLocaleString('ru', {
                                        day: 'numeric',
                                        month: 'long',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }) : 'Не указано время создания'
                                }
                            </span>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    );
};

export default CardAdvertisementHome;