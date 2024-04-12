import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Logo from "../../assets/logo.png";

const CardCategory = ({advertisment}) => {
    const { i18n } = useTranslation();

    return (
        <Col>
            <Link key={advertisment.id} to={`/advertisment/${advertisment.id}`} style={{ textDecoration: "none" }}>
                <Card className="shadow-sm">
                    <Card.Img variant="top" src={(advertisment.photoUrls && advertisment.photoUrls[0]) || Logo}
                        alt="imageAdvertisment" className="imageAdvertisment" />
                    <Card.Body>
                        <Card.Text>
                            <span className="location-text">{advertisment.title}</span>
                            <strong>{advertisment.price + '€'}<br /></strong>
                            <span className="location-text">{advertisment.location}</span>
                            <span className="date-text">
                                {new Date(advertisment.time_creation.seconds * 1000).toLocaleString(i18n.language, {
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
    );
}

export default CardCategory;