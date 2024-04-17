import React from 'react';
import { Card, Col, Carousel } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { useTranslation } from 'react-i18next';

const CardAdvertisementHome = ({ advertisment, index }) => {
    const { i18n } = useTranslation();

    return (
        <Col key={index}>
            <Link key={advertisment.id} to={`/advertisment/${advertisment.id}`} style={{ textDecoration: "none" }}>
                <Card
                    hoverable
                    style={{ height: '57vh' }}
                    cover={
                        <Carousel>
                            {advertisment.photoUrls && advertisment.photoUrls.length > 0 ? (
                                advertisment.photoUrls.map((url, index) => (
                                    <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                                        <img style={{ height: '30vh', width: '100%', objectFit: 'cover' }} alt="example" src={url || Logo} />
                                    </div>
                                ))
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                                    <img style={{ height: '30vh', width: '100%', objectFit: 'cover' }} alt="example" src={Logo} />
                                </div>
                            )}
                        </Carousel>
                    }
                >
                    <Card.Meta title={advertisment.title} />
                    <h5 style={{ color: 'grey' }}>{advertisment.price + '€'}</h5>
                    <p style={{
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {advertisment.location}
                    </p>
                    <p>
                        {advertisment.time_creation && advertisment.time_creation.seconds ?
                            new Date(advertisment.time_creation.seconds * 1000).toLocaleString(i18n.language, {
                                day: 'numeric',
                                month: 'long',
                                hour: '2-digit',
                                minute: '2-digit'
                            }) : 'Не указано время создания'
                        }
                    </p>
                </Card>
            </Link>
        </Col>
    );
};

export default CardAdvertisementHome;