import React from "react";
import { Card, Col, Carousel } from 'antd';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Logo from "../../assets/logo.png";
import { formatAdCardDate } from '../../utils/dateFormat';

const CardCategory = ({ advertisment }) => {
    const { t } = useTranslation();
    return (
        <Col>
            <Link key={advertisment.id} to={`/advertisment/${advertisment.id}`} style={{ textDecoration: "none" }}>
                <Card
                    hoverable
                    style={{ height: '57vh' }}
                    cover={
                        <Carousel>
                            {advertisment.photoUrls && advertisment.photoUrls.length > 0 ? (
                                advertisment.photoUrls.map((url, index) => (
                                    <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                                        <img style={{ height: '30vh', width: '100%', objectFit: 'cover' }} alt="example" src={url || Logo} loading="lazy" decoding="async" />
                                    </div>
                                ))
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                                    <img style={{ height: '30vh', width: '100%', objectFit: 'cover' }} alt="example" src={Logo} loading="lazy" />
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
                        {formatAdCardDate(advertisment.time_creation) || '—'}
                    </p>
                </Card>
            </Link>
        </Col>
    );
}

export default CardCategory;