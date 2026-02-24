import React, { useEffect, useState } from 'react';
import { Card, Col, Carousel, Dropdown, Menu, Popconfirm, } from 'antd';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo_def.png';
import { useTranslation } from 'react-i18next';
import { getConversionRate } from '../../services/AdvertismentsHome/AdvertismentsService';
import { formatAdCardDate } from '../../utils/dateFormat';

import { unarchivedAdvertisement, deleteAdvertisement } from '../../services/ProfileService';

const CardAdvertisementProfileArchiveMobile = ({ advertismentArchive, index }) => {
    const { t } = useTranslation();
    const [conversionRate, setConversionRate] = useState(null);
    const [currency, setCurrency] = useState('');

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isUnarchived, setIsUnarchived] = useState(false);
    const [deleteAdvertisment, setDeleteAdvertisment] = useState(false);

    const handleUnarchive = async (id) => {
        await unarchivedAdvertisement(id);
        setIsUnarchived(prevState => !prevState);
        window.location.reload();
    };

    const handleDelete = async (id) => {
        await deleteAdvertisement(id);
        setDeleteAdvertisment(prevState => !prevState);
        window.location.reload();
    };

    useEffect(() => {
        setCurrency(advertismentArchive.currency);
        const fetchConversionRate = async () => {
            const rate = await getConversionRate(currency);
            setConversionRate(rate);
        }

        fetchConversionRate();
    }, [currency, isUnarchived, deleteAdvertisment]);

    const convertedPrice = Math.round(advertismentArchive.price * conversionRate);

    return (
        <>
            <style type="text/css">
                {`
                @media (max-width: 1000px) {
                    body {
                        padding-bottom: 4.5rem;
                    }
                }
                `}
            </style>
            <Col key={index}>
                <Card
                    hoverable
                    actions={[
                        <a href={`/edit/${advertismentArchive.id}`}>
                            <EditOutlined key="edit" />
                        </a>,
                        <Dropdown
                            overlay={
                                <Menu>
                                    <Menu.Item key="1">
                                        <Popconfirm
                                            title={t('publish_question')}
                                            onConfirm={() => handleUnarchive(advertismentArchive.id)}
                                            okText={t('yes')}
                                            cancelText={t('no')}
                                        >
                                            <a href="#">{t('publish')}</a>
                                        </Popconfirm>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <Popconfirm
                                            title={t('delete_question')}
                                            onConfirm={() => handleDelete(advertismentArchive.id)}
                                            okText={t('yes')}
                                            cancelText={t('no')}
                                        >
                                            <a href="#">{t('delete')}</a>
                                        </Popconfirm>
                                    </Menu.Item>
                                </Menu>
                            }
                            open={dropdownVisible}
                            onOpenChange={setDropdownVisible}
                        >
                            <EllipsisOutlined onClick={() => setDropdownVisible(!dropdownVisible)} />
                        </Dropdown>,
                    ]}
                    style={{
                        width: '100%', height: '65vh', display: 'flex',
                        flexDirection: 'column', justifyContent: 'space-between'
                    }}
                    bodyStyle={{ padding: 0, margin: '1vh' }}
                    cover={
                        <Link key={advertismentArchive.id} to={`/advertisment/${advertismentArchive.id}`} style={{ textDecoration: "none", color: 'black' }}>
                            <Carousel>
                                {advertismentArchive.photoUrls && advertismentArchive.photoUrls.length > 0 ? (
                                    advertismentArchive.photoUrls.map((url, index) => (
                                        <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                                            <img style={{ height: '25vh', width: '100%', objectFit: 'cover' }} alt="example" src={url || Logo} loading="lazy" decoding="async" />
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                                        <img style={{ height: '25vh', width: '100%', objectFit: 'cover' }} alt="example" src={Logo} loading="lazy" />
                                    </div>
                                )}
                            </Carousel>
                        </Link>
                    }
                >
                    <Link key={advertismentArchive.id} to={`/advertisment/${advertismentArchive.id}`} style={{ textDecoration: "none", color: 'black' }}>
                        <Card.Meta title={advertismentArchive.title} />
                        <p style={{ color: 'grey', fontSize: '1.3em' }}>
                            {advertismentArchive.price + ' ' + currency.toUpperCase()}
                            {conversionRate &&
                                <span style={{ fontSize: '0.8em' }}> ~{convertedPrice.toFixed(2) + '' + (currency === 'eur' ? 'din' : '€')}
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
                            {t(advertismentArchive.country)}, {t(advertismentArchive.region)}
                        </p>
                        <p>{formatAdCardDate(advertismentArchive.time_creation)}</p>
                    </Link>

                </Card>

            </Col >
        </>
    );
};

export default CardAdvertisementProfileArchiveMobile;