import React, { useEffect, useState } from 'react';
import { Card, Col, Carousel } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { useTranslation } from 'react-i18next';
import { getConversionRate } from '../../services/AdvertismentsHome/AdvertismentsService';
import { formatDistanceToNow, format } from 'date-fns';
import { ru, enUS, sr } from 'date-fns/locale';

const CardAdvertisementHome = ({ advertisment, index }) => {
    const { i18n } = useTranslation();
    const [conversionRate, setConversionRate] = useState(null);
    const [currency, setCurrency] = useState('');

    useEffect(() => {
        setCurrency(advertisment.currency);
        const fetchConversionRate = async () => {
            const rate = await getConversionRate(currency);
            setConversionRate(rate);
        }

        fetchConversionRate();
    }, [currency]);

    const convertedPrice = Math.round(advertisment.price * conversionRate);

    const formatPrice = (price) => {
        if (price >= 1000000) {
            return parseInt(price / 1000000) + 'm ';
        } else {
            return price;
        }
    }

    const formatCurrency = (currency) => {
        if (currency === 'eur') {
            return '€';
        } else {
            return currency;
        }
    }

    function formatDate(timestamp) {
        const locales = { ru, en: enUS, sr };
        const locale = locales[i18n.language] || enUS;

        const date = new Date(timestamp.seconds * 1000);
        const formattedDate = formatDistanceToNow(date, { addSuffix: true, locale });

        const today = new Date();
        const isToday = date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

        if (isToday) {
            return format(date, 'HH:mm', { locale });
        } else if (formattedDate.includes('день')) {
            return `вчера ${format(date, 'HH:mm', { locale })}`;
        } else {
            return format(date, 'd MMMM HH:mm', { locale });
        }
    }

    return (
        <>
            <Col key={index} className='d-none d-lg-block'>
                <Link key={advertisment.id} to={`/advertisment/${advertisment.id}`} style={{ textDecoration: "none" }}>
                    <Card
                        hoverable
                        style={{ height: '51vh', width: '100%' }}
                        bodyStyle={{ padding: 0, margin: '1vh' }}
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
                            {advertisment.price + formatCurrency(currency)}
                            {conversionRate &&
                                <span style={{ fontSize: '0.8em' }}> ~{formatPrice(convertedPrice) + '' + (currency === 'eur' ? 'din' : '€')}
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
                        <p>{formatDate(advertisment.time_creation)}</p>

                    </Card>
                </Link>
            </Col>

            <Col key={index} className='d-lg-none'>
                <Link key={advertisment.id} to={`/advertisment/${advertisment.id}`} style={{ textDecoration: "none" }}>
                    <Card
                        hoverable
                        style={{ height: '52vh', width: '100%' }}
                        bodyStyle={{ padding: 0, margin: '1vh' }}
                        cover={
                            <Carousel>
                                {advertisment.photoUrls && advertisment.photoUrls.length > 0 ? (
                                    advertisment.photoUrls.map((url, index) => (
                                        <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                                            <img style={{ height: '25vh', width: '100%', objectFit: 'cover' }} alt="example" src={url || Logo} />
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                                        <img style={{ height: '25vh', width: '100%', objectFit: 'cover' }} alt="example" src={Logo} />
                                    </div>
                                )}
                            </Carousel>
                        }
                    >
                        <Card.Meta title={advertisment.title} />
                        <p style={{ color: 'grey', fontSize: '1.3em' }}>
                            {advertisment.price + formatCurrency(currency)}
                            {conversionRate &&
                                <span style={{ fontSize: '0.8em' }}> ~{formatPrice(convertedPrice) + '' + (currency === 'eur' ? 'din' : '€')}
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
                        <p>{formatDate(advertisment.time_creation)}</p>

                    </Card>
                </Link>
            </Col>
        </>
    );
};

export default CardAdvertisementHome;