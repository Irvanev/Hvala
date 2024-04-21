import React, { useEffect, useState } from 'react';
import { Card, Col, Carousel } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { useTranslation } from 'react-i18next';
import { getConversionRate } from '../../services/AdvertismentsHome/AdvertismentsService';

const CardAdvertisementHome = ({ advertisment, index }) => {
    const { i18n } = useTranslation();
    const [conversionRate, setConversionRate] = useState(null);
    const [currency, setCurrency] = useState('eur');

    useEffect(() => {
        const fetchConversionRate = async () => {
            const rate = await getConversionRate(currency);
            setConversionRate(rate);
        }
    
        fetchConversionRate();
    }, [currency]);

    const convertedPrice = Math.round(advertisment.price * conversionRate);

    return (
        <Col key={index}>
            <Link key={advertisment.id} to={`/advertisment/${advertisment.id}`} style={{ textDecoration: "none" }}>
                <Card
                    hoverable
                    style={{ height: '61vh', width: '100%'}}
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
                    <p style={{ color: 'grey', fontSize: '1.3em' }}>
                        {advertisment.price + ' ' + currency.toUpperCase()}
                        {conversionRate &&
                            <span style={{ fontSize: '0.8em' }}> ~{convertedPrice.toFixed(2) + ' ' + (currency === 'eur' ? 'din' : '€')}
                            </span>
                        }
                    </p>
                    <p style={{
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {advertisment.location}
                    </p>
                    
                </Card>
            </Link>
        </Col>
    );
};

export default CardAdvertisementHome;